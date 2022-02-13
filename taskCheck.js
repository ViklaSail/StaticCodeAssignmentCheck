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
/**
 * gets task details from a configuration file, or extracts them from task description. 
 * For that task description need to have a formatted section for easy parsing
 * Called from codeCheck once. 
 * Suggestions: 
 * 1. required commands and names (function + variables) with minimum counts needed. 
 * 2. Needed minimum row count of a file (possibly exclude empty lines!!! )
 */
function getTaskDetailsForChecking() {
  //var toBeChecked =testing.requiredReservedWordsNew;
  var toBeChecked = testing.examVk2codingVariables;
  return toBeChecked;
}


function checkRequiredReserwedWords(code, stringsToCheck){
  
  //var warningList = checkWords(code, testing.requiredReservedWordsNew);
  var warningList = checkWords(code, stringsToCheck.commands);
  warningList.type="ResevedWords";
  return warningList; // BE WARE this need to be a list
  //returns "alert: 3 should be 1";
}


function checkRequiredVariableNames(code, stringsToCheck){
  //var warningList = checkWords(code, testing.requiredVariableNamesNew);
  var warningList = checkWords(code, stringsToCheck.variables);
  warningList.type="RequiredNames";
  return warningList; // BE WARE this need to be a list
  //return "nimi: 0 should be 1";
  //return resulttable;
}

function checkWords(code, wordlist) {
  var variableReportObject = {"misscount":0, "missDetails": " "};
  for(var i=0;i<wordlist.length;i++){
    var theWord=wordlist[i].name;
    var theRightCount = wordlist[i].count;
    var re = new RegExp(theWord, 'g');
    var keycount = (code.match(re) || []).length;
    //console.log(wordlist[i]);
    if(theRightCount!=keycount){
      variableReportObject.misscount++;
      variableReportObject.missDetails = variableReportObject.missDetails.concat(theWord, ": ", (keycount - theRightCount)+", ");
    }
  }
  return variableReportObject;
}

  
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
   * RAPORTIN MUOTO
   * nimi, virheet lkm, puuttuvat komennot lkm, puuttuvat nimet lkm, virheet txt, puuttuvat komennot txt, puuttuvat nimet txt
   * 
   * 
   * @param {*} multiLevelTableForReport 
   */
  function prepareReport(multiLevelTableForReport){
    //console.table(multiLevelTableForReport);
    var defectiveAssignment= [];
    var cleanAssignmentes = [];
    defectiveAssignment.push("nimi, virheet lkm, puuttuvat komennot lkm, puuttuvat nimet lkm, virheet txt, puuttuvat komennot txt, puuttuvat nimet txt");
    for (var file = 0; file < multiLevelTableForReport.length;file++){
      if (reportLevel==0 && multiLevelTableForReport[file].errors.errcount>0)
        var rep = multiLevelTableForReport[file];
        console.log("on erroreita");
        //defectiveAssignment.push(rep.);
      // errors line "no-errors" or n errors, list follows:
      // All required words present / Required reserved words missing, list follows
      // All required names present / required names missing, list follows:
      // building CSV files
      // filename, syntaxerrors, missing reserved words, missing variablenames. 
      //if (multiLevelTableForReport.)
      var assignmentLine = file[0]+", " + file[1];
      if (file[1]>0)
        assignmentLine = assignmentLine + file[1];
    }
    
  }

var reportLevel = 0;

/**
 * Global settings of report reportLevel 0...2
 * 0 = only files with errors will be reported
 * 1 = All above and required reserved words (javascript commands) missing will be reported
 * 2 = All above and also missing required variable/function names missing
 * 3 = Files fulfilling all requirements are printed. 
 * errorlevel[0,1,2,3]
 * errorlevel[true,true,true,true]
 *  */ 

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
    prepareReport: prepareReport,
    getTaskDetailsForChecking: getTaskDetailsForChecking
  };

