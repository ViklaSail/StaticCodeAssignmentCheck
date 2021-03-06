// luetaan alihakemiston javascript tiedoston nimet ja polut
// ajetaan jokaista tiedostoa vasten staattinen check JSHINT
// kirjoitetaan tiedostokohtainen raportti virheistä: tiedoston nimessä on käyttäjän nimi
// lähetetään korjauskehotus viestiä kullekkin käyttäjälle: generoi mailit exelillä? alla ohje
// TODO: errorit csv-tiedostoon
// nimien erottaminen tiedostonnimistä
// yhdistä collaboration checkeriin
// raportointi
// https://www.npmjs.com/package/html-pdf

var taskChecking = require('./taskCheck');

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


// First I want to read the file
function readFileToArray(arr,tiedosto, statCallback, callback) {
  console.log(tiedosto);
  fs.readFile(tiedosto, function read(err, data) {
    if (err) {
        throw err;
    }
    const content = data;
    arr = data;
    let tiedostoNimi = tiedosto.replace("./palautetut/", "");
    processFile(tiedostoNimi, content, statCallback);   // Or put the next step in a function and invoke it
    callback(arr);
  });
  console.log("LOPPU READFILETOARRAY");
}

/**
 * ProcessFile: extract information of the file and write it to statisticsline for a file
 * @param {*} content 
 * @param {*} staCallBack 
 */
function processFile(tiedostonimi, content, staCallBack) {
  let koodi = content.toString('utf-8');
  let errcount = 0;
  console.log(koodi);
  //fileStatisticsCallback tänne parametrina ja sitä sitten kutsutaan joka kerta!!!!
  JSHINT(content.toString('utf-8'),{ undef: true, "node": true, "devel": true}); //"node": true
  lista.push(JSHINT.data()); //lisää tietorakenne tähän, lisäksi tiedoston nimi. 
  if(JSHINT.data().errors){
    errcount = JSHINT.data().errors.length;
    firsterror = JSHINT.data().errors[0].raw;
    errorList = JSHINT.data().errors[0];
  }
  var commandWarnings = taskChecking.checkRequiredReserwedWords(koodi);
  var variableWarnings = taskChecking.checkRequiredVariableNames(koodi);
  console.log("icon " + icon.length);
  //staCallBack(tiedostonimi+" virheitä " + errcount + " ensimäinen virheteksti" + firsterror, commandWarnings, variableWarnings); 
  staCallBack(tiedostonimi, errcount, errorList, commandWarnings, variableWarnings); 
}
//**testi loppuu */

function fillArray(arr, statisticallback, callback) {
  const dirPath = path.join(__dirname, "./palautetut/");
  fs.readdir(dirPath, function (err, files) {
    if (err) {
      return console.log("Unable to scan directory: " + err);
    }
    files.forEach(function (file) {
        readFileToArray(rivit, "./palautetut/"+file, statisticallback, (content) => { //TÄMÄ KUTSU POIS TODO TÄSSÄ ONGELMAA. EIKÄ OLE
            console.log("content: ", content);
            console.log("callback" + filecount);
        });
        // vanha koodi jatkuu
        arr.push(file);
    });
    console.log("value ==> " + arr); // array is fill here
    callback(arr);
  });
}

//tässä lasketaan montako fileä on käsitelty. tämä välitetään parametrina ketjuun
// https://www.npmjs.com/package/html-pdf raportin tekoon tässä? kutsutaanko erillistä funktiota? Kyllä. 
function fileStatisticsCallback(tiedostonimi, errcount, errorList, commandWarnings, variableWarnings){
  filereport = [tiedostonimi,errcount,errorList, commandWarnings, variableWarnings];
  console.log(filecount);
  filecount++;
  // kutsuttaessa lisää tilasto-arrayhyn tarvittavat tiedot (globaali array?). kun on kutsuttu yhtä monta kertaa kun on rivejä filenamelistassa
  //kirjoitetaan tilasto-array tiedostoon ja lähdetään. Tässä on ongelmana ainoastaan sen funktio-osoittimen tuominen tänne asti. 
  var tiedostoLkm = icon.length;
  studentSubmissionAnalysis.push(filereport);
  if (filecount>=tiedostoLkm) {
    console.log("kirjoitetaan analyysi-taulukko tiedostoon, tehdään raportti. ");
    taskChecking.prepareReport(studentSubmissionAnalysis);

  }
}

if (require.main === module) {
  console.log("luetaan tiedosto async");
  console.log("luotaan hakemiston tiedostonimet async callback");
  fillArray(icon, fileStatisticsCallback, (filelist) => {
    console.log("content: ", filelist); 
  });

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