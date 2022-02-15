/*jshint sub:true*/

const fs = require('fs');
const csv = require('csv-parser');
const csvpath = "./T42T177OJ-3001-Peräkkäisyys-periaate ja muuttujat (keskiviikkoiltaan mennessä)-TESTI.csv";
var variable_list= [];
var structure_list = [];

function get_all_Students(callback) {
  fs.createReadStream(csvpath)
    .on('error', () => {
        // handle error
    })
    .pipe(csv())
    .on('data', (row)  => {
        var email = row["Sähköpostiosoite"];
        var timestamp = row["Suoritettu"];
        var First_name = row["Etunimi"];
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
        var end_time = {"Ended at":timestamp};
        var checkThese = {"Variables":variable_list, "Commands":structure_list};
        var name = {"givenName":First_name, "surname":surname};
        var submission = {"submission":answer};
        var taskOfStudents = {checkThese, name, submission, end_time};
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


// Calling and Printing
//Example question start: Required Structures:[for(3), while, if] Required Variables:  [ARPAMUUTTUJA1, ARPAMUUTTUJA2(2)]     

function callbackAsParameter(y){
  console.log(y);
}

get_all_Students(callbackAsParameter); 
