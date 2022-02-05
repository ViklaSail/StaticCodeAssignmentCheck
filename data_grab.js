const fs = require('fs')
const csv = require('csv-parser')
const users = [];
const filepath = "./T42T177OJ-3001-Peräkkäisyys-periaate ja muuttujat (keskiviikkoiltaan mennessä)-TESTI.csv"
fs.createReadStream(filepath)
    .on('error', () => {
        // handle error
    })
    .pipe(csv())
    .on('data', (row)  => {
        surname = 0;
        First_name = row["Etunimi"];
        email = row["Sähköpostiosoite"];
        exam_start = row["Aloitettiin"];
        question = row["Kysymys 1"];
        answer = row["Vastaus 1"];
        search_word(question);
        remove_from_email(email);
        let person = {firstName:First_name, Last_name:surname, Email:email, time:exam_start, Question:question, Solution:answer};
        console.log(person);
    })
    .on('end', () => {
        // handle end of CSV
    })

function search_word(text_to_search) {
    if (text_to_search.includes("ARPAMUUTTUJA1")) {
        question = "Arpamuuttuja";
    } else if (text_to_search.includes("SATUMUUTTUJA1")) {
        question = "Satumuuttuja";
    } else if (text_to_search.includes("LOTTOMUUTTUJA1")) {
        question = "Lottomuuttuja";
    } else if (text_to_search.includes("RANDVAR1")) {
            question = "Randvar";  
    } else {
        question = "Unknown question";
    }
    }

function remove_from_email(x) {
    surname = x.split('.')[1];
    surname = surname.split('@')[0];
}

// Main Guide for CSV reading: https://dev.to/isalevine/parsing-csv-files-in-node-js-with-fs-createreadstream-and-csv-parser-koi    