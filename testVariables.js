// Viikko 2 Koodaustehtävä (6.2. klo 12:00 mennessä)
function testGetQuizSubmissions(timeoutCallback){
  var fakeCheckStructureList = [];
  fakeCheckStructureList.push(taskOfStudent);
  fakeCheckStructureList.push(taskOfStudent2);
  fakeCheckStructureList.push(taskOfStudent3);
  setTimeout(timeoutCallback, 13500, fakeCheckStructureList);
}







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


forReportTest3 = [
    [
      "Aku Kontiainen_1724149_assignsubmission_file_script.js",
      1,
      {
        id: "(error)",
        raw: "Missing semicolon.",
        code: "W033",
        evidence: "var ammatti =\"huoltomies\"",
        line: 3,
        character: 26,
        scope: "(main)",
        a: undefined,
        b: undefined,
        c: undefined,
        d: undefined,
        reason: "Missing semicolon.",
      },
      [
        "nimi: 0 should be 1",
        "ikä: 0 should be 1",
        "ohje: 0 should be 1",
        "sääntö: 0 should be 1",
      ],
      [
        "alert: 0 should be 1",
        "for: 0 should be 1",
        "if: 0 should be 1",
        "var: 0 should be 1",
      ],
    ],
    [
      "Alina Kokko_1724154_assignsubmission_file_script.js",
      0,
      {
        id: "(error)",
        raw: "Missing semicolon.",
        code: "W033",
        evidence: "var ammatti =\"huoltomies\"",
        line: 3,
        character: 26,
        scope: "(main)",
        a: undefined,
        b: undefined,
        c: undefined,
        d: undefined,
        reason: "Missing semicolon.",
      },
      [
        "nimi: 0 should be 1",
        "ikä: 0 should be 1",
        "ohje: 0 should be 1",
        "sääntö: 0 should be 1",
      ],
      [
        "alert: 0 should be 1",
        "for: 0 should be 1",
        "if: 0 should be 1",
        "var: 0 should be 1",
      ],
    ],
    [
      "Anja Harju_1724148_assignsubmission_file_script.js",
      0,
      {
        id: "(error)",
        raw: "Missing semicolon.",
        code: "W033",
        evidence: "var ammatti =\"huoltomies\"",
        line: 3,
        character: 26,
        scope: "(main)",
        a: undefined,
        b: undefined,
        c: undefined,
        d: undefined,
        reason: "Missing semicolon.",
      },
      [
        "nimi: 0 should be 1",
        "ikä: 0 should be 1",
        "ohje: 0 should be 1",
        "sääntö: 0 should be 1",
      ],
      [
        "alert: 0 should be 1",
        "for: 0 should be 1",
        "if: 0 should be 1",
        "var: 0 should be 1",
      ],
    ],
  ];

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
    forReportTest3: forReportTest3,
    requiredVariableNamesNew:requiredVariableNamesNew,
    requiredReservedWordsNew:requiredReservedWordsNew,
    examVk2codingVariables: examVk2codingVariables,
    taskOfStudent: taskOfStudent,
    getQuizSubmissions: testGetQuizSubmissions
};

bigtestforReport = [
    [
      "Aku Kontiainen_1724149_assignsubmission_file_script.js",
      1,
      {
        id: "(error)",
        raw: "Missing semicolon.",
        code: "W033",
        evidence: "var ammatti =\"huoltomies\"",
        line: 3,
        character: 26,
        scope: "(main)",
        a: undefined,
        b: undefined,
        c: undefined,
        d: undefined,
        reason: "Missing semicolon.",
      },
      [
        "nimi: 0 should be 1",
        "ikä: 0 should be 1",
        "ohje: 0 should be 1",
        "sääntö: 0 should be 1",
      ],
      [
        "alert: 0 should be 1",
        "for: 0 should be 1",
        "if: 0 should be 1",
        "var: 0 should be 1",
      ],
    ],
    [
      "Alina Kokko_1724154_assignsubmission_file_script.js",
      0,
      {
        id: "(error)",
        raw: "Missing semicolon.",
        code: "W033",
        evidence: "var ammatti =\"huoltomies\"",
        line: 3,
        character: 26,
        scope: "(main)",
        a: undefined,
        b: undefined,
        c: undefined,
        d: undefined,
        reason: "Missing semicolon.",
      },
      [
        "nimi: 0 should be 1",
        "ikä: 0 should be 1",
        "ohje: 0 should be 1",
        "sääntö: 0 should be 1",
      ],
      [
        "alert: 0 should be 1",
        "for: 0 should be 1",
        "if: 0 should be 1",
        "var: 0 should be 1",
      ],
    ],
    [
      "Anja Harju_1724148_assignsubmission_file_script.js",
      0,
      {
        id: "(error)",
        raw: "Missing semicolon.",
        code: "W033",
        evidence: "var ammatti =\"huoltomies\"",
        line: 3,
        character: 26,
        scope: "(main)",
        a: undefined,
        b: undefined,
        c: undefined,
        d: undefined,
        reason: "Missing semicolon.",
      },
      [
        "nimi: 0 should be 1",
        "ikä: 0 should be 1",
        "ohje: 0 should be 1",
        "sääntö: 0 should be 1",
      ],
      [
        "alert: 0 should be 1",
        "for: 0 should be 1",
        "if: 0 should be 1",
        "var: 0 should be 1",
      ],
    ],
    [
      "Babak Rasoolnia_1724145_assignsubmission_file_scrip.js",
      0,
      {
        id: "(error)",
        raw: "Missing semicolon.",
        code: "W033",
        evidence: "var ammatti =\"huoltomies\"",
        line: 3,
        character: 26,
        scope: "(main)",
        a: undefined,
        b: undefined,
        c: undefined,
        d: undefined,
        reason: "Missing semicolon.",
      },
      [
        "nimi: 0 should be 1",
        "ikä: 0 should be 1",
        "ohje: 0 should be 1",
        "sääntö: 0 should be 1",
      ],
      [
        "alert: 0 should be 1",
        "for: 0 should be 1",
        "if: 0 should be 1",
        "var: 0 should be 1",
      ],
    ],
    [
      "Henri Ahvenniemi_1724150_assignsubmission_file_Untitled-1.js",
      0,
      {
        id: "(error)",
        raw: "Missing semicolon.",
        code: "W033",
        evidence: "var ammatti =\"huoltomies\"",
        line: 3,
        character: 26,
        scope: "(main)",
        a: undefined,
        b: undefined,
        c: undefined,
        d: undefined,
        reason: "Missing semicolon.",
      },
      [
        "nimi: 0 should be 1",
        "ikä: 0 should be 1",
        "ohje: 0 should be 1",
        "sääntö: 0 should be 1",
      ],
      [
        "alert: 0 should be 1",
        "for: 0 should be 1",
        "if: 0 should be 1",
        "var: 0 should be 1",
      ],
    ],
    [
      "Ismo Manninen_1724136_assignsubmission_file_script.js",
      0,
      {
        id: "(error)",
        raw: "Missing semicolon.",
        code: "W033",
        evidence: "var ammatti =\"huoltomies\"",
        line: 3,
        character: 26,
        scope: "(main)",
        a: undefined,
        b: undefined,
        c: undefined,
        d: undefined,
        reason: "Missing semicolon.",
      },
      [
        "nimi: 0 should be 1",
        "ikä: 0 should be 1",
        "ohje: 0 should be 1",
        "sääntö: 0 should be 1",
      ],
      [
        "alert: 0 should be 1",
        "for: 0 should be 1",
        "if: 0 should be 1",
        "var: 0 should be 1",
      ],
    ],
    [
      "Joni Tiainen_1724133_assignsubmission_file_script.js",
      3,
      {
        id: "(error)",
        raw: "'{a}' is available in ES{b} (use 'esversion: {b}') or Mozilla JS extensions (use moz).",
        code: "W104",
        evidence: "const x = \"Moi\";",
        line: 1,
        character: 1,
        scope: "(main)",
        a: "const",
        b: "6",
        c: undefined,
        d: undefined,
        reason: "'const' is available in ES6 (use 'esversion: 6') or Mozilla JS extensions (use moz).",
      },
      [
        "nimi: 0 should be 1",
        "ikä: 0 should be 1",
        "ohje: 0 should be 1",
        "sääntö: 0 should be 1",
      ],
      [
        "alert: 0 should be 1",
        "for: 0 should be 1",
        "if: 0 should be 1",
        "var: 0 should be 1",
      ],
    ],
    [
      "Niilo Lehner_1724125_assignsubmission_file_Niilo Lehner-Ohjelmoinnin perusteet-JavaScript_perusteet_OSA_3-challenge.js",
      0,
      {
        id: "(error)",
        raw: "'{a}' is available in ES{b} (use 'esversion: {b}') or Mozilla JS extensions (use moz).",
        code: "W104",
        evidence: "const x = \"Moi\";",
        line: 1,
        character: 1,
        scope: "(main)",
        a: "const",
        b: "6",
        c: undefined,
        d: undefined,
        reason: "'const' is available in ES6 (use 'esversion: 6') or Mozilla JS extensions (use moz).",
      },
      [
        "nimi: 0 should be 1",
        "ikä: 0 should be 1",
        "ohje: 0 should be 1",
        "sääntö: 0 should be 1",
      ],
      [
        "alert: 0 should be 1",
        "for: 0 should be 1",
        "if: 0 should be 1",
        "var: 0 should be 1",
      ],
    ],
    [
      "Oskari Lehtonen_1724130_assignsubmission_file_script.js",
      0,
      {
        id: "(error)",
        raw: "'{a}' is available in ES{b} (use 'esversion: {b}') or Mozilla JS extensions (use moz).",
        code: "W104",
        evidence: "const x = \"Moi\";",
        line: 1,
        character: 1,
        scope: "(main)",
        a: "const",
        b: "6",
        c: undefined,
        d: undefined,
        reason: "'const' is available in ES6 (use 'esversion: 6') or Mozilla JS extensions (use moz).",
      },
      [
        "nimi: 0 should be 1",
        "ikä: 0 should be 1",
        "ohje: 0 should be 1",
        "sääntö: 0 should be 1",
      ],
      [
        "alert: 0 should be 1",
        "for: 0 should be 1",
        "if: 0 should be 1",
        "var: 0 should be 1",
      ],
    ],
    [
      "Teemu Markkanen_1724142_assignsubmission_file_script.js",
      0,
      {
        id: "(error)",
        raw: "'{a}' is available in ES{b} (use 'esversion: {b}') or Mozilla JS extensions (use moz).",
        code: "W104",
        evidence: "const x = \"Moi\";",
        line: 1,
        character: 1,
        scope: "(main)",
        a: "const",
        b: "6",
        c: undefined,
        d: undefined,
        reason: "'const' is available in ES6 (use 'esversion: 6') or Mozilla JS extensions (use moz).",
      },
      [
        "nimi: 0 should be 1",
        "ikä: 0 should be 1",
        "ohje: 0 should be 1",
        "sääntö: 0 should be 1",
      ],
      [
        "alert: 0 should be 1",
        "for: 0 should be 1",
        "if: 0 should be 1",
        "var: 0 should be 1",
      ],
    ],
    [
      "Terhi Paavola_1724139_assignsubmission_file_script.js",
      0,
      {
        id: "(error)",
        raw: "'{a}' is available in ES{b} (use 'esversion: {b}') or Mozilla JS extensions (use moz).",
        code: "W104",
        evidence: "const x = \"Moi\";",
        line: 1,
        character: 1,
        scope: "(main)",
        a: "const",
        b: "6",
        c: undefined,
        d: undefined,
        reason: "'const' is available in ES6 (use 'esversion: 6') or Mozilla JS extensions (use moz).",
      },
      [
        "nimi: 0 should be 1",
        "ikä: 0 should be 1",
        "ohje: 0 should be 1",
        "sääntö: 0 should be 1",
      ],
      [
        "alert: 0 should be 1",
        "for: 0 should be 1",
        "if: 0 should be 1",
        "var: 0 should be 1",
      ],
    ],
    [
      "Ulrika Rehnström_1724132_assignsubmission_file_script.js",
      1,
      {
        id: "(error)",
        raw: "Missing semicolon.",
        code: "W033",
        evidence: "var sukunimi = \"Rehnstrom\"",
        line: 2,
        character: 27,
        scope: "(main)",
        a: undefined,
        b: undefined,
        c: undefined,
        d: undefined,
        reason: "Missing semicolon.",
      },
      [
        "nimi: 0 should be 1",
        "ikä: 0 should be 1",
        "ohje: 0 should be 1",
        "sääntö: 0 should be 1",
      ],
      [
        "alert: 0 should be 1",
        "for: 0 should be 1",
        "if: 0 should be 1",
        "var: 0 should be 1",
      ],
    ],
    [
      "Ville Kae_1724147_assignsubmission_file_script.js",
      0,
      {
        id: "(error)",
        raw: "Missing semicolon.",
        code: "W033",
        evidence: "var sukunimi = \"Rehnstrom\"",
        line: 2,
        character: 27,
        scope: "(main)",
        a: undefined,
        b: undefined,
        c: undefined,
        d: undefined,
        reason: "Missing semicolon.",
      },
      [
        "nimi: 0 should be 1",
        "ikä: 0 should be 1",
        "ohje: 0 should be 1",
        "sääntö: 0 should be 1",
      ],
      [
        "alert: 0 should be 1",
        "for: 0 should be 1",
        "if: 0 should be 1",
        "var: 0 should be 1",
      ],
    ],
  ];