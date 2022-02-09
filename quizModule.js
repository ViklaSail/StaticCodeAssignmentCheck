/**
 * Quiz/exam related functions and system level mocking functions. 
 * 
 */

const { getQuizSubmissions } = require('./testVariables');
var fake = require('./testVariables');
const fs = require('fs');
const csv = require('csv-parser');
const csvpath = "./T42T177OJ-3001-Peräkkäisyys-periaate ja muuttujat (keskiviikkoiltaan mennessä)-TESTI.csv";
var variable_list= [];
var structure_list = [];

function testGetQuizSubmissions(timeoutCallback){//test function simulating long lasting async
    var fakeCheckStructureList = [];
    fakeCheckStructureList.push(fake.taskOfStudent);
    fakeCheckStructureList.push(fake.taskOfStudent2);
    fakeCheckStructureList.push(fake.taskOfStudent3);
    setTimeout(timeoutCallback, 5500, fakeCheckStructureList);
}

function get_all_Students(callback) {

  fs.createReadStream(csvpath)
    .on('error', () => {
        // handle error
    })
    .pipe(csv())
    .on('data', (row)  => {
        var First_name = row["Etunimi"];
        var email = row["Sähköpostiosoite"];
        var surname = remove_from_email(email);
        var question = row["Kysymys 1"];
        var answer = row["Vastaus 1"];
        if ((question.includes("Required Structures:")) && (question.includes("Required Variables:"))) {
          var structure_array = find_structure(question);
          var varbles_array = find_variables(question);
          var variable_list = create_object_variables(varbles_array);
          var structure_list = create_object_stucture(structure_array);
      } else {
          var structure_list = [];
          var variable_list= [];

          structure_list[row] = {
          name: "Error",
          value: 0
          };

          variable_list[row] = {
            name: "Error",
            value: 0
          };
        }
        var checkThese = {"Variables":variable_list, "Commands":structure_list};
        var name = {"givenName":First_name, "surname":surname};
        var submission = {"submission":answer};
        var taskOfStudents = {checkThese, name, submission};
        callback(taskOfStudents);
    })
    .on('end', () => {
        // handle end of CSV
  });

}

function find_structure(text_to_search) {
  var structure = text_to_search.split(']')[0];
  structure = structure.substring(structure.indexOf('[') + 1);
  return structure.split(",");
  }

function find_variables(text_to_search) {
  var varbles = text_to_search.split(']')[1];
  varbles = varbles.substring(varbles.indexOf('[') + 1);
  return varbles.split(",");

  }

function remove_from_email(x) {
    surname = x.split('.')[1];
    return surname.split('@')[0];
  }  
    
    
function create_object_variables(array) {
  var variables_value = [1];
  for (var x = 0; x < array.length; x++) {
    if (string_contains_number(array[x]) == true) {
      variables_value = array[x].match(/\d+/);
      var remove_numb = array[x];
      array[x] = remove_numb.split('(')[0];
    } 
    variable_list[x] = {
      name: array[x],
      value: variables_value
    };
    }    
  return variable_list;
}

function create_object_stucture(ar) {
  var variables_value = 1;
  for (var x = 0; x <ar.length; x++) {
      if (string_contains_number(ar[x]) == true) {
        variables_value = ar[x].match(/\d+/);
        var remove_numb = ar[x];
        ar[x] = remove_numb.split('(')[0];
      } 
      structure_list[x] = {
        name: ar[x],
        value: variables_value
      };
    }    
  return structure_list;  
}

function string_contains_number(st) {
  if (st.includes("(")) {
    return /\d/.test(st);
  } else {
      return false;
}
}

function only_to_print(x) {
  console.log(x);
  return x;
}
// Calling and Printing
//Example question start: Required Structures:[for(3), while, if] Required Variables:  [ARPAMUUTTUJA1, ARPAMUUTTUJA2(2)]     

function callbackAsParameter(y){
  console.log(y);
}
 
module.exports = {
    goo: "googoo",
    getQuizSubmissions: testGetQuizSubmissions
};

/**
 * Specifications and settings for different task descriptions in the quiz. 
 * Different options for required and counted things: 
 * 
 * 1. All required reserved words/structures and variables are written in ALL CAPITALS. 
 * In task submission those can be in lower case. Reserved words are detected automatically, 
 * Rest of the detected words are function- names and variable names
 * 
 * 2. specific structure using brackes by Andreas
 * 
 * 3. First three lines in description reserved for this required words-purpose
 * first line has heading: VAADITTAVAT RAKENTEET JA NIMET nuodossa nimi:lukumääräsuositus
 * second line has required code structures and reserved words
 * third line has required variable and function names. 
 * 
 * There need to be configuration switch forcing one of these ways to search from task description. 
 * that switch can also be set to "automatic detection". That should first detect what is the 
 * method used to write required words and then use that method systematically to whole run???
 * 
 * Error handling: add to object "errors" object where you put error description as a value. 
 * 
 */