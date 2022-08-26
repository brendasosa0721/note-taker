//Dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');
const util = require('util');


//Instantiate the server with express
const app = express();
const PORT = process.env.PORT ||8000; 

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsyn = util.promisify(fs.writeFile);

//Middleware

app.use(express.static("./develop/public"));


//Requiring data
const { notes } = require('./')










//Listen method

app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
});