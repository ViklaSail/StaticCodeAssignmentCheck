// luetaan alihakemiston javascript tiedoston nimet ja polut
// ajetaan jokaista tiedostoa vasten staattinen check JSHINT
// kirjoitetaan tiedostokohtainen raportti virheistä: tiedoston nimessä on käyttäjän nimi
// lähetetään korjauskehotus viestiä kullekkin käyttäjälle: generoi mailit exelillä? alla ohje
// TODO: errorit csv-tiedostoon
// nimien erottaminen tiedostonnimistä
// yhdistä collaboration checkeriin


const testFolder = './palautetut/';
const fs = require('fs');
const { JSHINT } = require('jshint');
const lista =[];
var icon = [];
var rivit = [];
var fileErrors = []
const path = require('path');
var filecount = 0;



const testitiedosto = './palautetut/tan.js';
/** testi alkaa */
// First I want to read the file
function readFileToArray(arr,tiedosto, callback) {
  console.log(tiedosto);
  //callback("testing"+tiedosto);
  fs.readFile(tiedosto, function read(err, data) {
    if (err) {
        throw err;
    }
    const content = data;
    arr = data;

    // Invoke the next step here however you like
    console.log(content);   // Put all of the code here (not the best solution)
    processFile(content);   // Or put the next step in a function and invoke it
    callback(arr);
  });
  console.log("LOPPU READFILETOARRAY");
}

function processFile(content) {
  console.log(content.toString('utf-8'));// TÄMÄ TOIMII, MITEN LAITETAAN MAINISTA KUTSU? 
  JSHINT(content.toString('utf-8'),{ undef: true, "node": true}); //"node": true
  lista.push(JSHINT.data()); //lisää tietorakenne tähän, lisäksi tiedoston nimi. 
  filecount++;
  console.log("icon " + icon.length);
  if (filecount>=2) {
    console.log("filecount " + filecount + "icon length "+icon.length);
    // kirjoita tiedostoon lista
    var file = fs.createWriteStream('array.txt');
    file.on('error', function(err) { /* error handling */ });
    icon.forEach(function(v) { file.write(v.join(', ') + '\n'); });
    file.end();  
  }
}
//**testi loppuu */

function fillArray(arr, callback) {
  const dirPath = path.join(__dirname, "./palautetut/");
  fs.readdir(dirPath, function (err, files) {
    if (err) {
      return console.log("Unable to scan directory: " + err);
    }
    files.forEach(function (file) {
        // kutsutaan filen luku async
        //readFileToArray(rivit, './palautetut/tan.js', (content) => {
        readFileToArray(rivit, "./palautetut/"+file, (content) => {
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


if (require.main === module) {
  //var rivit =  [];
  console.log("luetaan tiedosto async")
/*
  readFileToArray(rivit, './palautetut/tan.js', (content) => {
    console.log("content: ", content);
  });
*/

  console.log("luotaan hakemiston tiedostonimet async callback");
  fillArray(icon, (filelist) => {
    console.log("content: ", filelist); 
    //readFileToArray(rivit, './palautetut/tan.js', (content2) => {
      /*
    readFileToArray(rivit, filelist, (content2) => {
        console.log("content: ", content2);
    });
*/
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