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
    var confDone = fs.existsSync("\alphabet.json");
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
        element.courseCallBackFunction = courseCallBack;
        codeChecker.codeCheckMain(element, rootdirectory);
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
    if (quizAndTaskCount <= currentCount){
        //when all tasks are evaluated, call courseTatusReportPerStudent
        courseTatusReportPerStudent();
    }
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
