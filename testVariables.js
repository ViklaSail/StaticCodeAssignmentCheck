// Viikko 2 Koodaustehtävä (6.2. klo 12:00 mennessä)
function testGetQuizSubmissions(timeoutCallback){
  var fakeCheckStructureList = [];
  fakeCheckStructureList.push(taskOfStudent);
  fakeCheckStructureList.push(taskOfStudent2);
  fakeCheckStructureList.push(taskOfStudent3);
  setTimeout(timeoutCallback, 5500, fakeCheckStructureList);
}

taskObjectRegressionTest = {
  codeLength:4,
  filelist: [],
//  quizFilename:"T42T177OJ-3001-Peräkkäisyys-periaate ja muuttujat (keskiviikkoiltaan mennessä)-TESTI.csv",
  quizFilename: "T42T177OJ-3001-Peräkkäisyys-periaate ja muuttujat (keskiviikkoiltaan mennessä)-vastaukset.csv",
  reportingLevel:1,
  scenario:1,
  studentSubmissionAnalysis: [],
  submissionWaitList: [],
  taskFolder:"T42T177OJ-3001-JavaScript perusteet OSA 10 - IF lause 2606-665951",
  filecountForCallback: 0,
  allQuizzCount: 0
  };

  //T42T177OJ-3001-Peräkkäisyys-periaate ja muuttujat (keskiviikkoiltaan mennessä)-vastaukset.csv

commonCheckStruct = {checkThese: { 
  variables: [{name:"", count: 0} ],
  commands:  [{name:"function", count: 1}, {name:"while", count:1}, {name:"if",count:1} ],
  codeLength: 5
  },
  name : {givenName: "testinimi", surname: "sukunimi"}, //for testing purposes
  submission: "javascript code for inspection"
};

/**TESTING */
taskOfStudent= {
checkThese: { 
  variables: [{name:"luvunArvaus", count: 1}, {name:"vertaa",count:1} ],
  commands:  [{name:"function", count: 1}, {name:"while", count:1}, {name:"if",count:1} ]
  //linecount: 20
  },
  name : {givenName: "testinimi", surname: "sukunimi"}, //for testing purposes
  submission: "javascript code for inspection"
};

taskOfStudent2= {
  checkThese: { 
    variables: [{name:"arvaaLuku", count: 1}, {name:"verrokki",count:1} ],
    commands:  [{name:"function", count: 1}, {name:"while", count:1}, {name:"if",count:1} ]
    //linecount: 20
    },
    name : {givenName: "testinimi2", surname: "sukunimi2"}, //for testing purposes
    submission: "javascript code for inspection2222"
  };

taskOfStudent3= {
  checkThese: { 
    variables: [{name:"lukuLotto", count: 1}, {name:"pallo",count:1} ],
    commands:  [{name:"function", count: 1}, {name:"while", count:1}, {name:"if",count:1} ]
    //linecount: 20
    },
    name : {givenName: "testinimi3", surname: "sukunimi3"}, //for testing purposes
    submission: "javascript code for inspection33333333"
  };

examVk2codingVariables = {
Question1: { 
              variables: [{name:"luvunArvaus", count: 1}, {name:"vertaa",count:1} ],
              commands:  [{name:"function", count: 1}, {name:"while", count:1}, {name:"if",count:1} ]
              //linecount: 20
            },
Question2: {
            variables: [{name:"luvunArvaus", count: 1}, {name:"vertaa",count:1} ],
            commands:  [{name:"function", count: 1}, {name:"while", count:1}, {name:"if",count:1}]
          },
Question3: {
          variables: [{name:"luvunArvaus", count: 1}, {name:"vertaa",count:1} ],
          commands:  [{name:"function", count: 1}, {name:"while", count:1}, {name:"if",count:1}]  
  }
};
//requiredVariableNamesNew = [];
///requiredReservedWordsNew = [{name:"alert", count: 1}, {name:"for", count:1}, {name:"if",count:1}];

codeTesting = "var nimi = \"jaakko\";\r\nvar ika = \"20\";\r\nvar ammatti =\"huoltomies\"\r\n\r\nalert(nimi);\r\nalert(ika);\r\nalert(ammatti);\r\n\r\n\r\n\r\n";

//requiredVariableNames = [{nimi: 1}, {ikä:1} ];
//requiredReservedWords = [{alert: 1}, {for:1}, {if:1}];
requiredVariableNamesNew = [{name:"nimi", count: 1}, {name:"ikä",count:1} ];
requiredReservedWordsNew = [{name:"alert", count: 1}, {name:"for", count:1}, {name:"if",count:1}];

// EXAMPLES OF RETURNED LISTS FROM 
//function checkRequiredReserwedWords(code){
reservedReport = ["nimi: 0 should be 1", "ikä: 0 should be 1","ohje: 0 should be 1","sääntö: 0 should be 1"];
//function checkRequiredVariableNames(code){
variableReport = ["alert: 0 should be 1", "for: 0 should be 1","if: 0 should be 1","var: 0 should be 1"];

taskCheckStructs = [
  {
      "taskFolder": "T42T177OJ-3001-JavaScript perusteet OSA 10 - IF lause 2606-665951",
      "taskCheck": taskOfStudent3
  },
  {
      "taskFolder": "T42T177OJ-3001-JavaScript perusteet OSA 11 - Toistorakenteet-666410",
      "taskCheck": taskOfStudent2
  },
  {
      "taskFolder": "T42T177OJ-3001-JavaScript perusteet OSA 13 - Tietotyypit, const, var, let-667936",
      "taskcheck": taskOfStudent
  }]


/*
  module.exports = requiredVariableNames;
  module.exports = requiredReservedWords;
  module.exports = codeTesting;
  module.exports = reservedReport;
  module.exports = variableReport;
  module.exports = forReportTest3;
*/
module.exports = {
    goo: "googoo",
    codeTesting: codeTesting,
    //requiredVariableNames: requiredVariableNames,
    //requiredReservedWords: requiredReservedWords,
    reservedReport: reservedReport,
    variableReport: variableReport,
    requiredVariableNamesNew:requiredVariableNamesNew,
    requiredReservedWordsNew:requiredReservedWordsNew,
    examVk2codingVariables: examVk2codingVariables,
    taskOfStudent: taskOfStudent,
    getQuizSubmissions: testGetQuizSubmissions,
    taskOfStudent2: taskOfStudent2,
    taskOfStudent3: taskOfStudent3,
    commonCheckStruct: commonCheckStruct,
    taskCheckStructs: taskCheckStructs,
    taskObjectRegressionTest: taskObjectRegressionTest
};
