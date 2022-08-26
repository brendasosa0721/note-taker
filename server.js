//Dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');
const util = require('util');
const {notes} = require("./db/db.json");



//Instantiate the server with express
const app = express();
const PORT = process.env.PORT || 3001;//Using this port it won't get stuck in the number 

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

//Asychronous process- Asychronous is used to return a promise

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsyn = util.promisify(fs.writeFile);

//Middleware

app.use(express.static("public"));

//API
app.get("/api/notes", function(req, res) { // Get data
    readFileAsync("./db/db.json" , "utf8").then(function(data) {
        res.json(notes);
    })
})

// function createNewNote(body, notesArray) {
//     const note = body;
//     notesArray.push(note);
//     fs.writeFileSync(
//         path.join(__dirname, "./db/db.json"),
//         JSON.stringify({ notes: notesArray } , null , 2)
        
//     );
//     return note;
// }

// app.post("/api/notes" , (req, res) => {
//     const note = createNewNote(req.body, notes);
//     res.json(req.body);
// });


app.post("/api/notes" , function(req, res) { // Post data
    readFileAsync("./db/db.json" , "utf8").then(function(body) {
        const note = req.body;
        note.id = note.length + 1
        console.log(note);
        note.push(note);
        return note
        
    }).then(function(notes) {
        writeFileAsyn("./db/db.json" , JSON.stringify(note))
        res.json(notes);
    })
})

//Delete API- This is to target which note the client want to delete. Within this app.get we will go back to JSON file and this will find the notes we want to remove and add it to the newNotedate.


app.delete("/api/notes/:id" , function(req,res) {
    const idToDelete = parseInt(req.params.id); // creating the parameter
    readFileAsync("./db/db.json" , "utf8").then(function(data) { // using the concat method to merge the arrays below
        const notes = [].concat(JSON.parse(data)); // Creating a new variable with the concat method
        const newNoteData =[] //New variable for where the unwanted notes will go [] represent the array
        for(let i = 0; i<notes.length; i++) { // For loop which is used to loop around the function
            if(idToDelete !== notes[i].id) {
                newNoteData.push(notes[i])
            }
        }

        return newNoteData
    }).then(function(notes) {
        writeFileAsyn("./db/db.json" , JSON.stringify(notes))
        res.send('saved completed');
    })
})


//HTML Routes

app.get("/notes" , function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html")); // Creating the path to connect the index.hmtl
});

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
})
// app.get("*" , function(req, res) {
//     res.sendFile(path.join(__dirname, "./public/index.html")); // Adding the middleware which will be act as a bridge
// });



//Listen method

app.listen(PORT, () => {
    console.log(`APP listening on PORT + ${PORT}!`);
});