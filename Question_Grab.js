/*jshint sub:true*/

const fs = require('fs');
const csv = require('csv-parser');
const csvpath = "./T42T177OJ-3001-Peräkkäisyys-periaate ja muuttujat (keskiviikkoiltaan mennessä)-TESTI.csv";
//var final_test = getPerson("Etunimi3", "Sukunimi3"); 
function getPerson(first_name, last_name, callback) {
  fs.createReadStream(csvpath)
    .on('error', () => {
        // handle error
    })
    .pipe(csv())
    .on('data', (row)  => {
        var First_name = row["Etunimi"];
        var email = row["Sähköpostiosoite"];
        var surname = remove_from_email(email);
        if ((first_name == First_name) && (last_name == surname)){
            var question = row["Kysymys 1"];
            var structure_array = find_structure(question);
            var varbles_array = find_variables(question);
            var variable_list = create_object_variables(varbles_array);
            var structure_list = create_object_stucture(structure_array);
            var person = {"Variables":variable_list, "Commands":structure_list};
          //var result = only_to_print(person);
            callback(person);
            //return result;
          }
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
  var variable_list= [];
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
  var structure_list = [];
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

getPerson("Etunimi3", "Sukunimi3",callbackAsParameter); 
