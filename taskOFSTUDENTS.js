/*jshint sub:true*/

const fs = require('fs');
const csv = require('csv-parser');
const csvpath = "./T42T177OJ-3001-Peräkkäisyys-periaate ja muuttujat (keskiviikkoiltaan mennessä)-TESTI.csv";
var variable_list= [];
var structure_list = [];
var cleared_from_dublicates = [];
//var final_test = getPerson("Etunimi3", "Sukunimi3"); 
function get_all_Students(callback) {

  fs.createReadStream(csvpath)
    .on('error', () => {
        // handle error
    })
    .pipe(csv())
    .on('data', (row)  => {
        var email = row["Sähköpostiosoite"];
        var timestamp = row["Suoritettu"];
        var date = convert_timestamp(timestamp);  
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
        var checkThese = {"Variables":variable_list, "Commands":structure_list};
        var name = {"givenName":First_name, "surname":surname};
        var submission = {"submission":answer, "time":date};
        var taskOfStudents = {checkThese, name, submission,};
        cleared_from_dublicates.push(taskOfStudents);
    })
    .on('end', () => {
      dublivate_remove(cleared_from_dublicates);
      for (var x = 0; x < cleared_from_dublicates.length; x++) {
        callback(cleared_from_dublicates[i]);
      }  
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
    var surname = x.split('.')[1];
    return surname.split('@')[0];
  }  
    
function convert_timestamp(x) {
  day = x.split('.')[0]; //// Could be problem if format is 9 instead of 09
  var month = x.split(' ')[1];
  month = month.substring(month.indexOf(' ') + 0);
  month = finnish_month_converter(month);
  var year = x.split(' ')[2];
  year = year.substring(year.indexOf(' ') + 1);
  var time = x.slice(-5);
  var hour = time.split(':')[0];
  var minute = time.slice(-2); 
  date = new Date(year, month, day, hour, minute, 00);
  return date;
}

function finnish_month_converter(x) {
  if (x = "tammikuu") { x = 01}
  else if (x = "helkmikuu") {x = 02}
  else if (x= "maaliskuu") {x=03}
  else if (x="huhtikuu") {x=04}
  else if (x = "toukokuu") {x = 05}
  else if (x= "kesäkuu") {x=06}
  else if (x="heinäkuu") {x=07}
  else if (x = "elokuu") {x = 08}
  else if (x= "syyskuu") {x=09}
  else if (x="lokakuu") {x=10}
  else if (x = "marraskuu") {x = 11}
  else if (x= "joulukuu") {x=12}
  else  {x="unknow format"};
  return x
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

function dublivate_remove(d) {
  i = 0;
  counter = 0
  do {
    student = d[i].name.givenName + d[i].name.surname
    end_time = d[i].submission.time
    for (let j = 1; j < d.length; j++) {
      if (student == d[j].name.givenName + d[j].name.surname){
        if (end_time.getTime() > d[j].submission.time.getTime()) {
          d = d.splice(j,1)
          console.log("The record in row "+ (j+2) +" has been removed because it contained a later submited dublicate in row " + (i+2) + ".")
          counter++;
        } else if (end_time.getTime() < d[j].submission.time.getTime()) {
          d = d.splice(i,1)
          console.log("The record in row "+ (i+2) +" has been removed because it contained a later submited dublicate in row " + (j+2)+ ".")
          counter++;
        };  
        }
      }
    i++;  
    }
  while (i < d.length);
  if (counter = 0) {
    console.log('This file did not contain any dublicates submissions from any student.')
  }
}
  

// Calling and Printing
//Example question start: Required Structures:[for(3), while, if] Required Variables:  [ARPAMUUTTUJA1, ARPAMUUTTUJA2(2)]     

function callbackAsParameter(y){
  console.log(y);
}

get_all_Students(callbackAsParameter); 
