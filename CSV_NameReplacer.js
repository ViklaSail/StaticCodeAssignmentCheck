const fs = require('fs');
var path = require('path');
const csv = require('csv-parser');
const csvpath = "./T42T177OJ-3001-Torstain pakolliset tehtävät-vastaukset.csv";
var XLSX = require("xlsx");
var workbook = XLSX.readFile("Finnish_Names_Modified.xlsx");
let worksheet_First = workbook.Sheets[workbook.SheetNames[0]];
let worksheet_Last = workbook.Sheets[workbook.SheetNames[1]];
var First_Names = [];
var Last_Names = [];
var records = [];
var csvWriterList = [];

/// Name Generate

for(let cell in worksheet_First) {
    const value = worksheet_First[cell].v;
    if(value){
        First_Names.push(value);
    }
}

for(let cell in worksheet_Last) {
    const value = worksheet_Last[cell].v;
    if(value){
        Last_Names.push(value);
    }
}

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

function generatestudents(number_of_students) {
    for (var x = 0; x < number_of_students; x++) {
        const random_First_number = randomIntFromInterval(2, First_Names.length);
        const ransom_Last_number = randomIntFromInterval(2, Last_Names.length);
        Etunimi = First_Names[random_First_number];
        Sukunimi = Last_Names[ransom_Last_number];
        email = create_email(Etunimi, Sukunimi);
        return [Etunimi, Sukunimi, email];
    }
}

function create_email(f,s){
    new_string = f + "."+ s + "@student.uni.com"
    return new_string.toLowerCase();

}


<<<<<<< HEAD

function get_all_Students(targetName, csvpath, callback) {
    var records = [];
=======
function get_all_Students(callback) {
  var records = [];
  row_count = 0;
>>>>>>> 3d0b2bd (Beta unit testing)
  fs.createReadStream(csvpath)
    .on('error', () => {
        // handle error
    })
    .pipe(csv())
    .on('data', (row)  => {
        row_count++
        var generated_Data = generatestudents(1);
        var First_name = generated_Data[0];
        var email = generated_Data[2];
        var surname = generated_Data[1];
        var question = row["Kysymys 1"];
        var tila = row["Tila"];
        var start = row['Aloitettiin'];
        var suori = row['Suoritettu'];
        var suori_kesto = row['Suorituskerran kesto'];
        var arvo = row['Arvosana/1,00'];
        var answer = row['Vastaus 1'];
        var person = {Sukunimi: surname, Etunimi: First_name , Sähköpostiosoite: email , Tila: tila, Aloitettiin: start, Suoritettu: suori, 'Suorituskerran kesto': suori_kesto , "Arvosana/1,00": arvo , 'Kysymys 1': question , 'Vastaus 1': answer };
        records.push(person);
        //var result = only_to_print(person);
        //callback(targetName, records);
    })
    .on('end', () => {
        // handle end of CSV
        callback(targetName, records);
  });
}
// Calling and Printing
//Example question start: Required Structures:[for(3), while, if] Required Variables:  [ARPAMUUTTUJA1, ARPAMUUTTUJA2(2)]     


const createCsvWriter = require('csv-writer').createObjectCsvWriter;
var testifile = "./TESTMIATERIAALIAB/testicsv.csv";

function csvWriterGeneratorSingleton(path){
    var writerToReturn;
        var foundItem = csvWriterList.find(function(writerRecord){
            if(writerRecord.path == path) {
                return writerRecord;
            }
        });

        if (!foundItem){
            var csvWriter = createCsvWriter({
                //path: 'replaced',
                path: path,
                header: [
                {id: 'Sukunimi', title: 'Sukunimi'},
                {id: 'Etunimi', title: 'Etunimi'},
                {id: 'Sähköpostiosoite', title: 'Sähköpostiosoite'},
                {id: 'Tila', title: 'Tila'},
                {id: 'Aloitettiin', title: 'Aloitettiin'},
                {id: 'Suoritettu', title: 'Suoritettu'},
                {id: 'Suorituskerran kesto', title: 'Suorituskerran kesto'},
                {id: 'Arvosana/1,00', title: 'Arvosana/1,00'},
                {id: 'Kysymys 1', title: 'Kysymys 1'},
                {id: 'Vastaus 1', title: 'Vastaus 1'},
            ]
            });
            var writer = {}
            writer.path = path;
            writer.csvwriter = csvWriter;
            csvWriterList.push(writer);
            writerToReturn = csvWriter;
        } else
            writerToReturn = foundItem.csvwriter;
   return writerToReturn;
}
// Writing
<<<<<<< HEAD
function callbackAsParameter(targetName,y){
    csvWriterGeneratorSingleton(targetName).writeRecords(y)
=======
function callbackAsParameter(y){
    writen_row = 0
    csvWriter.writeRecords(y)
>>>>>>> 3d0b2bd (Beta unit testing)
        .then(() => {
            written_row++
            console.log("Names replaced !")
        });;
} 

// these folders need to be physically generated. 
var rootdirectory = "./TESTIMATERIAALIA/";
var targetdirectory= "./TESTIMATERIAALIAB/";

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
          //var confstruct = fillConfStruct(file);
          //nitialAssignmentConfigurations.push(confstruct);
          if (isFile){
            // CALL REPLACER FUNCTION
            //rootfilelist.push(file);
            var targetName = targetdirectory+file;//+"TEST";
            get_all_Students(targetName, fuldir,callbackAsParameter);
          }
          else {
            console.log("folder");
            //taskFolderList.push(file);
          }
          //allFilesRead();
      });
    });
  }

// https://www.youtube.com/watch?v=JVLKXoTVE2w&ab_channel=SouthBridge Create new file and write   
if (require.main === module) {
    //sumUpErrors("Missing semicolon. line: 10! Missing semicolon. line: 12! Missing semicolon. line: 14! Missing semicolon. line: 24! Missing semicolon. line: 31! Missing semicolon. line: 40! Missing semicolon. line: 51! Missing semicolon. line: 69! Missing semicolon. line: 72! Expected an identifier and instead saw '{a}'. line: 84!");
    //getConfData(); 
    readDirectoryFileNames();
    //get_all_Students(callbackAsParameter); 
}
/**
 * TASKLIST
 * TO DO: change also e-mail address domain from edu.lapinamk.fi => edu.appliedsciences.fi
 * TO DO: make it dynamic, exactly same column names as in source file
 * TO DO: name file according to same file name as original file. save files to separate folder. 
 * TO DO: read filenames and loop through the list: change student names names in every file name. remove numbers after name.
 * 
 * 
 */