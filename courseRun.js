const fs = require('fs');
var path = require('path');
const { start } = require('prompt');
const { resourceLimits } = require('worker_threads');
var count;
var rootfilelist =[];
var taskFolderList = [];
var initialAssignmentConfigurations = [];
//const config = require('./config.json')

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
          var fuldir = "./TESTIMATERIAALIA/"+file;
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
    var fuldir = "./TESTIMATERIAALIA/"+filename;
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
        writeConfigurations();
    }

}

function writeConfigurations(readyToStartCourceCheck) {
    var jsonContent = JSON.stringify(initialAssignmentConfigurations);
    fs.writeFile("./alphabet.json", jsonContent, 'utf8', function (err) {
        if (err) {
            return console.log(err);
        }
    
        console.log("The file was saved!");
        readyToStartCourceCheck();
    }); 
    
}

function readconfFile(readyToStartCourceCheck) {
    fs.readFile('./alphabet.json', 'utf8', (err, jsonString) => {
        if (err) {
            console.log("File read failed:", err)
            return console.log(err);
        }
        console.log('File data:', jsonString);
        var test = JSON.parse(jsonString); 
        console.table(test);
        readyToStartCourceCheck();
    });
}

function getConfData() {
    var confDone = fs.existsSync("\alphabet.json");
    if (!confDone){
        readDirectoryFileNames(readyToStartCourceCheck); 
    }
    else{
        readconfFile(readyToStartCourceCheck);
    }
}
//https://nodejs.dev/learn/working-with-folders-in-nodejs

function readyToStartCourceCheck(){
    console.log("looping through files");
    //need to check that all get done in good order, callbacks will cause problems with global variables
    //wait-function? 
    //reports attached to copy of course check? ensin vain yksi
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
