/**
 * Need to check following
 * max lines of code
 * keywords needed according to task description
 *  - required variable and function names
 *  - required reserved words, like while, for, if, and counts of those words
 *  - if required word is not found, then error should be recorded on it. 
 *  */
var codeTesting = "var nimi = \"jaakko\";\r\nvar ika = \"20\";\r\nvar ammatti =\"huoltomies\"\r\n\r\nalert(nimi);\r\nalert(ika);\r\nalert(ammatti);\r\n\r\n\r\n\r\n";

var requiredVariableNames = [
    {alert: 1, for:1, if:1}
  ];
var requiredReservedWords = [
    {nimi: 1, ikä:1}
  ];
  // https://stackoverflow.com/questions/4009756/how-to-count-string-occurrence-in-string
  // 
  function checkRequiredReserwedWords(code){
    var warningList = checkWords(requiredVariableNames);
    return warningList;
    //return "alert: 3 should be 1";
  }
  
  function checkRequiredVariableNames(code){
    var warningList = checkWords(requiredVariableNames);
    return warningList;
    //return "nimi: 0 should be 1";
    //return resulttable;
  }
  
  function checkWords(wordlist) {
    var warninglist = [];
    for (let i = 0; i < wordlist.length; i++) {
        // code here Andreas
        // if word count in file is different compared to what required, write warning in warning list

    }
    return warninglist
  }
// do not change this
  module.exports = {
    checkRequiredReserwedWords: checkRequiredReserwedWords,
    checkRequiredVariableNames: checkRequiredVariableNames
  };

