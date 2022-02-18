/**
 * Quiz/exam related functions and system level mocking functions. 
 * 
 */
/*
 checkThese: { 
  variables: [{name:"luvunArvaus", count: 1}, {name:"vertaa",count:1} ],
  commands:  [{name:"function", count: 1}, {name:"while", count:1}, {name:"if",count:1} ]
  //linecount: 20
  },
  name : {givenName: "testinimi", surname: "sukunimi"}, //for testing purposes
  submission: "javascript code for inspection"
};
*/

const { getQuizSubmissions } = require('./testVariables');
var fake = require('./testVariables');
const fs = require('fs');
const csv = require('csv-parser');
var cleared_from_dublicates = [];
const csvpath = "./T42T177OJ-3001-Peräkkäisyys-periaate ja muuttujat (keskiviikkoiltaan mennessä)-TESTI.csv";
var variable_list= [];
var structure_list = [];
var listOfQuizAnswers = [];
var allTaskCheckWords = []; //

function testGetQuizSubmissions(timeoutCallback){//test function simulating long lasting async
    var fakeCheckStructureList = [];
    fakeCheckStructureList.push(fake.taskOfStudent);
    fakeCheckStructureList.push(fake.taskOfStudent2);
    fakeCheckStructureList.push(fake.taskOfStudent3);
    setTimeout(timeoutCallback, 5500, fakeCheckStructureList);
}

function testGetTaskCheckParameters(taskName){
  if (allTaskCheckWords.length == 0) {
    readAllTaskChecks();
  }
  console.log(allTaskCheckWords);
  //array.find(function(element, index, array),thisValue)
  var found = allTaskCheckWords.find(function(element) {
    if(element.taskFolder==taskName){
      console.log(taskName);
      return true;
    }
    console.log(element);
  });
  console.log(found);
  if(!found){//return basic empty
    found = fake.commonCheckStruct;
  }
  return found;
}

/**
 * faking. TODO actual file reading
 */
function readAllTaskChecks(){
  //allTaskCheckWords.push(fake.taskOfStudent2);
  //allTaskCheckWords.push(fake.taskOfStudent3);
  allTaskCheckWords=fake.taskCheckStructs;
}

function get_all_Students(csvpath,callback) {

  fs.createReadStream(csvpath)
    .on('error', () => {
        // handle error
    })
    .pipe(csv())
    .on('data', (row)  => {
        var email = row["Sähköpostiosoite"];
        if (email) {
          var timestamp = row["Suoritettu"];
          if (!timestamp) {
            console.log("timestamp undefined" + csvpath);
          };
          var date = convert_timestamp(timestamp, csvpath);  
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
        }
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
    surname = x.split('.')[1];
    return surname.split('@')[0];
  }  

function convert_timestamp(x,csvpath) {
  day = x.split('.')[0]; //// Could be problem if format is 9 instead of 09
  var month = x.split(' ')[1];
  if(!month){
    console.log("month undefined "+csvpath);
  }
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

function does_nothing(st) {
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

if (require.main === module) {
  // testGetTaskCheckParameters("T42T177OJ-3001-JavaScript perusteet OSA 10 - IF lause 2606-665951");
  testGetTaskCheckParameters("T");
}




module.exports = {
    goo: "googoo",
    //getQuizSubmissions: testGetQuizSubmissions
    getQuizSubmissions: get_all_Students, 
    GetTaskCheckParameters: testGetTaskCheckParameters
    
    
};

//get_all_Students(callbackAsParameter); Calling the main functio of file
/**
 * Specifications and settings for different task descriptions in the quiz. 
 * Different options for required and counted things: 
 * 
 * 1. All required reserved words/structures and variables are written in ALL CAPITALS. 
 * In task submission those can be in lower case. Reserved words are detected automatically, 
 * Rest of the detected words are function- names and variable names. Note: bolded words 
 * transfer to all capital letter-words when exporting csv file from Moodle. 
 * ;;; seems to be carriage-return-newline
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
 * Looks for real names and replaces those with fake names in file 
 * Rewrites @edu.lapinamk.fi with @student.uni.com
 * 
 * Discussion points with Andreas, latest findings
 * bold->capital,new-line ;;;
 * 
 *  first three lines vs capital serch word finding. 
 * find all uppercase words.
 * https://www.techighness.com/post/how-to-get-all-uppercase-words-from-a-string-in-javascript/
 * 
 */

/**
 * TASK LIST
 * TODO: quiz anonymisation script
 * Reads file with real name - fake name pairs
 * 
 * TODO: dublicate stripping: older submissions of the same person removed. 
 * 
 * TODO: Plan and implement configuration file: 
 * List every fixed file or string in these source code files. Find out also purpose
 * 
 * TODO: Course-level configuration and report management: 
 * root directory under which there are task directories and quiz.csv files
 * task and quiz name- recording and handling, day level. 
 * Course status report running: studen/task level intervention plan by report results.
 * 
 * TODO: UI for all this. 
 * 
 */