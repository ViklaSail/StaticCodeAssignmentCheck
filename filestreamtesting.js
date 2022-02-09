const fs = require('fs');
const csv = require('csv-parser');
const path = "./T42T177OJ-3001-Peräkkäisyys-periaate ja muuttujat (keskiviikkoiltaan mennessä)-TESTI.csv";

function readSingleFile(path, callback) {
    if (!isString(path)) {
     return callback();
    }
    var stream = fs.createReadStream(convertSlash(path));
    var done, buf;
    var execCallback = function(err) {
     if (done) {
      return;
     }
     done = true;
     stream.close();
     callback(err ? null : buf);
    };
    stream.on('data', function(data) {
     if (done) {
      return;
     }
     buf = buf ? Buffer.concat([buf, data]) : data;
     if (buf.length > MAX_SIZE) {
      execCallback();
     }
    });
    stream.on('error', execCallback);
    stream.on('end', execCallback);
   }

   var final_test = readSingleFile("Etunimi1", "Sukunimi1"); 

   //https://www.tabnine.com/code/javascript/functions/ts3.1%2Ffs/createReadStream