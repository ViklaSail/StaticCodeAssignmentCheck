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
 * test
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
 *  OBSOLETE PSEUDO LINE: When done call the processSubmission() 
 * 
 *  When done call the processSubmissionCallback()
 * END FUNCTION 
 * 
 * FUNCTION CALLBACK handleStudentAssignmentCheck !!!!!!!
 * END FUNCTION 
 * 
 * //to be called when reading files between file reading and process submission
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
 * 
 * ** COURSE COORDINATION PART PSEUDO **
 * FUNCTION createInitCourseConfigurations
 *  update or create following assignment structures
 *      taskFolder
 *      quizFilename
 *      reportingLevel = 1
 *      scenario
 *      codeLength = 4
 *  IF taskfolder has value 
 *      set scenario = 1
 *  else set scenario 3
 * 
 * FUNCTION initStructures
 *  read course root folder contents
 *  create initial assignment structure
 *      CALL createInitCourseConfigurations
 *  save assignment structure to file
 * END FUNCTION
 * 
 * FUNCTION runAssignmentCheck(assignment)
 *  IF taskFolder AND quizFilename
 *      set scenario 2
 *  IF taskFolder AND NOT quizFileName
 *      set scenario 1
 *  IF NOT taskFolder AND guizFileName
 *      set scenario 3
 *  run codeCheck with record
 * END FUNCTION
 * 
 * FUNCTION configureAssignments
 *  show UI for teacher
 *  Allow teacher to connect quiz 
 *      with task for random 
 *      assignment evaluation
 * 
 * END FUNCTION
 * 
 * 
 * Raportin muokkaaminen
 * JAA KAKSI SATUNNAISTA LUKUA KESKENÄÄN
Jaa kaksi satunnaista lukua keskenään- Muistilista:
;;;
Nimet: satuMuuttuja1 satuMuuttuja2 satuOsam
;;;
Koodi: var, math.random, console.log
;;;
 * 
Tee kertolasku kahdella satunnaisella luvulla - Muistilista:
;;;
Nimet: lottoMuuttuja1 ja lottoMuuttuja2 lottoErotus
;;;
Koodi: var, math.random, console.log
;;;

Vähennä kaksi satunnaista lukua toisistaan - Muistilista:
;;;
Nimet: arpaMuuttuja1, arpaMuuttuja2, arpaErotus
;;;
Koodi: var, math.random, console.log
;;;
 * 
Laske yhteen kaksi satunnaista lukua - Muistilista:
;;;
Nimet: randVar1, randVar2, randResult
;;;
Koodi: var, math.random, console.log
;;;
 * 

 RAKENNETAAN ETSI-KORVAA MERKKIJONOT
 ;;; - tämä on entterin painallus
 Lihavoidut merkkijonot muuttuvat CAPITAL case kamaksi. 


 https://stackoverflow.com/questions/30351529/find-and-replace-with-a-newline-in-visual-studio-code
 
In the local searchbox (ctrl + f) you can insert newlines by pressing ctrl + enter.

 
 */