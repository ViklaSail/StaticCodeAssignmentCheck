const fs = require('fs');
const csv = require('csv-parser');
const csvpath = "./T42T177OJ-3001-Peräkkäisyys-periaate ja muuttujat (keskiviikkoiltaan mennessä)-TESTI.csv";
var XLSX = require("xlsx");
var workbook = XLSX.readFile("Finnish_Names_Modified.xlsx");
let worksheet_First = workbook.Sheets[workbook.SheetNames[0]];
let worksheet_Last = workbook.Sheets[workbook.SheetNames[1]];
var First_Names = [];
var Last_Names = [];
var records = [];

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
    new_string = f + "."+ s + "@edu.lapinamk.fi"
    return new_string.toLowerCase();

}


function get_all_Students(callback) {
  fs.createReadStream(csvpath)
    .on('error', () => {
        // handle error
    })
    .pipe(csv())
    .on('data', (row)  => {
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
        callback(records);
    })
    .on('end', () => {
        // handle end of CSV
  });
}
// Calling and Printing
//Example question start: Required Structures:[for(3), while, if] Required Variables:  [ARPAMUUTTUJA1, ARPAMUUTTUJA2(2)]     


const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
    path: 'replaced',
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
})

// Writing
function callbackAsParameter(y){
    csvWriter.writeRecords(y)
        .then(() => {
            console.log("Names replaced !")
        });;
} 
// https://www.youtube.com/watch?v=JVLKXoTVE2w&ab_channel=SouthBridge Create new file and write    
get_all_Students(callbackAsParameter); 

/**
 * TASKLIST
 * TO DO: change also e-mail address domain from edu.lapinamk.fi => edu.appliedsciences.fi
 */