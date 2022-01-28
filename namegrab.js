//jshint esversion:8
//jshint node:true
const fs = require( 'fs' );
const path = require( 'path' );
let writer = fs.createWriteStream('array.txt');
const pathName = writer.path;
const student_folder = "\palautetut";

// Make an async function that gets executed immediately
(async ()=>{
    // Our starting point
    try {
        // Get the files as an array
        const files = await fs.promises.readdir( student_folder );
        console.log(files);
        student_number = files.length;
        for (let i = 0; i < student_number; i++) {
            data = files[i] ;
            student = data.slice(0, -3);
            first_letter_student = data.charAt(0);
            Capitalize_first_letter = first_letter_student.toUpperCase();
            rest_of_name = student.substring(1);
            writer.write(Capitalize_first_letter+ rest_of_name + " uploaded the following file:  " + data +'\n' );
            };
        writer.end();  
    }

    catch( e ) {
        // Catch anything bad that happens
        console.error( "We've thrown! Whoops!", e );
    }

})(); // Wrap in parenthesis and call now




// the finish event is emitted when all data has been flushed from the stream

// close the stream
