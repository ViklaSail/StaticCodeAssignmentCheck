// luetaan alihakemiston javascript tiedoston nimet ja polut
// ajetaan jokaista tiedostoa vasten staattinen check JSHINT
// kirjoitetaan tiedostokohtainen raportti virheistä: tiedoston nimessä on käyttäjän nimi
// lähetetään korjauskehotus viestiä kullekkin käyttäjälle: generoi mailit exelillä? alla ohje
// TODO: errorit csv-tiedostoon
// TODO: quiz - csv handlaus.
// TODO: quiz - random kysymys handlaus
// TODO: 
// nimien erottaminen tiedostonnimistä
// yhdistä collaboration checkeriin
// raportointi
// https://www.npmjs.com/package/html-pdf

var taskChecking = require('./taskCheck');
var quizModule = require('./testVariables');
var testFolder = './palautetut/';
var fs = require('fs');
const { JSHINT } = require('jshint');
var lista =[];
var icon = [];
var studentSubmissionAnalysis = [];
var rivit = [];
var fileErrors = [];
var path = require('path');
var filecount = 0;
var quizObjectListGlobal;
var readAllQuizzDataDone=false;


function readAllQuizzData(scenario) {
  if (scenario==3){ //for loop list through. call processSubmission
    console.log("TODO scenario 3 QUIZ ALONE");
    quizModule.getQuizSubmissions( (quizObjectList) => {
      //TODO: here above-mentioned for-loop
      console.log("content: ", quizObjectList); 
    });
  } else if (scenario==2){
    console.log("TODO scenario 2 quiz + connected task, ASYNC");
    quizModule.getQuizSubmissions( (quizObjectList) => {
      quizObjectListGlobal = quizObjectList;
      readAllQuizzDataDone = true;
      console.log("content: ", quizObjectList); 
    });
  } else {
    console.log("TODO: throw an error, this is not allowed");
  }
}

function safetyTimeout(testi){
  console.log("TIMEOUT TRIGGERED"+testi);
}

function readQuizData(name){
  //TODO find record from quizObjectListGlobal with name
  //{givenName: "testinimi", surname: "sukunimi"}
  //readAllQuizzDataDone=false; TÄHÄN VAIKUTTAA TIMEOUT!!! 
  foundItem = quizObjectListGlobal.find(function(forCheckingCode){
    if(readAllQuizzDataDone) {
      var givennameSame = forCheckingCode.name.givenName == name.givenName;
      var surnameSame = forCheckingCode.name.surname == name.surname;
      if (givennameSame && surnameSame){
        return forCheckingCode; 
      }
    } else {
      console.log("QUIZDATA NOT READ, ERROR");
    }
  });
  return foundItem;

}

//* FUNCTION processSubmissionCallback(tiedostonimi, stringsToCheck)
function processSubmissionCallback(tiedostonimi, stringsToCheck){
  //tähän jääty
}

function parseName(filename){
  var posUnderscore = filename.search("_");
  var posSpace = filename.search(" ");
  var givenname = filename.slice(0, posSpace);
  var surname = filename.slice(posSpace+1, posUnderscore);
  return  {givenName: givenname, surname: surname};
}
/**
 * Reads file to array. This function is called only for "task" component downloaded assignments. in two occations. 
 * 1. task description is given in "task" component and it is the same for all: checklist is typed manually
 * 
 * 2. Random tasks case: Task description is given by "Quiz", with instructions to keep or copy instructions and submit 
 * the first part of the assignment in web text: checklist is extracted from CSV file downloaded from MOODLE. 
 * To download it go to the quiz, "tarkastele tuloksia, " jossain siellä on mahdollisuus valita sekä kysymys että vastaus. 
 * In this 2'nd scenario, actual coding tasks are still extracted from traditional "task", component in to the folder. 
 * Answers need to be connected to correct checklist object. 
 * From external module we will get checklist for individual student. 
 * 
 * @param {*} arr 
 * @param {*} stringsToCheck 
 * @param {*} tiedosto 
 * @param {*} statCallback 
 * @param {*} callback 
 */
function readFileToArray(arr, stringsToCheck, tiedosto, statCallback) {
  //console.log(tiedosto);
  fs.readFile(tiedosto, function read(err, data) {
    if (err) {
        throw err;
    }
    const content = data;
    arr = data;
    let tiedostoNimi = tiedosto.replace("./palautetut/", "");
    processSubmission(tiedostoNimi, stringsToCheck, content, statCallback);   // Or put the next step in a function and invoke it
  });
  console.log("LOPPU READFILETOARRAY");
}

/**
 * processSubmission: extract information of the file and write it to statisticsline for a file
 * @param {*} content 
 * @param {*} staCallBack 
 */
function processSubmission(tiedostonimi, stringsToCheck, content, staCallBack) {
  let koodi = content.toString('utf-8');
  let errcount = 0;
  let errorList =[];
  var student = parseName(tiedostonimi);
  var foundChecklist = readQuizData(student);
  console.log(student + foundChecklist);
  //fileStatisticsCallback tänne parametrina ja sitä sitten kutsutaan joka kerta!!!!
  JSHINT(content.toString('utf-8'),{ undef: true, "node": true, "devel": true}); //"node": true
  lista.push(JSHINT.data()); //lisää tietorakenne tähän, lisäksi tiedoston nimi. 
  if(JSHINT.data().errors){
    errcount = JSHINT.data().errors.length;
    errorList = JSHINT.data().errors;
  }
  var errorObject = reduceErrors(errorList);
  var commandWarnings = taskChecking.checkRequiredReserwedWords(koodi,stringsToCheck);
  var variableWarnings = taskChecking.checkRequiredVariableNames(koodi,stringsToCheck);
  console.log("icon " + icon.length);
  //staCallBack(tiedostonimi+" virheitä " + errcount + " ensimäinen virheteksti" + firsterror, commandWarnings, variableWarnings); 
  var submission = {};
  submission.file = tiedostonimi;
  submission.errors = errorObject;
  submission.commands = commandWarnings;
  submission.variables =variableWarnings;
  //staCallBack(tiedostonimi, errcount, reducedErrorList, commandWarnings, variableWarnings); 
  staCallBack(submission);
}
//**testi loppuu */
function reduceErrors(list){
  var errorObject = {"errcount": list.length};
  var errline ="";
  var reducedErrorList = [];
  if(list){
    for(i=0;i<list.length;i++){
      reducedErrorList.push(list[i].raw+" line: "+list[i].line)
      errline = errline + list[i].raw+" line: "+ list[i].line + "! ";
    }
  }
  errorObject.errortxt = errline;
  errorObject.type="Error";
  return errorObject; 
  //return reducedErrorList;
}

/**
 * Skannaa hakemiston tiedostot ja kutsuu joka tiedostolle checkkiä
 * @param {*} arr 
 * @param {*} stringsToCheck : words and wordcounts to check from code
 * @param {*} statisticallback 
 * @param {*} callback 
 */
function readFileNames(scenario, filelist, stringsToCheck, statisticallback) {
  var dirPath = path.join(__dirname, "./palautetut/");
  if (scenario==1){
    fs.readdir(dirPath, function (err, files) {
      if (err) {
        return console.log("Unable to scan directory: " + err);
      }
      files.forEach(function (file) {
          // this forks to multiple async calls with shared statisticscallback. Where to call data_grab? 
          readFileToArray(rivit, stringsToCheck, "./palautetut/"+file, statisticallback);
          filelist.push(file);
      });
    });
  } else if (scenario == 2) { //quiz-task-combo
    //ASYNC readAllQuizzData(scenario = 2, )
    readAllQuizzData(scenario);
    fs.readdir(dirPath, function (err, files) {
      if (err) {
        return console.log("Unable to scan directory: " + err);
      }
      files.forEach(function (file) {
          // this forks to multiple async calls with shared statisticscallback. Where to call data_grab? 
          readFileToArray(rivit, stringsToCheck, "./palautetut/"+file, statisticallback);
          filelist.push(file);
      });
    });

  } else if (scenario == 3) { //quiz alone
    console.log("TODO: scenario 3 handling")
    readAllQuizzData(scenario);
  }
}

//tässä lasketaan montako fileä on käsitelty. tämä välitetään parametrina ketjuun
// https://www.npmjs.com/package/html-pdf raportin tekoon tässä? kutsutaanko erillistä funktiota? Kyllä. 
//function fileStatisticsCallback(tiedostonimi, errcount, errorList, commandWarnings, variableWarnings){
function fileStatisticsCallback(submissionRecord){
    //filereport = [tiedostonimi,errcount,errorList, commandWarnings, variableWarnings];
  console.log(filecount);
  filecount++;
  // kutsuttaessa lisää tilasto-arrayhyn tarvittavat tiedot (globaali array?). kun on kutsuttu yhtä monta kertaa kun on rivejä filenamelistassa
  //kirjoitetaan tilasto-array tiedostoon ja lähdetään. Tässä on ongelmana ainoastaan sen funktio-osoittimen tuominen tänne asti. 
  var tiedostoLkm = icon.length;
  studentSubmissionAnalysis.push(submissionRecord);
  if (filecount>=tiedostoLkm) {
    console.log("kirjoitetaan analyysi-taulukko tiedostoon, tehdään raportti. ");
    taskChecking.prepareReport(studentSubmissionAnalysis);
  }
}

if (require.main === module) {
  setTimeout(safetyTimeout, 1500, 'funky');
  quizModule.getQuizSubmissions( (testi) => {
    console.log("content: ", testi); 
  });
  var taskDetailsToCheck = taskChecking.getTaskDetailsForChecking();
  var scenario = 2; //scenario 1: single "task". scenario 2: Quiz + connected "task" (3: quiz alone)
  console.log("luetaan tiedosto async");
  console.log("luotaan hakemiston tiedostonimet async callback");
  readFileNames(scenario, icon, taskDetailsToCheck, fileStatisticsCallback);

}


/*
KOMENTORIVILLÄ  jshint
https://jshint.com/install/
https://stackoverflow.com/questions/21856097/how-can-i-check-javascript-code-for-syntax-errors-only-from-the-command-line

kuinka otetaan nodejs:ssä käyttöön. 
https://stackoverflow.com/questions/49223395/how-to-use-jshint-programmatically-within-node-js
Generoi viestit exelistä
https://support.microsoft.com/en-us/office/use-mail-merge-to-send-bulk-email-messages-0f123521-20ce-4aa8-8b62-ac211dedefa4

readdir async käsittely callback
https://stackoverflow.com/questions/62753781/variable-is-empty-after-call-to-fs-readdir-function
Main funktio noden kanssa.
https://stackoverflow.com/questions/4981891/node-js-equivalent-of-pythons-if-name-main

https://stackoverflow.com/questions/37576685/using-async-await-with-a-foreach-loop

console jshint error
add config {"node": true} in .jshint file
https://github.com/victorporof/Sublime-JSHint/issues/131
.jshintrc
{
   "node": true
}

*/

 /*
fs.readdir(testFolder, (err, files) => {
  files.forEach(file => {
    console.log(file);
    JSHINT(testFolder+file);
    lista.push(JSHINT.data());
  });
});


var source = [
  'function goo() {}',
  'foo = 3;'
];
var options = {
  undef: true
};
var predef = {
  foo: false
};

JSHINT(source, options, predef);

console.log(JSHINT.data());
*/