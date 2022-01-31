/**
 * Need to check following
 * max lines of code
 * keywords needed according to task description
 *  - required variable and function names
 *  - required reserved words, like while, for, if, and counts of those words
 *  - if required word is not found, then error should be recorded on it. 
 *  */
  // https://stackoverflow.com/questions/4009756/how-to-count-string-occurrence-in-string
  // 
var codeTesting = "var nimi = \"jaakko\";\r\nvar ika = \"20\";\r\nvar ammatti =\"huoltomies\"\r\n\r\nalert(nimi);\r\nalert(ika);\r\nalert(ammatti);\r\n\r\n\r\n\r\n";

var testing = require('./testVariables');

function checkRequiredReserwedWords(code){
  var warningList = checkWords(code,testing.requiredReservedWordsNew);
  return warningList; // BE WARE this need to be a list
  //returns "alert: 3 should be 1";
}


function checkRequiredVariableNames(code){
  var warningList = checkWords(code, testing.requiredVariableNamesNew);
  return warningList; // BE WARE this need to be a list
  //return "nimi: 0 should be 1";
  //return resulttable;
}

function checkWords(code, wordlist) {
  var variableReport = [];
  for(var i=0;i<wordlist.length;i++){
    var theWord=wordlist[i].name;
    var theRightCount = wordlist[i].count;
    var re = new RegExp(theWord, 'g');
    var keycount = (code.match(re) || []).length;
    console.log(wordlist[i]);
    if(theRightCount!=keycount){
      variableReport.push(theWord + ": " + keycount + " should be " + theRightCount);
    }
  }
  return variableReport;
}
/*  function checkWords(code, wordlist) {
    var warninglist = [];
    for (var prop in wordlist) {
       var value = wordlist[prop];
       varcode_count = occurrences(code, prop, 1);
       if (value != code_count) {
         warninglist.push(prop + ": " + code_count + " should be " + value)
       }

    }
    return warninglist; // list
  }

  function occurrences(string, subString, allowOverlapping) {

    string += "";
    subString += "";
    if (subString.length <= 0) return (string.length + 1);

    var n = 0,
        pos = 0,
        step = allowOverlapping ? 1 : subString.length;

    while (true) {
        pos = string.indexOf(subString, pos);
        if (pos >= 0) {
            ++n;
            pos += step;
        } else break;
    }
    return n;
  }
  */
  /**
   * Prepares report. pdf is at all possible and saves it to root folder.
   * levels of errors to print need to be thought of, user defined. 
   * For example if 0 errors and missing keywords, we do not print line at all. That should be default. 
   * missing commands, should we print student raport part?
   * missing required variables described in task, should we print student raport part?
   * https://www.javascripttutorial.net/javascript-multidimensional-array/
   * https://www.npmjs.com/package/html-pdf
   * https://jsreport.net/learn/pdf-reports-in-nodejs
   * https://stackoverflow.com/questions/17450412/how-to-create-an-excel-file-with-nodejs
   * 
   * 
   * @param {*} multiLevelTableForReport 
   */
  function prepareReport(multiLevelTableForReport){
    //console.table(multiLevelTableForReport);
    console.table(["Audi", "Volvo", "Ford"]);
    for (var file = 0; file < multiLevelTableForReport.length;file++){
    // Print filename
      var header = {"file": multiLevelTableForReport[file][0], "errors" : multiLevelTableForReport[file][1]};
      //var headline = [multiLevelTableForReport[i][0],multiLevelTableForReport[i][1]];
      console.table(header, ["file","count"]);
      // errors line "no-errors" or n errors, list follows:
      // All required words present / Required reserved words missing, list follows
      // All required names present / required names missing, list follows:
    }
    
  }

  if (require.main === module) {
    var test2 = testing.requiredReservedWords;
    var testi = testing.goo;
    var code1 = testing.codeTesting;
    var variables2 = testing.requiredReservedWords;
    console.log("luetaan tiedosto async" + variables2 + code1);
    checkWords(testing.codeTesting, testing.requiredVariableNamesNew);
  
  }

// do not change this
  module.exports = {
    checkRequiredReserwedWords: checkRequiredReserwedWords,
    checkRequiredVariableNames: checkRequiredVariableNames,
    prepareReport: prepareReport
  };

