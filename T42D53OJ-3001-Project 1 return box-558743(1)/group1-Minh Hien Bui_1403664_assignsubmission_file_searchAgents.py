# searchAgents.py
# ---------------
# Licensing Information:  You are free to use or extend these projects for
# educational purposes provided that (1) you do not distribute or publish
# solutions, (2) you retain this notice, and (3) you provide clear
# attribution to UC Berkeley, including a link to http://ai.berkeley.edu.
# 
# Attribution Information: The Pacman AI projects were developed at UC Berkeley.
# The core projects and autograders were primarily created by John DeNero
# (denero@cs.berkeley.edu) and Dan Klein (klein@cs.berkeley.edu).
# Student side autograding was added by Brad Miller, Nick Hay, and
# Pieter Abbeel (pabbeel@cs.berkeley.edu).


"""
This file contains all of the agents that can be selected to control Pacman.  To
select an agent, use the '-p' option when running pacman.py.  Arguments can be
passed to your agent using '-a'.  For example, to load a SearchAgent that uses
depth first search (dfs), run the following command:

> python pacman.py -p SearchAgent -a fn=depthFirstSearch

Commands to invoke other search strategies can be found in the project
description.

Please only change the parts of the file you are asked to.  Look for the lines
that say

"*** YOUR CODE HERE ***"

The parts you fill in start about 3/4 of the way down.  Follow the project
description for details.

Good luck and happy searching!
"""

from game import Directions
from game import Agent
from game import Actions
import util
import time
import search

class GoWestAgent(Agent):
    "An agent that goes West until it can't."

    def getAction(self, state):
        "The agent receives a GameState (defined in pacman.py)."
        if Directions.WEST in state.getLegalPacmanActions():
            return Directions.WEST
        else:
            return Directions.STOP

#######################################################
# This portion is written for you, but will only work #
#       after you fill in parts of search.py          #
#######################################################

class SearchAgent(Agent):
    """
    This very general search agent finds a path using a supplied search
    algorithm for a supplied search problem, then returns actions to follow that
    path.

    As a default, this agent runs DFS on a PositionSearchProblem to find
    location (1,1)

    Options for fn include:
      depthFirstSearch or dfs
      breadthFirstSearch or bfs


    Note: You should NOT change any code in SearchAgent
    """

    def __init__(self, fn='depthFirstSearch', prob='PositionSearchProblem', heuristic='nullHeuristic'):
        # Warning: some advanced Python magic is employed below to find the right functions and problems

        # Get the search function from the name and heuristic
        if fn not in dir(search):
            raise AttributeError, fn + ' is not a search function in search.py.'
        func = getattr(search, fn)
        if 'heuristic' not in func.func_code.co_varnames:
            print('[SearchAgent] using function ' + fn)
            self.searchFunction = func
        else:
            if heuristic in globals().keys():
                heur = globals()[heuristic]
            elif heuristic in dir(search):
                heur = getattr(search, heuristic)
            else:
                raise AttributeError, heuristic + ' is not a function in searchAgents.py or search.py.'
            print('[SearchAgent] using function %s and heuristic %s' % (fn, heuristic))
            # Note: this bit of Python trickery combines the search algorithm and the heuristic
            self.searchFunction = lambda x: func(x, heuristic=heur)

        # Get the search problem type from the name
        if prob not in globals().keys() or not prob.endswith('Problem'):
            raise AttributeError, prob + ' is not a search problem type in SearchAgents.py.'
        self.searchType = globals()[prob]
        print('[SearchAgent] using problem type ' + prob)

    def registerInitialState(self, state):
        """
        This is the first time that the agent sees the layout of the game
        board. Here, we choose a path to the goal. In this phase, the agent
        should compute the path to the goal and store it in a local variable.
        All of the work is done in this method!

        state: a GameState object (pacman.py)
        """
        if self.searchFunction == None: raise Exception, "No search function provided for SearchAgent"
        starttime = time.time()
        problem = self.searchType(state) # Makes a new search problem
        self.actions  = self.searchFunction(problem) # Find a path
        totalCost = problem.getCostOfActions(self.actions)
        print('Path found with total cost of %d in %.1f seconds' % (totalCost, time.time() - starttime))
        if '_expanded' in dir(problem): print('Search nodes expanded: %d' % problem._expanded)

    def getAction(self, state):
        """
        Returns the next action in the path chosen earlier (in
        registerInitialState).  Return Directions.STOP if there is no further
        action to take.

        state: a GameState object (pacman.py)
        """
        if 'actionIndex' not in dir(self): self.actionIndex = 0
        i = self.actionIndex
        self.actionIndex += 1
        if i < len(self.actions):
            return self.actions[i]
        else:
            return Directions.STOP

class PositionSearchProblem(search.SearchProblem):
    """
    A search problem defines the state space, start state, goal test, successor
    function and cost function.  This search problem can be used to find paths
    to a particular point on the pacman board.

    The state space consists of (x,y) positions in a pacman game.

    Note: this search problem is fully specified; you should NOT change it.
    """

    def __init__(self, gameState, costFn = lambda x: 1, goal=(1,1), start=None, warn=True, visualize=True):
        """
        Stores the start and goal.

        gameState: A GameState object (pacman.py)
        costFn: A function from a search state (tuple) to a non-negative number
        goal: A position in the gameState
        """
        self.walls = gameState.getWalls()
        self.startState = gameState.getPacmanPosition()
        if start != None: self.startState = start
        self.goal = goal
        self.costFn = costFn
        self.visualize = visualize
        if warn and (gameState.getNumFood() != 1 or not gameState.hasFood(*goal)):
            print 'Warning: this does not look like a regular search maze'

        # For display purposes
        self._visited, self._visitedlist, self._expanded = {}, [], 0 # DO NOT CHANGE

    def getStartState(self):
        return self.startState

    def isGoalState(self, state):
        isGoal = state == self.goal

        # For display purposes only
        if isGoal and self.visualize:
            self._visitedlist.append(state)
            import __main__
            if '_display' in dir(__main__):
                if 'drawExpandedCells' in dir(__main__._display): #@UndefinedVariable
                    __main__._display.drawExpandedCells(self._visitedlist) #@UndefinedVariable

        return isGoal

    def getSuccessors(self, state):
        """
        Returns successor states, the actions they require, and a cost of 1.

         As noted in search.py:
             For a given state, this should return a list of triples,
         (successor, action, stepCost), where 'successor' is a
         successor to the current state, 'action' is the action
         required to get there, and 'stepCost' is the incremental
         cost of expanding to that successor
        """

        successors = []
        for action in [Directions.NORTH, Directions.SOUTH, Directions.EAST, Directions.WEST]:
            x,y = state
            dx, dy = Actions.directionToVector(action)
            nextx, nexty = int(x + dx), int(y + dy)
            if not self.walls[nextx][nexty]:
                nextState = (nextx, nexty)
                cost = self.costFn(nextState)
                successors.append( ( nextState, action, cost) )

        # Bookkeeping for display purposes
        self._expanded += 1 # DO NOT CHANGE
        if state not in self._visited:
            self._visited[state] = True
            self._visitedlist.append(state)

        return successors

    def getCostOfActions(self, actions):
        """
        Returns the cost of a particular sequence of actions. If those actions
        include an illegal move, return 999999.
        """
        if actions == None: return 999999
        x,y= self.getStartState()
        cost = 0
        for action in actions:
            # Check figure out the next state and see whether its' legal
            dx, dy = Actions.directionToVector(action)
            x, y = int(x + dx), int(y + dy)
            if self.walls[x][y]: return 999999
            cost += self.costFn((x,y))
        return cost

class StayEastSearchAgent(SearchAgent):
    """
    An agent for position search with a cost function that penalizes being in
    positions on the West side of the board.

    The cost function for stepping into a position (x,y) is 1/2^x.
    """
    def __init__(self):
        self.searchFunction = search.uniformCostSearch
        costFn = lambda pos: .5 ** pos[0]
        self.searchType = lambda state: PositionSearchProblem(state, costFn, (1, 1), None, False)

class StayWestSearchAgent(SearchAgent):
    """
    An agent for position search with a cost function that penalizes being in
    positions on the East side of the board.

    The cost function for stepping into a position (x,y) is 2^x.
    """
    def __init__(self):
        self.searchFunction = search.uniformCostSearch
        costFn = lambda pos: 2 ** pos[0]
        self.searchType = lambda state: PositionSearchProblem(state, costFn)

def manhattanHeuristic(position, problem, info={}):
    "The Manhattan distance heuristic for a PositionSearchProblem"
    xy1 = position
    xy2 = problem.goal
    return abs(xy1[0] - xy2[0]) + abs(xy1[1] - xy2[1])

def euclideanHeuristic(position, problem, info={}):
    "The Euclidean distance heuristic for a PositionSearchProblem"
    xy1 = position
    xy2 = problem.goal
    return ( (xy1[0] - xy2[0]) ** 2 + (xy1[1] - xy2[1]) ** 2 ) ** 0.5

#####################################################
# This portion is incomplete.  Time to write code!  #
#####################################################

class CornersProblem(search.SearchProblem):
    """
    This search problem finds paths through all four corners of a layout.

    You must select a suitable state space and successor function
    """

    def __init__(self, startingGameState):
        """
        Stores the walls, pacman's starting position and corners.
        """
        self.walls = startingGameState.getWalls()
        self.startingPosition = startingGameState.getPacmanPosition()
        top, right = self.walls.height-2, self.walls.width-2
        self.corners = ((1,1), (1,top), (right, 1), (right, top))
        for corner in self.corners:
            if not startingGameState.hasFood(*corner):
                print 'Warning: no food in corner ' + str(corner)
        self._expanded = 0 # DO NOT CHANGE; Number of search nodes expanded
        # Please add any code here which you would like to use
        # in initializing the problem
        "*** YOUR CODE HERE ***"
        """
        HR: Played around with a lot of different ideas. Cannot quite get a handle
            on this without implementing new functions here or changing the
            search-algorithms written so far (for example manage state goals
            in the search-algorithms instead of here behind isGoalState()...)
            
            Problem: BFS the way it is implemented in search.py does not care if
                     part of the goal-state is reached (like, one corner visited).
                     BFS in search.py returns a direct path to the
                     specific node that the goal-state was first fulfilled in.
            
            Solution: Pacman needs to be able to go back the way he came.
                      Right now this is prevented (not here, but in the caller)
                      by checking whenever a node is popped off the fringe,
                      if that node's _state_ is already in a set of visited states.
                      But states are created _here_! So they can simply be expanded
                      from xy to (xy, goals_achieved).
                      Then when Pacman walks _to_ a corner, all states look like
                      ((3, 5), []), ((2, 5), []), ((1, 5), []) etc.
                      The moment Pacman reaches the corner (1, 5),
                      all future successors will get completely new states,
                      like ((2, 5), [upper_left]), ((1, 5), [upper_left]), etc.
                      So once Pacman was in a corner, every position on the map
                      can become a new state again (with the visited corner in it)
                      So Pacman will be able to walk back once per reached corner.
                      That is exactly what is needed here.
                      
            Needed: Which corner is visited first doesn't matter. After every corner
                    Pacman again gets the whole field to play with.
                    
                    isGoalState(state) must check if Pacman is standing in a corner
                    and if so, if that corner is the last one missing in Pacman's state.
                    So the four corners must be distinguishable.
                    isGoalState() shold be as fast as possible...
                    Probably better to remember which corners Pacman has yet to visit.
                    That way, isGoalState() can simply check if unvisited_corners in
                    caller's state are > 1. If so, cannot be a goal-state.
                    If unvisited corners are exactly 1, compare that to the state's
                    xy-component.
                    
                    getSuccessors(state) must also check if Pacman is standing in a corner.
                    If so, it must remove this corner from the unvisited_corners
                    in Pacman's state. The remaining unvisited_corners (one less)
                    will be used for the successors that are returned to caller.
        """
        

    def getStartState(self):
        """
        Returns the start state (in your state space, not the full Pacman state
        space)
        """
        "*** YOUR CODE HERE ***"
        unvisited_corners = self.corners
        # set would make more sense, but caller will use this
        # as part of a key in a dictionary. And sets cannot be hashed.
        return (self.startingPosition, unvisited_corners)

    def isGoalState(self, state):
        """
        Returns whether this search state is a goal state of the problem.
        """
        "*** YOUR CODE HERE ***"
        xy, unvisited_corners = state[0], state[1]
        # if more than one corner is unvisited, Pacman cannot be finished
        if len(unvisited_corners) > 1:
            return False
        # vvv if xy == unvisitied_corners[0] _should_ also work
        # because unvisited_corners _should_ never be empty here.
        # Might even be better because of fail-fast principle...
        # But maybe I'm overlooking something, would need more thought. Seems safer this way.
        if xy in unvisited_corners:
            return True
        else:
            return False

    def getSuccessors(self, state):
        """
        Returns successor states, the actions they require, and a cost of 1.

         As noted in search.py:
            For a given state, this should return a list of triples, (successor,
            action, stepCost), where 'successor' is a successor to the current
            state, 'action' is the action required to get there, and 'stepCost'
            is the incremental cost of expanding to that successor
        """

        successors = []
        for action in [Directions.NORTH, Directions.SOUTH, Directions.EAST, Directions.WEST]:
            # Add a successor state to the successor list if the action is legal
            # Here's a code snippet for figuring out whether a new position hits a wall:
            #   x,y = currentPosition
            #   dx, dy = Actions.directionToVector(action)
            #   nextx, nexty = int(x + dx), int(y + dy)
            #   hitsWall = self.walls[nextx][nexty]

            "*** YOUR CODE HERE ***"
            """
            HR: reminder: every state will be like (xy, {unvisited_corners})
                instead of action, may read direction...
            """
            x, y = state[0]
            dx, dy = Actions.directionToVector(action)
            next_x, next_y = int(x + dx), int(y + dy)
            if self.walls[next_x][next_y]: # a step in this direction would be illegal
                continue
            xy, unvisited_corners = state[0], state[1]
            if xy in unvisited_corners:
                # caller is calling from a corner => remove that from unvisited
                unvisited_corners = tuple(a for a in unvisited_corners if a != xy)
                # no goal check here. Caller may call isGoalState(state) whenever he wants.
            next_xy = (next_x, next_y)
            next_state = ((next_xy, unvisited_corners), action, 1)
            successors.append(next_state)

        self._expanded += 1 # DO NOT CHANGE
        return successors

    def getCostOfActions(self, actions):
        """
        Returns the cost of a particular sequence of actions.  If those actions
        include an illegal move, return 999999.  This is implemented for you.
        """
        if actions == None: return 999999
        x,y= self.startingPosition
        for action in actions:
            dx, dy = Actions.directionToVector(action)
            x, y = int(x + dx), int(y + dy)
            if self.walls[x][y]: return 999999
        return len(actions)


def cornersHeuristic(state, problem):
    """
    A heuristic for the CornersProblem that you defined.

      state:   The current search state
               (a data structure you chose in your search problem)

      problem: The CornersProblem instance for this layout.

    This function should always return a number that is a lower bound on the
    shortest path from the state to a goal of the problem; i.e.  it should be
    admissible (as well as consistent).
    """
    corners = problem.corners # These are the corner coordinates
    walls = problem.walls # These are the walls of the maze, as a Grid (game.py)

    "*** YOUR CODE HERE ***"
    position, unvisited_corners = state
    
    # HR: manually choose function to use
    # all tested via >>>python pacman.py -l mediumCorners -p AStarCornersAgent -z 0.5
    
    # tested: admissible & consistent, 1496 nodes expanded
    #return nearest_corner(position, unvisited_corners)
    
    # tested: admissible & consistent, 702 nodes expanded. Jay!
    return all_corners(position, unvisited_corners)
    
    # tested: 506 nodes expanded!! :) :) :) but inadmissible XD
    #return sweet_but_wrong_corners(position, unvisited_corners)

def nearest_corner(position, corners):
    """
    HR: Always prefer going closer to the closest corner
    (Manhattan-distance to closest corner as heuristic)
    Always shorter than actual remaining way, so admissible.
    Not so sure about consistency.
    ^^^ edit: Autograder says it's consistent. But there's a better way.
    
    argument corners is expected to contain the unvisited corners
    """
    return min( [util.manhattanDistance(position, c) for c in corners] )


def all_corners(position, corners):
    """
    HR: Of all remaining corners, get distance (Manhattan-) to closest.
        Then add Manhattan-distance from that corner to its next closest neighbor.
        etc.
        Definitely admissible (problem reduction) and consistent.
        Might produce equal results to the nearest_corner_heuristic
        but with more computing being done. In that case, dismiss.
        Edit: Works, turns out to be best solution. Autograder happy, too. :)
    """
    result_length = 0
    while len(corners) > 0:
        # get all distances
        distance_corner_pairs = [( util.manhattanDistance(position, c), c ) for c in corners]
        closest = min(distance_corner_pairs)
        # add up manhattan distance to closest corner
        result_length += closest[0]
        # set position to that corner for next iteration
        position = closest[1]
        # remove the corner for next iteration
        corners = [c for c in corners if c != closest[1]]
    return result_length
    

def sweet_but_wrong_corners(position, corners):
    """
    HR: Just add up the distances to all corners (from current position)
        Inadmissible and inconsistent (according to Autograder, so probably true ;) )
        But very very fast (506 nodes, while for admissible heuristics, the Berkeley-optimum is '<1200')
        Edit: example for fail is this:
        ++++++
        +x  x+
        +P   +
        +x  x+
        ++++++
        Here, the heuristic (rightaway for the starting position) returns 8,
        while the actual shortest path is obviously 7.
        Still, it's very fast. And sometimes right. Probably...
    """
    total_length = 0
    distances = [ util.manhattanDistance(position, c) for c in corners ]
    return sum(distances)
    

class AStarCornersAgent(SearchAgent):
    "A SearchAgent for FoodSearchProblem using A* and your foodHeuristic"
    def __init__(self):
        self.searchFunction = lambda prob: search.aStarSearch(prob, cornersHeuristic)
        self.searchType = CornersProblem

class FoodSearchProblem:
    """
    A search problem associated with finding the a path that collects all of the
    food (dots) in a Pacman game.

    A search state in this problem is a tuple ( pacmanPosition, foodGrid ) where
      pacmanPosition: a tuple (x,y) of integers specifying Pacman's position
      foodGrid:       a Grid (see game.py) of either True or False, specifying remaining food
    """
    def __init__(self, startingGameState):
        self.start = (startingGameState.getPacmanPosition(), startingGameState.getFood())
        self.walls = startingGameState.getWalls()
        self.startingGameState = startingGameState
        self._expanded = 0 # DO NOT CHANGE
        self.heuristicInfo = {} # A dictionary for the heuristic to store information

    def getStartState(self):
        return self.start

    def isGoalState(self, state):
        return state[1].count() == 0

    def getSuccessors(self, state):
        "Returns successor states, the actions they require, and a cost of 1."
        successors = []
        self._expanded += 1 # DO NOT CHANGE
        for direction in [Directions.NORTH, Directions.SOUTH, Directions.EAST, Directions.WEST]:
            x,y = state[0]
            dx, dy = Actions.directionToVector(direction)
            nextx, nexty = int(x + dx), int(y + dy)
            if not self.walls[nextx][nexty]:
                nextFood = state[1].copy()
                nextFood[nextx][nexty] = False
                successors.append( ( ((nextx, nexty), nextFood), direction, 1) )
        return successors

    def getCostOfActions(self, actions):
        """Returns the cost of a particular sequence of actions.  If those actions
        include an illegal move, return 999999"""
        x,y= self.getStartState()[0]
        cost = 0
        for action in actions:
            # figure out the next state and see whether it's legal
            dx, dy = Actions.directionToVector(action)
            x, y = int(x + dx), int(y + dy)
            if self.walls[x][y]:
                return 999999
            cost += 1
        return cost

class AStarFoodSearchAgent(SearchAgent):
    "A SearchAgent for FoodSearchProblem using A* and your foodHeuristic"
    def __init__(self):
        self.searchFunction = lambda prob: search.aStarSearch(prob, foodHeuristic)
        self.searchType = FoodSearchProblem

def foodHeuristic(state, problem):
    """
    Your heuristic for the FoodSearchProblem goes here.

    This heuristic must be consistent to ensure correctness.  First, try to come
    up with an admissible heuristic; almost all admissible heuristics will be
    consistent as well.

    If using A* ever finds a solution that is worse uniform cost search finds,
    your heuristic is *not* consistent, and probably not admissible!  On the
    other hand, inadmissible or inconsistent heuristics may find optimal
    solutions, so be careful.

    The state is a tuple ( pacmanPosition, foodGrid ) where foodGrid is a Grid
    (see game.py) of either True or False. You can call foodGrid.asList() to get
    a list of food coordinates instead.

    If you want access to info like walls, capsules, etc., you can query the
    problem.  For example, problem.walls gives you a Grid of where the walls
    are.

    If you want to *store* information to be reused in other calls to the
    heuristic, there is a dictionary called problem.heuristicInfo that you can
    use. For example, if you only want to count the walls once and store that
    value, try: problem.heuristicInfo['wallCount'] = problem.walls.count()
    Subsequent calls to this heuristic can access
    problem.heuristicInfo['wallCount']
    """
    position, foodGrid = state
    "*** YOUR CODE HERE ***"
    
    remaining_pellets = foodGrid.asList()
    # all tested with >>>python pacman.py -l trickySearch -p AStarFoodSearchAgent
    
    # tested: 6126 nodes expanded, but inadmissible (see comment in function)
    #return all_food_closest_to_closest(position, remaining_pellets)
    
    # tested: Consistent. 9551 nodes expanded.
    #return all_food_in_one_line(position, remaining_pellets)
    
    # tested: 5423 nodes expanded. And autograder says admissible, but inconsistent. :/
    #return all_food_separate(position, remaining_pellets)
    
    # tested: 8672 nodes and inconsistent.
    #return closest_and_farthest(position, remaining_pellets)
    
    # tested: CONSISTENT! And 8600 nodes. Full credit for this one. :)
    return farthest_four(position, remaining_pellets)
    
    # tested: 10675 nodes. And safe to say not consistent (see comment in function)
    #         Autograder has no opinion, because it fails non-triviality test (albeit not really trivial).
    #return farthest_straights(remaining_pellets)
    

def all_food_closest_to_closest(position, pellets):
    """
    HR: Simple (and, as it turns out, wrong thought):
        Just do an equivalent to all_corners heuristic:
        Manhattan-distance to closest pellet, then Manhattan-distance
        from that to closest pellet from there, etc. etc.
        No Pacman-way can be shorter than Manhattan-distance.
        Autograder showed a pitfall: Map layout may force Pacman to backtrack in any case.
        The closest food pellet now could 'lure' Pacman to the 'longer' side => later longer way back.
        So heuristic idea leads to longer path than actual best:
        Ignoring the closest food at first might lead to less backtracking.
        See map layout 00_HR_food_heuristic_test_15
    """
    path_length = 0
    while pellets:
        distance, closest_pellet = min( [ (util.manhattanDistance(position, p), p) for p in pellets] )
        path_length += distance
        position = closest_pellet
        pellets.remove(closest_pellet)
    return path_length

def all_food_in_one_line(position, pellets):
    """
    HR: Idea: Since all_foods_closest_to_closest fails because map layout
              might force Pacman to retrace his steps, remove that constraint:
              Keep the Manhattan-distances to all pellets, but treat them
              as if all pellets were all aligned in front of Pacman in one straight line.
              That will ignore any necessary backtracking, making this _always_ shorter
              than any real map layout (or equally short, if exactly that _is_ the map layout).
              
              To implement, simply use farthest pellet. That's how far Pacman must go, minimally.
              Edit: admissible _and_ consistent. :) But 9551 nodes expanded. Not perfect.
    """
    if pellets:
        return max( [ util.manhattanDistance(position, pellet) for pellet in pellets ] )
    return 0

def all_food_separate(position, pellets):
    """
    HR: More of a shot in the dark here... But should be admissible at least.
        Also, in the scenario where all_foods_closest_to_closest failed, the removal of
        the (wrong) closest dot now should weigh in negatively, because the two dots
        that were initially farther away weigh more and more with each step taken away from them.
        Complicated stuff... best just to try.
        
        Edit: Sooo... It's admissible, but inconsistent.
        Autograder detected inconsistency on map 00_HR_food_heuristic_test_11
        BUT quickest of all that I could come up with (<6000 nodes expanded)
        Unfortunately, the path this finds on mediumSearch is also _very_ stupid. XD
    """
    # get all Manhattan-distances
    distances = [ util.manhattanDistance(position, pellet) for pellet in pellets ]
    # add them up
    return sum(distances)

def closest_and_farthest(position, pellets):
    """
    HR: Building on the - inadmissible - idea of all_food_closest_to_closest() here...
        Two paths Pacman _must_ take, no matter what, is
        (1) Manhattan-distance Pacman <-> closest pellet
        (2) + Manhattan-distance closest pellet <-> farthest pellet
        Even if they're in a straight line or something. He _must_.
        And this is shorter than any actual way Pacman could take.
        No shortcuts for this one. So should be admissible.
        That heuristic would give lower values for Pacman being closer to closest pellet.
        Probably not very quick.
        Edit: Autograder says not consistent. :( :( example: 00_HR_food_heuristic_test_06
    """
    if pellets:
        distance_pellet_pairs = [ (util.manhattanDistance(position, p), p ) for p in pellets ]
        closest = min(distance_pellet_pairs)
        farthest = max(distance_pellet_pairs)
        return closest[0] + util.manhattanDistance(closest[1], farthest[1])
    return 0

def farthest_four(position, pellets):
    """
    HR: Idea: IF there is at least one pellet farther north (higher y-value) than position,
        then Pacman will have to go north at some point.
        More precisely, IF there is >=1 pellet north of him, he will have to go as far north
        as the northernmost pellet is on the map.
        Same goes for east, west and south.
        Those add up. No matter if Pacman goes partially east on his way north already.
        Looking at all four directions separately should ensure admissability at least.
        Edit: Autograder very happy. Full credit (<9000 nodes expanded and consistent) :)
    """
    # pellets = [(x, y), (x, y), (x, y), (x, y)]
    val = 0
    if pellets:
        maxNorth = max(pellets, key=lambda xy: xy[1])
        maxEast = max(pellets, key=lambda xy: xy[0])
        maxSouth = min(pellets, key=lambda xy: xy[1])
        maxWest = min(pellets, key=lambda xy: xy[0])
        #^^^that might become somewhat slow... :/ and now vvv the IFs too...
        if maxNorth[1] > position[1]:
            val += maxNorth[1] - position[1]
        if maxEast[0] > position[0]:
            val += maxEast[0] - position[0]
        if maxSouth[1] < position[1]:
            val += position[1] - maxSouth[1]
        if maxWest[0] < position[0]:
            val += position[0] - maxWest[0]
    return val

def farthest_straights(pellets):
    """
    HR: My last idea and kind of a weird one: Building on farthest_four
        but going for something that gives back higher numbers:
        At some point, Pacman will have to cover the y-axis-distance
        between the northernmost element maxN and the southernmost element maxS.
        Also, at some point he will have to cover the x-axis-distance
        between the one of maxN, maxS that is farther east and the
        easternmost element maxE.
        Likewise, he'll have to cover the distance between the
        element farthest west of maxS, maxN (can't be maxE that is farthest west)
        and the westernmost pellet.
        Should two of those fall in more than one category, no worries.
        Should work even with one pellet.
        Weird: Pacman's position is not used in this.
        Problem: Can't be consistent. If a northern outlying pellet vanishes,
                 the heuristic might suddenly do a big jump. :/
        Problem: This only changes when one of those specific (maximally 4) pellets is eaten.
                 Might not be best, node-wise but also could be made very fast
                 with some kind of lazy update (not doable here).
        Edit: Very bad idea. Despite being not consistent, > 10000 nodes expanded. So not even helpful.
    """
    val = 0
    if pellets:
        maxNorth = max(pellets, key=lambda xy: xy[1])
        maxEast = max(pellets, key=lambda xy: xy[0])
        maxSouth = min(pellets, key=lambda xy: xy[1])
        maxWest = min(pellets, key=lambda xy: xy[0])
        val += maxNorth[1] - maxSouth[1]
        # max([maxNorth, maxSouth], lambda xy:xy[0]) should give the easternmost of maxNorth, maxSouth
        val += maxEast[0] - max((maxNorth, maxSouth))[0]
        # now do distance of westernmost (of maxNorth, maxSouth) to maxWest-pellet
        val += min((maxNorth, maxSouth))[0] - maxWest[0]
    return val

class ClosestDotSearchAgent(SearchAgent):
    "Search for all food using a sequence of searches"
    def registerInitialState(self, state):
        self.actions = []
        currentState = state
        while(currentState.getFood().count() > 0):
            nextPathSegment = self.findPathToClosestDot(currentState) # The missing piece
            self.actions += nextPathSegment
            for action in nextPathSegment:
                legal = currentState.getLegalActions()
                if action not in legal:
                    t = (str(action), str(currentState))
                    raise Exception, 'findPathToClosestDot returned an illegal move: %s!\n%s' % t
                currentState = currentState.generateSuccessor(0, action)
        self.actionIndex = 0
        print 'Path found with cost %d.' % len(self.actions)

    def findPathToClosestDot(self, gameState):
        """
        Returns a path (a list of actions) to the closest dot, starting from
        gameState.
        """
        # Here are some useful elements of the startState
        startPosition = gameState.getPacmanPosition()
        food = gameState.getFood()
        walls = gameState.getWalls()
        problem = AnyFoodSearchProblem(gameState)

        "*** YOUR CODE HERE ***"
        #util.raiseNotDefined()
        import search
        #return search.depthFirstSearch(problem) # well, at least he's cute...
        return search.breadthFirstSearch(problem) # works, probably the "right" solution
        #return search.uniformCostSearch(problem) # identical to breadthFirstSearch, no surprise there

class AnyFoodSearchProblem(PositionSearchProblem):
    """
    A search problem for finding a path to any food.

    This search problem is just like the PositionSearchProblem, but has a
    different goal test, which you need to fill in below.  The state space and
    successor function do not need to be changed.

    The class definition above, AnyFoodSearchProblem(PositionSearchProblem),
    inherits the methods of the PositionSearchProblem.

    You can use this search problem to help you fill in the findPathToClosestDot
    method.
    """

    def __init__(self, gameState):
        "Stores information from the gameState.  You don't need to change this."
        # Store the food for later reference
        self.food = gameState.getFood()

        # Store info for the PositionSearchProblem (no need to change this)
        self.walls = gameState.getWalls()
        self.startState = gameState.getPacmanPosition()
        self.costFn = lambda x: 1
        self._visited, self._visitedlist, self._expanded = {}, [], 0 # DO NOT CHANGE

    def isGoalState(self, state):
        """
        The state is Pacman's position. Fill this in with a goal test that will
        complete the problem definition.
        """
        x,y = state

        "*** YOUR CODE HERE ***"
        #util.raiseNotDefined()
        return self.food[x][y]  # HR: see pacman.py - GameState.getFood()-method

def mazeDistance(point1, point2, gameState):
    """
    Returns the maze distance between any two points, using the search functions
    you have already built. The gameState can be any game state -- Pacman's
    position in that state is ignored.

    Example usage: mazeDistance( (2,4), (5,6), gameState)

    This might be a useful helper function for your ApproximateSearchAgent.
    """
    x1, y1 = point1
    x2, y2 = point2
    walls = gameState.getWalls()
    assert not walls[x1][y1], 'point1 is a wall: ' + str(point1)
    assert not walls[x2][y2], 'point2 is a wall: ' + str(point2)
    prob = PositionSearchProblem(gameState, start=point1, goal=point2, warn=False, visualize=False)
    return len(search.bfs(prob))
