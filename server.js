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

//Asychronous process

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
//Requiring data
const { notes } = require('./')










//Listen method

app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
});