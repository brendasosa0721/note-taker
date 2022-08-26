//Dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');
const util = require('util');


//Instantiate the server with express
const app = express();
const PORT = process.env.PORT ||8000; 

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

//Asychronous process- Asychronous is used to return a promise

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsyn = util.promisify(fs.writeFile);

//Middleware

app.use(express.static("./develop/public"));

//API
app.get("/api/notes", function(req, res) {
    readFileAsync("./develop/db/db.json" , "utf8").then(function(data) {
        res.json(notes);
    })
})

app.post("/api/notes" , function(req, res) {
    const note = req.body;
    readFileAsync("./develop/db/db.json" , "utf8").then(function(data) {
        note.id = notes.length + 1
        note.push(note);
        return notes
    }).then(function(note) {
        writeFileAsyn("./develop/db/db.json" , JSON.stringify(notes))
        res.json(note);
    })
})

//Delete API- This is to target which note the client want to delete. Within this app.get we will go back to JSON file and this will find the notes we want to remove and add it to the newNotedate.


app.delete("/api/notes/:id" , function(req,res) {
    const idToDelete = parseInt(req.params.id); // creating the parameter
    readFileAsync("./develop/db/db.json" , "utf8").then(function(data) { // using the concat method to merge the arrays below
        const notes = [].concat(JSON.parse(data)); // Creating a new variable with the concat method
        const newNoteData =[] //New variable for where the unwanted notes will go [] represent the array
        for(let i = 0; i<notes.length; i++) { // For loop which is used to loop around the function
            if(idToDelete !== notes[i].id) {
                newNoteData.push(notes[i])
            }
        }

        return newNoteData
    }).then(function(notes) {
        writeFileAsyn("./develop/db/db.json" , JSON.stringify(notes))
        res.send('saved completed');
    })
})
//Requiring data
const { notes } = require('./');
const { json } = require('body-parser');










//Listen method

app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
});