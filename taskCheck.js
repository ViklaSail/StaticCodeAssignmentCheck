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

const testVariables = require('./testVariables');
var testing = require('./testVariables');

function checkRequiredReserwedWords(code){
  var warningList = checkWords(code,testing.requiredVariableNames);
  return testing.reservedReport; // BE WARE this need to be a list
  //returns "alert: 3 should be 1";
}


  function checkRequiredVariableNames(code){
    var warningList = checkWords(code, requiredVariableNames);
    return testing.variableReport; // BE WARE this need to be a list
    //return "nimi: 0 should be 1";
    //return resulttable;
  }
  
  function checkWords(code, wordlist) {
    var warninglist = [];
    for (const prop in wordlist) {
       value = wordlist[prop];
       code_count = occurrences(code, prop, 1);
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
  /**
   * Prepares report. pdf is at all possible and saves it to root folder.
   * levels of errors to print need to be thought of, user defined. 
   * For example if 0 errors and missing keywords, we do not print line at all. That should be default. 
   * missing commands, should we print student raport part?
   * missing required variables described in task, should we print student raport part?
   * https://www.javascripttutorial.net/javascript-multidimensional-array/
   * https://www.npmjs.com/package/html-pdf
   * @param {*} multiLevelTableForReport 
   */
  function prepareReport(multiLevelTableForReport){
    console.table(multiLevelTableForReport);
    
  }

// do not change this
  module.exports = {
    checkRequiredReserwedWords: checkRequiredReserwedWords,
    checkRequiredVariableNames: checkRequiredVariableNames,
    prepareReport: prepareReport
  };

