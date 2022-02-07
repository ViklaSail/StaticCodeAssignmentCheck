/**
 * readFileToArray //scenario 1: single "task". scenario 2: Quiz + connected "task" (3: quiz alone)
 * 
 * Scenarios //scenario 1: single "task". scenario 2: Quiz + connected "task" (3: quiz alone)
 * FUNCTION scenarioHandling (CURRENLTY MAIN)
 *  IF scenario single task submissions 1
 *      read required words and structures from separate configuration file
 *      CALL readFileNames(scenario=1, callback reporting)
 *  ELSE IF scenario quiz + connected task 2
 *      read required words and strutures from quiz cvs (when done callback-function)
 *      read task files, connect required words and strucutes to files for inspection
 *      Inspect and valdiate. 
 *      CALL readFileNames(scenario=2, callback reporting)
 *  ELSE IF scenario quiz alone 3
 *      Read structure and process it alone
 *      CALL ASYNC readQuizData
 * 
 *  END IF
 * END FUNCTION
 * 
 * FUNCTION ASYNC readFileNames
 *  IF scenario==1 
 *      for every fileName CALL
 *          ASYNC readFileToArray(scenario callback_reporting)
 *  ELSE IF  scenario ==2 //THIS ONE IS COMPLICATED quiz + connected task
 *      ASYNC readAllQuizzData(scenario = 2, )
 *      FOR every fileName
 *          ASYNC readFileToArray(scenario, callback_reporting)
 *      TÄHÄN JÄÄTY DEBUUGGAUKSESSA =>VIRHE??? ASYNC readQuizData(scenario, callback_reporting)
 *  ELSE IF scenario 3 quizz alone  
 *      ALTERNATIVE: handle in calling function?
 *      this function does nothing?
 *      ASYNC readAllQuizzData(scenario = 3)
 *  END IF
 * END FUNCTION
 * 
 * FUNCTION ASYNC readQuizData
 *   read quizData, how to connect with file checking? 
 * END FNCTION
 * 
 * FUNCTION ASYNC readFileToArray
 *  ASYNC read file data of student
 *  When done call the processSubmission() 
 * END FUNCTION 
 * 
 * FUNCTION CALLBACK handleStudentAssignmentCheck !!!!!!!
 * END FUNCTION 
 * 
 * FUNCTION processSubmissionCallback(tiedostonimi, stringsToCheck)
 *  IF readAllQuizzDataDone not ready
 *      add file structure to submissionWaitList
 *  ELSE IF readAllQuizzDataDone ready
 *      CALL readQuizData for student
 *      CALL processSubmission()
 *      FOR submissionWaitList submissions
 *          CALL readQuizData for student
 *          CALL processSubmission()
 *  END IF
 * END FUNCTION
 * 
 * FUNCTION processSubmission(tiedostonimi, stringsToCheck)
 *  check errors with jshint
 *  check required reserved words
 *  check required keywords and names
 *  call reporting callback. 
 * END FUNCTION
 * 
 * FUNCTION fileStatisticsCallback
 * 
 * END FUNCTION
 * 
 * * Scenarios //scenario 1: single "task". scenario 2: Quiz + connected "task" (3: quiz alone)
 * FUNCTION readAllQuizzData
 *  call function which reads moodle csv file to list of objects
 *  IF scenario 3: quiz alone
 *      FOR every submission record in list
 *          call processSubmission(submissionRecord)
 *  IF scenario 2: Quiz + connected "task"
 *      set global variable for quizObjectList
 *      mark readAllQuizzDataDone true;
 *      
 * END FUNCTIONS
 * 
 * FUNCTION safetyTimeout
 *  //setTimeout(function, milliseconds)
 *  set related global variables and call relevant functions to gracefully exit.
 * ENDFUNCTION
 */