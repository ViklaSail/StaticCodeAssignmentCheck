

var fs = require('fs');

function readLines(input, func) {
  var remaining = '';

  //input.pipe(csv())
  input.on('data', function(data) {
    remaining += data;
    var index = remaining.indexOf('\n');
    while (index > -1) {
      var line = remaining.substring(0, index);
      remaining = remaining.substring(index + 1);
      func(line);
      index = remaining.indexOf('\n');
    }
  });

  input.on('end', function() {
    if (remaining.length > 0) {
      func(remaining);
    }
  });
}

function func(data) {
  console.log('Line: ' + data);
}

var input = fs.createReadStream('./TESTIMATERIAALIA/nimikonversio.csv');
readLines(input, func);



/*const fs = require('fs');
const csv = require('csv-parser');
const csvpath = ".\TESTIMATERIAALIA\nimikonversio.csv";
//## function anonymizeQuizDataTest
function readfakenames(funcNames){
    fs.createReadStream(csvpath)
    .on('error', () => {
        // handle error
    })
    .pipe(csv())
    .on('data', (row)  => {
        var givenName = row["Etunimi"];
        var surName = row["Sukunimi"];
        var fakeGiven = row["fakeetu"];
        var fakeSur = row["fakesuku"]; 
        var test = {};
        test.given = givenname;
        test.sur = surName;
        test.fakegiven = fakeGiven;
        test.fakeSur = fakeSur; 
        funcNames(test);
    })
    .on('end', () => {
        // handle end of CSV
  });

}

readfakenames( (tiedosto) => {
   console.log(tiedosto);
});
*/