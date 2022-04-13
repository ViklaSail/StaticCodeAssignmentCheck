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
const path = require('path');
var fake = require('./testVariables');
const fs = require('fs');
const csv = require('csv-parser');
var cleared_from_dublicates = [];
const csvpath = "./T42T177OJ-3001-Peräkkäisyys-periaate ja muuttujat (keskiviikkoiltaan mennessä)-TESTI.csv";
var variable_list= [];
var structure_list = [];
var submissionlist = []
var listOfQuizAnswers = [];
var allTaskCheckWords = [];
 //

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
    .on('data', rowhandling(row))
    .on('end', () => {
      if (submissionlist.length>0){
        //submissionlist.sort( compare );
        submissionlist.sort( comparetime );
        stripTheList(submissionlist);
      }
      else
        console.log("empty list");
      callback(submissionlist);
/*      
      dublivate_remove(cleared_from_dublicates);
      for (var x = 0; x < cleared_from_dublicates.length; x++) {
        callback(cleared_from_dublicates[i]);
        
      }  
        // handle end of CSV
  */    
  });
}

function rowhandling(row) {
  //TODO: Andreas: loop through multiple questions/answers
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
      findCapitalLetterWords(question);
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

      var checkThese = {"variables":variable_list, "commands":structure_list};
      var name = {"givenName":First_name, "surname":surname};
      var submission = {"submission":answer, "time":date};
      var taskOfStudents = {checkThese, name, submission,};
      //cleared_from_dublicates.push(taskOfStudents);
      submissionlist.push(taskOfStudents);
    }
};

function stripTheList(submissionList){
  submissionList.forEach(function(item, index, object) {
    var count = submissionList.filter((element)=>{
      return element.name.surname == item.name.surname;
    }).length;
    if (count>1) {
      object.splice(index, 1);
    }
  });
}

function compare( a, b ) {
  if ( a.name.surname < b.name.surname ){
    return -1;
  }
  if ( a.name.surname > b.name.surname ){
    return 1;
  }
  return 0;
}

function comparetime( a, b) {
  var result = a.submission.time - b.submission.time;
  return result;
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
  if(x=='-') {
    return 0;
  }
  //console.log("x value " + x);
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
  date = new Date(year, month, day, hour, minute, 0);
  return date;
}

function finnish_month_converter(x) {
  if (x == "tammikuu") { x = 0}
  else if (x == "helkmikuu") {x = 1}
  else if (x== "maaliskuu") {x=2}
  else if (x=="huhtikuu") {x=3}
  else if (x == "toukokuu") {x = 4}
  else if (x== "kesäkuu") {x=5}
  else if (x=="heinäkuu") {x=6}
  else if (x == "elokuu") {x = 7}
  else if (x== "syyskuu") {x=8}
  else if (x=="lokakuu") {x=9}
  else if (x == "marraskuu") {x = 10}
  else if (x== "joulukuu") {x=11}
  else  {x=="unknow format"};
  return x;
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
  var i = 0;
  var counter = 0;
  do {
    if(!d[i]){
      console.log("empty record, empty list, nothing can be done");
      return;
    }
    student = d[i].name.givenName + d[i].name.surname;
    end_time = d[i].submission.time;
    for (let j = 1; j < d.length; j++) {
      var testtime = d[j].submission.time.getTime();
      if (student == d[j].name.givenName + d[j].name.surname){
        if (!end_time){
          console.log("submission value -, time 0, removing record");
          d = d.splice(j,1);
        }
        else if (end_time.getTime() > d[j].submission.time.getTime()) {
          //var testtime = d[j].submission.time.getTime();
          console.log(testtime);
          d = d.splice(j,1);
          console.log("The record in row "+ (j+2) +" has been removed because it contained a later submited dublicate in row " + (i+2) + ".")
          counter++;
        } else if (end_time.getTime() < d[j].submission.time.getTime()) {
          d = d.splice(i,1);
          console.log("The record in row "+ (i+2) +" has been removed because it contained a later submited dublicate in row " + (j+2)+ ".")
          counter++;
        } 
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

function findCapitalLetterWords(textbody){
  // TODO: remove first line and include numbers in variables.
  const upperCaseWords = textbody.match(/(\b[A-Z][A-Z]+|\b[A-Z]\b)/g);
  if (upperCaseWords)
    console.log("uppercase");
  else
    console.log("no uppercase");
  console.log(upperCaseWords);
  var commands = requiredStuff(upperCaseWords);
  var variables = requiredStuff(upperCaseWords,false);
  //commands = requiredCommandsStructs(upperCaseWords);
  //var variables = requiredVariableNames(upperCaseWords);
  console.log(commands);
  console.log(variables);
}

function requiredStuff(textbodycapital, commandsRun=true) {
  var commands = ["IF", "ELSE", "WHILE", "FOR",  "DO", "FUNCTION"];
  var requiredwords=[];
  if (!textbodycapital) {
    return [];
  }
  for (var item of textbodycapital){
    var gotStuff = commands.includes(item);
    if (gotStuff == commandsRun){
      console.log("not command, so variable name, adding to list");
      if (item.length>1)
        requiredwords.push(item);
    }
  }
  return requiredwords;
}

// Part 1 (preparations,for teachers manual udpating regarding tasks) this is run once

function getFolderNames(folderPath, Part1) {
  const folderList = [];
  const directoryPath = path.join(__dirname, folderPath);
  fs.readdir(directoryPath, function (err, files) {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    //saving all files names in a list using forEach
    files.forEach(function (file) {
        folderList.push(file);
    });
    Part1(folderList);
});
};

function Part1(folderList) {
  ALLSTRUCTURES = [];
  ALLFOLDERS = folderList;
  for (x=0; x<ALLFOLDERS.length; x++) {
    ALLSTRUCTURES[x] = {checkThese: { variables: [{name:"", count: 0} ], commands: [{name:"", count: 0} ], codeLength: 5 }, name : {givenName: "NOT NEEDED", surname: "NOT NEEDED"}, submission: ALLFOLDERS[x] 
  }
  }
  var dictstring = JSON.stringify(ALLSTRUCTURES);
  ALLOBJECTS = {};
  //ALLFOLDERS = getFolderNames(file);
  for (x=0; x<ALLFOLDERS.length; x++) {
    var dictstring = JSON.stringify(ALLSTRUCTURES, null, 1);
    //var dictstring = JSON.stringify(ALLSTRUCTURES[x], null, 1);
    fs.writeFile(" taskChecking.json", dictstring, (err) => { 
      if (err) { 
        console.log(err); 
      } 
    });
  }  
}



if (require.main === module) {
  findCapitalLetterWords("HERE'S AN UPPERCASE PART of the string");
  findCapitalLetterWords("tässä vain lovercase lettereitä eikä muuta");
  findCapitalLetterWords("IF ELSE IF WHILE FOR DO WHILE FUNCTION");
  findCapitalLetterWords("tehtävässä funktion nimeksi TESTAA ja TESTAALISAA. käytä seuraavia rakenteita: FUNCTION, IF, WHILE. muuten teet niinkuin kykenet");
  testGetTaskCheckParameters("T");
  getFolderNames("Mock", Part1)
}




module.exports = {
    goo: "googoo",
    //getQuizSubmissions: testGetQuizSubmissions
    finnishMonthConverter: finnish_month_converter,
    date_check: convert_timestamp,
    row_data_extraction: rowhandling,
    getQuizSubmissions: get_all_Students, 
    GetTaskCheckParameters: testGetTaskCheckParameters
};


//Part1("Mock");
//get_all_Students(csvpath);
//get_all_Students(csvpath, callbackAsParameter); //Calling the main functio of file
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
 * TODO: duplicate removal fix. add submission date in list. order by submission date. 
 * loop from start. for every record find out if there is later records for same student. 
 * If there is, delete record. 
 */