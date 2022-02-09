/**
 * Quiz/exam related functions and system level mocking functions. 
 * 
 */

var fake = require('./testVariables');

function testGetQuizSubmissions(timeoutCallback){//test function simulating long lasting async
    var fakeCheckStructureList = [];
    fakeCheckStructureList.push(fake.taskOfStudent);
    fakeCheckStructureList.push(fake.taskOfStudent2);
    fakeCheckStructureList.push(fake.taskOfStudent3);
    setTimeout(timeoutCallback, 5500, fakeCheckStructureList);
  }

module.exports = {
    goo: "googoo",
    getQuizSubmissions: testGetQuizSubmissions
};

/**
 * Specifications and settings for different task descriptions in the quiz. 
 * Different options for required and counted things: 
 * 
 * 1. All required reserved words/structures and variables are written in ALL CAPITALS. 
 * In task submission those can be in lower case. Reserved words are detected automatically, 
 * Rest of the detected words are function- names and variable names
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
 */