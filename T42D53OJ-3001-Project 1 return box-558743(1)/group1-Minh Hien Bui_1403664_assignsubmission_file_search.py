# search.py
# ---------
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
In search.py, you will implement generic search algorithms which are called by
Pacman agents (in searchAgents.py).
"""

import util
from sys import stdout as sysout

class SearchProblem:
    """
    This class outlines the structure of a search problem, but doesn't implement
    any of the methods (in object-oriented terminology: an abstract class).

    You do not need to change anything in this class, ever.
    """

    def getStartState(self):
        """
        Returns the start state for the search problem.
        """
        util.raiseNotDefined()

    def isGoalState(self, state):
        """
          state: Search state

        Returns True if and only if the state is a valid goal state.
        """
        util.raiseNotDefined()

    def getSuccessors(self, state):
        """
          state: Search state

        For a given state, this should return a list of triples, (successor,
        action, stepCost), where 'successor' is a successor to the current
        state, 'action' is the action required to get there, and 'stepCost' is
        the incremental cost of expanding to that successor.
        """
        util.raiseNotDefined()

    def getCostOfActions(self, actions):
        """
         actions: A list of actions to take

        This method returns the total cost of a particular sequence of actions.
        The sequence must be composed of legal moves.
        """
        util.raiseNotDefined()


def tinyMazeSearch(problem):
    """
    Returns a sequence of moves that solves tinyMaze.  For any other maze, the
    sequence of moves will be incorrect, so only use this for tinyMaze.
    """
    from game import Directions
    s = Directions.SOUTH
    w = Directions.WEST
    return  [s, s, w, s, w, w, s, w]

"""
HR: Decided to write the general (generic) search-function, that could simply be called
    with the search-algorithm-parameters in question.
    
    Needed as input: The fringe and a priority-function.
    Idea: DFS and BFS get a stack, resp. a queue as fringe and need no priority-function.
          UCS and AStar get a fring and also their resp. priority-functions.
    => function gen_search(fringe, priority_fct) returns list_of_directions_to_target
                           fringe must be collection-object that support push, pop and isEmpty
    Problem: AStar and UCS's push onto fringe takes (priority, object)
             while DFS and BFS's push onto fringe takes only (object)
    Solution: let priority_fct be optional. If it's null, never call it and use fringe.push() with only one argument.
    Downside: Not very implicit, one additional IF. :/
"""

def gen_search_HR(problem, fringe, calc_prio=None):
    """
    In: problem: given problem
        
        fringe:
        A stack or queue (or priority-Queue) implementation
        that supports push(), pop() and isEmtpy()-Methods.
        If the calc_prio-argument is given, fringe is expected
        to be a util.PriorityQueue, whose push()-Method
        takes two arguments: (priority, item)
        If the calc_prio-argument is not given, fringe is
        expected to be a simple stack or queue implementation
        and will be used via fringe.push(item)
        
        calc_prio:
        If this argument is given, fringe will be used like
        fringe.push(calc_prio(item), item) with
        item looking like (XYstate, totalCostToThisState).
        calc_prio will be used like this:
        calc_prio(item) and is expected to return an integer (the priority).
        Lower integers mean higher priority later on.
    """
    # HR: toggle node-counting on(1) or off(0)
    debug_nodecount = 0
    # Freeze Pacman - used to stare at and think about specific layouts
    FREEZE = 0
    if FREEZE:
        sep = "####################"
        print "{s}\n{s}\n  WARNING:".format(s=sep)
        print "    >> method gen_search_HR() in file search.py called with immediate freeze!\n    >> (Can be set to True or False manually at beginning of method.)\n{s}\n{s}".format(s=sep)
        return ['Stop']
    
    def walk_back(start_at_triple, visited):
        # triple: (this_state, parent_state, DIRECTION_from_parent_to_thisState)
        # visited holds a dictionary { node: (parent, DIRECTION_from_parent_to_node) }
        triple = start_at_triple
        the_way = []
        while triple[1] != None: # current node is not start node
            the_way.append(triple[2]) # remember Direction from parent to current node
            grandparent, direction = visited.get(triple[1]) # prepare parent's parent and resp. direction
            # ready (parent, grandparent, direction_grandparent_to_parent) for next loop
            triple = triple[1], grandparent, direction
        # start node found, list is complete (but still in wrong order)
        the_way.reverse()
        return the_way
    
    # ready fringe by putting start-state in, also make distinction between DFS/BFS and UCS/Astar
    # fringe will hold 4-tuples of (here_state, parent, DIRECTION_parentToHere, total_cost_to_here)
    start_state = problem.getStartState()
    if calc_prio:
        fringe.push( (start_state, None, None, 0) , 0 )
    else: # meaning there was no priority-fct given, so fringe is either a stack or a queue,
          # so stuff can be simply pushed directly (push()-method accepts just one argument)
        fringe.push((start_state, None, None, 0))
    # visited set for already explored/expanded nodes will hold: key:cur_node, value:(parent, DIRECTION_ParentToCurNode)
    visited = {}
    if debug_nodecount:
        print ""
    while not fringe.isEmpty():
        cur_triple = fringe.pop()
        if cur_triple[0] in visited:
            continue
        if problem.isGoalState(cur_triple[0]):
            walk_back_from = (cur_triple[0], cur_triple[1], cur_triple[2]) # cost not needed for walk-back
            if debug_nodecount:
                sysout.write("\n")
                sysout.flush
            return walk_back(walk_back_from, visited)
        visited[cur_triple[0]] = (cur_triple[1], cur_triple[2])
        # show nodecount (if enabled)
        if debug_nodecount:
            sysout.write("\rnodes expanded: {d}          ".format(d=debug_nodecount)),
            debug_nodecount += 1
        # place children onto fringe
        for succ in problem.getSuccessors(cur_triple[0]):
            # reminder: successor looks like (nextState, action, cost)
            # calculate succ's total cost (cost to state of cur_triple plus cost gotten with succ)
            succ_total_cost = cur_triple[3] + succ[2]
            # HR: This is where the magic is applied. Prioritize children as needed and push onto fringe
            if calc_prio:
                prio = calc_prio( (succ[0], succ_total_cost) )
                fringe.push( (succ[0], cur_triple[0], succ[1], succ_total_cost), prio )
            else: # meaning no prio function was given => fringe is simply a stack or queue
                fringe.push( (succ[0], cur_triple[0], succ[1], succ_total_cost) )
    # shouldn't happen
    print "ERROR_HR: search ended with no result."
    return None

def depthFirstSearch(problem):
    stack = util.Stack()
    return gen_search_HR(problem, stack)

def breadthFirstSearch(problem):
    """Search the shallowest nodes in the search tree first."""
    "*** YOUR CODE HERE ***"
    queue = util.Queue()
    return gen_search_HR(problem, queue)
    # HR: This worked, first try. => gen_search was implemented correctly. Very happy. :)

def uniformCostSearch(problem):
    """Search the node of least total cost first."""
    "*** YOUR CODE HERE ***"
    
    # create priority-function
    def priority_fct(item):
        # item will look like (XYState, totalCostToGetToThisState)
        # UCS is greedy: Cheapest node always gets expanded first
        return item[1]
    
    # start search
    priority_queue = util.PriorityQueue()
    return gen_search_HR(problem, priority_queue, priority_fct)

def nullHeuristic(state, problem=None):
    """
    A heuristic function estimates the cost from the current state to the nearest
    goal in the provided SearchProblem.  This heuristic is trivial.
    """
    return 0

def aStarSearch(problem, heuristic=nullHeuristic):
    """Search the node that has the lowest combined cost and heuristic first."""
    "*** YOUR CODE HERE ***"
    def priority_fct(item):
        # item will look like (XYState, totalCostToGetToThisState)
        # heuristic-fct takes two arguments: (XYstate, problem)
        # (and will use them to compare XYstate to problem.goal)
        # AStar-priority = totalCostToThisState + HeuristicValueOfThisState
        return item[1] + heuristic(item[0], problem)
    
    # start search
    priority_queue = util.PriorityQueue()
    return gen_search_HR(problem, priority_queue, priority_fct)


# Abbreviations
bfs = breadthFirstSearch
dfs = depthFirstSearch
astar = aStarSearch
ucs = uniformCostSearch
