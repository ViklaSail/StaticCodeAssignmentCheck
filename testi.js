//https://sebhastian.com/javascript-console-input/#:~:text=Getting%20user%20input%20from%20the%20NodeJS%20console%20To,instance%20that%20is%20connected%20to%20an%20input%20stream.

const readline = require("readline");
//npm install readline. Toimii jos on käynnistänyt komentoriviltä node ...
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question("What is your name? ", function (answer) {
    console.log(`Oh, so your name is ${answer}`);
  });

 
  