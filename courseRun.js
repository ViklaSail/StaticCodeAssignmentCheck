const fs = require('fs');
var path = require('path');
const { start } = require('prompt');
const { resourceLimits } = require('worker_threads');
var count;
var currentCount=0;
var rootfilelist =[];
var taskFolderList = [];
var initialAssignmentConfigurations = [];
var reportingBaseForAllTasks = [];
var studentBasedList = [];
var codeChecker = require('./codeCheck');
var quizAndTaskCount=0; // TODO: HOW TO HANDLE SCENARIO 2=>task and quiz-combination?!!! IMPORTANT.
// reducing one of count if task related to quiz? 
// how to recognize? when assignment structure has taskFolder AND quizFileName. 
//const config = require('./config.json')
// Observation: count of actual work remains the same, so above pondering may not be relevant
// count of files and folders 

//var rootdirectory = "file:///D:/TESTIMATERIAALIA/";
var rootdirectory = "./TESTIMATERIAALIA/";

function readDirectoryFileNames(scenario, filelist, stringsToCheck, statisticallback){
    //var dirPath = path.dirname(rootdirectory); 
    var testipath = path.join(__dirname, rootdirectory);
    fs.readdir(testipath, function (err, files) {
      if (err) {
        return console.log("Unable to scan directory: " + err);
      }
      count = files.length;
      files.forEach(function (file) {
          // this forks to multiple async calls with shared statisticscallback. Where to call data_grab? 
          // TODO remove rivit-parameter
          //readFileToArray(rivit, stringsToCheck, "./palautetut/"+file, statisticallback);
          var fuldir = rootdirectory+file;
          var isFile = fs.lstatSync(fuldir).isFile();
          var confstruct = fillConfStruct(file);
          initialAssignmentConfigurations.push(confstruct);
          if (isFile){
            rootfilelist.push(file);
          }
          else {
            taskFolderList.push(file);
          }
          allFilesRead();
      });
    });
  }

function fillConfStruct(filename) {
    var confStruct ={};
    var fuldir = rootdirectory+filename;
    var isFile = fs.lstatSync(fuldir).isFile();
    if (isFile) {
        confStruct.taskFolder = "";
        confStruct.quizFilename = filename;
        confStruct.scenario = 3;
    } else {
        confStruct.taskFolder = filename;
        confStruct.quizFilename = "";
        confStruct.scenario = 1;
    }
    confStruct.reportingLevel = 1;
    confStruct.codeLength=4;
    confStruct.filelist = [];//suuporting initial one-submission architecture
    confStruct.studentSubmissionAnalysis = [];// supporting initial one-submission architecture
    confStruct.filecountForCallback=0;
    confStruct.allQuizzCount=0;
    return confStruct;
}

function allFilesRead(){
    console.log(initialAssignmentConfigurations.length);
    console.log(count-(rootfilelist.length+taskFolderList.length));
    if ((rootfilelist.length+taskFolderList.length) >= count){
        console.log("lista täynnä");
        console.table(rootfilelist);
        console.table(taskFolderList);
        console.table(initialAssignmentConfigurations);
        writeConfigurations(readyToStartCourceCheck);
    }

}

function writeConfigurations(courcecheck) {
    var jsonContent = JSON.stringify(initialAssignmentConfigurations);
    fs.writeFile("./alphabet.json", jsonContent, 'utf8', function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("The file was saved!");
        courcecheck();
        //readyToStartCourceCheck();
    }); 
    
}

function readconfFile(readyToStartCourceCheck) {
    fs.readFile('./alphabet.json', 'utf8', (err, jsonString) => {
        if (err) {
            console.log("File read failed:", err)
            return console.log(err);
        }
        initialAssignmentConfigurations =  JSON.parse(jsonString); 
        console.table(initialAssignmentConfigurations);
        readyToStartCourceCheck();
    });
}

function getConfData() {
    var confDone = false;///= fs.existsSync("\alphabet.json");
    if (!confDone){
        readDirectoryFileNames(readyToStartCourceCheck); //WORKS FINE
    }
    else{
        readconfFile(readyToStartCourceCheck);//TODO: NOT WORKING!!! 
    }
}
//https://nodejs.dev/learn/working-with-folders-in-nodejs
/**
 * MAIN start of courcehck readyToStartCourceCheck
 */
function readyToStartCourceCheck(){
    console.log("looping through files");
    //need to check that all get done in good order, callbacks will cause problems with global variables
    //wait-function? 
    //reports attached to copy of course check? ensin vain yksi
    //console.log(initialAssignmentConfigurations[0]);
    //FOR LOOP TÄHÄN!!!! 
    for (const element of initialAssignmentConfigurations) {
        // ...use `element`...
        //if (element.quizFilename==="T42T177OJ-3001-Peräkkäisyys-periaate ja muuttujatTESTIMATSKU.csv"){
            console.log("löytyi");
            element.courseCallBackFunction = courseCallBack;
            codeChecker.codeCheckMain(element, rootdirectory);
        //}
    }
    //codeChecker.codeCheckMain(initialAssignmentConfigurations[0], rootdirectory);
    //codeChecker.codeCheckMain(initialAssignmentConfigurations[11], rootdirectory);
    console.log("Kurssi loppu");
}

/**
 * Tis is called for all tasks and quizzess in course folder
 * When all tasks and quizzes are analyzed, then final student focused
 * report is made,
 * Aim is to repeat this often and find students in need before they ask help
 * Precondition is, that students do make submissions to tasks/quizzes
 * taskQuizAnalysisTable is a struct with task details and list of student analysis
 * 
 * OBS: all is hanging in global table passed as parameter, so no need to get anything here
 * Just checking that enough callback calls come in. for debugging purposes we get the courseSubmisson record. 
 */
function courseCallBack(courseSubmission){
    console.log(courseSubmission);
    quizAndTaskCount = initialAssignmentConfigurations.length;
    currentCount++;//global variable
    console.log("currentCount " + currentCount + " quizAndTaskcount" + quizAndTaskCount);
    if (currentCount==21) {
        console.log("VIRHE? 3 kutsua vajaaksi? onko ne quizzeja?");
        for (const element of initialAssignmentConfigurations) {
            if((element.scenario==3) && (element.allQuizzCount==0))
                console.log(element.quizFilename);
        }
    }
    if (quizAndTaskCount <= currentCount){
        //when all tasks are evaluated, call courseTatusReportPerStudent
        var testilista = prepareStudentBasedList();
        console.log("student based list done");
        calculateMistakeFactor(testilista);
        // sort descending, most cumulated errors first. 
        testilista.sort(function(a,b){
            var result = b.studentErrorFactor - a.studentErrorFactor;
            return result;
        });
        courseTatusReportPerStudent(testilista);
    }
}

function prepareStudentBasedList(){
    for (const courseElement of initialAssignmentConfigurations) {
        for (const studentAnalysis of courseElement.studentSubmissionAnalysis) {
            console.log(studentAnalysis);
            var foundItem = studentBasedList.find(function(studentRecord){
                if((studentRecord.student.givenName==studentAnalysis.student.givenName) && (studentAnalysis.student.surname==studentAnalysis.student.surname)) {
                    return studentRecord;
                }
            });
            if (!foundItem) {
                //build student record and push it
                //studentBasedList.push({courseElement})
                console.log("add new record to studentBasedList");
                var studRec = {"student": studentAnalysis.student};
                studRec.taskAnalysis = [];
                var anrec = composeAnalysisRecord(courseElement,studentAnalysis);
                studRec.taskAnalysis.push(anrec);
                studentBasedList.push(studRec);
            } else {
                console.log("add task analsysis to studentBasedListREcord");
                var anrec = composeAnalysisRecord(courseElement,studentAnalysis);
                foundItem.taskAnalysis.push(anrec);
            }
        }
    }
    console.log("done");
    return studentBasedList;
}

function composeAnalysisRecord(courseElement, studentAnalysis){
    var task ="";
    if (courseElement.taskFolder)
        task = courseElement.taskFolder;
    else
        task = courseElement.quizFilename;
    var anrec = {"task": task};
    anrec.variables = studentAnalysis.variables;
    anrec.errors = studentAnalysis.errors;
    anrec.errorRawList = studentAnalysis.errorRawList;
    anrec.commands = studentAnalysis.commands;
    return anrec;
}

/**
 * Errors:  sum together errorcounts of all analysis
 * commands: exception in command usage, +1 to factor
 * Variables: missing required variablename +1 to factor
 * @param {*} studentAnalysis 
 */
function calculateMistakeFactor(studentAnalysis){
    for (const student of studentAnalysis) {
        student.studentErrorFactor = 0;
        student.commandFactor = 0;
        student.variableFactor = 0;
        for (const taskAns of student.taskAnalysis) {
            student.studentErrorFactor = student.studentErrorFactor + taskAns.errors.errcount;
            student.commandFactor = student.commandFactor + taskAns.commands.misscount;
            student.variableFactor = student.variableFactor + taskAns.variables.misscount;
        }
    }
    console.log("mistacefactors calculated");
}
/**
 * Three accounts are considered when ordering. errors, required names, required structures
 * Errors and required structures counting = help needed- index- order!!
 * Required names = help in doing task/copycat suspicions. 
 * current "misscount": if usage of keyword differs, it is considered +1 to misscount. 
 * errcount: total of static analysis errors. 
 * Lines 
 * "misscount" calculation: what count is told in requirements, must be met. 
 * 
 * Two kind of reports: 
 *      1. copy suspicions report/task instruction reading suspicion report.
 *      2. help-needed-report
 * 
 * Need to prepare list summing up persons
 * 
 */
function courseTatusReportPerStudent(studentAnList) {
    console.log("JÄRJESTELLÄÄN VIRHEIDEN MUKAAN");
    console.log("Sort by student");

    //console.table(studentAnList);
    for (const studentIterator of studentAnList) {
        console.log(studentIterator);
        console.log("============================================================");
        console.log(studentIterator.student.surname + " " + studentIterator.student.givenName);
        console.log("============================================================");
        console.log("JSHint errors: "+studentIterator.studentErrorFactor + " Variable deviations: " + studentIterator.variableFactor + " required structure deviations: " + studentIterator.commandFactor);
        console.log("Task details, summing up:")
        console.log("_____________________________________________________________");
        for (const task of studentIterator.taskAnalysis) {
            //console.log(buildTaskName(task.task) +": "+ sumUpErrors(task.errors.errortxt));
            var testi2 = sumErrorTypes(task.errorRawList);
            var testi3 = elementCountsToString(testi2);
            console.log(buildTaskName(task.task) +": "+ testi3);
            //console.log(testi3);
            if(task.variables.misscount>0){
                //console.log("Suspected copy-paste mistake"+": " + task.variables.missDetails);
            }

        }
    }
}

function elementCountsToString(countlist){
    //console.log(countlist);
    var resultstring = "";
    for (const errite of countlist) {
        resultstring = resultstring + errite.errname + ": " + errite.count + ", "; 
    }
    return resultstring; 
}

function sumErrorTypes(errorlist){
    var similarErrorsList = [];
    //var errstring =errorlist[0];
    for (const iteraw of errorlist) {
        var found = similarErrorsList.find(function(element) {
           if(element.errname==iteraw.raw){
               //console.log(iteraw.raw);
               return true;
           }
           //console.log(element);
        });
        if(found){
            found.count++;
        } else {
            similarErrorsList.push({errname: iteraw.raw, count: 1});
        }
    }
    return similarErrorsList;
}

function sumUpErrors(text){
    var summing=[];
    summing.push("used out of scope");
    summing.push("Missing semicolon");
    summing.push("Expected an identifier");
    summing.push("Expected an operator");
    summing.push("Unrecoverable syntax error");
    summing.push("Unclosed string");
    summing.push("Expected an identifier and instead");
    summing.push("Expected an assignment or function call");

    var resulttext = "";
    var totalKnownCount = 0;
    //console.log(keycount);
    for (const sumtex of summing) {
        var re = new RegExp(sumtex, 'g');
        var keycount = (text.match(re) || []).length;
        totalKnownCount = totalKnownCount + keycount; 
        if(keycount>0)
            resulttext = resulttext + "; " + sumtex + ": "+keycount+". ";
    }
    if ((text.length>0) && (totalKnownCount==0))
        resulttext=resulttext + " there are unknown warnings";
    return resulttext;

}

function buildTaskName(longTaskName){
    var firstDash = longTaskName.indexOf('-');//first dash
    var secondDash = longTaskName.indexOf('-',firstDash+1);
    var lastSpace = longTaskName.lastIndexOf(' ');
    var result = longTaskName.slice(secondDash,lastSpace);
    return result;
}
function courseStatusReportPerStudent(){
    // report every help/intervention needing student 
    // order by error count of student, max errors or missing submissions first. 
    //  list task submissions of the student with errors in those. 
    //  here we need to think about the topics teached. 
    console.log("Building raport");
    console.log("Order by error count of student");
    console.log("Report task details for every student");
    console.log("PRINT teacher report");
}

if (require.main === module) {
    //sumUpErrors("Missing semicolon. line: 10! Missing semicolon. line: 12! Missing semicolon. line: 14! Missing semicolon. line: 24! Missing semicolon. line: 31! Missing semicolon. line: 40! Missing semicolon. line: 51! Missing semicolon. line: 69! Missing semicolon. line: 72! Expected an identifier and instead saw '{a}'. line: 84!");
    getConfData();

/*    var confDone = fs.existsSync("\alphabet.json");
    if (!confDone){
        readDirectoryFileNames(); 
    }
    else{
        readconfFile();
        console.log("Ajetaan kurssianalyysi");
        // with common log for tasks
        //codeCheck.codeCheckMain()
    }
*/

    //C:\Users\veper\Documents\SOFTAUS\StaticCodeAssignmentCheck\alphabet.json
        
/*    var settings = '{"name":"John", "age":30, "car":null}';
    var res = writeSettings(settings, ()=>{
        console.log("start big loop");
    });
    console.log(res);
*/
}
/** INSTRUCTIONS OF USAGE
 * copy and unzip all task and quiz submissions to one course root folder. 
 * Unzip task submission files. delete zip files. course root folder should have only
 * folders of tasks and csv of quizzes. 
 * For task folder you need to provide a structure having reserved words to be checked. 
 * tasks in moodle should be named starting with sequential number. if not then folder
 * names should be re-named to start sequential numbers. task configuration files are named with 
 * those same sequential numbers. 
 * 
 * Continuos evaluation continuously named tasks: download task zips and unpac them when needed 
 * to same folders as before replacing original files. 
 * 
 */

/* array of objects to file 
const fs = require('fs');
var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
const jsonContent = JSON.stringify(alphabet);

fs.writeFile("./alphabet.json", jsonContent, 'utf8', function (err) {
    if (err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 
*/
/*var settings = [];
    settings.push();
    {"taskFolder":"John", "quizFilename":" ", "reportLevel":1, "scenario": 1}
                '{"name":"John", "age":30, "car":null}'];

function readSettings(){
    fs.readFile('./customer.json', 'utf8', (err, jsonString) => {
        if (err) {
            console.log("File read failed:", err)
            return
        }
        console.log('File data:', jsonString) 
    });
}
*/
