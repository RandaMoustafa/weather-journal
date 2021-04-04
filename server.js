// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
const cors = require ('cors');


// Start up an instance of app
const app = express();
const port = 8080;
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));



//Get Route
app.get('/all', (req, res) => {
  res.status(200).send(projectData)
});
//Post Route
const data = [];
app.post('/add', (req, res) => {
  const {date, temp, content} = req.body
  projectData[date] = {
    temp,
    content,
  }
  res.status(201).send()
});

// Setup Server
const server = app.listen(port, listening);
function listening(){
    console.log("server running");
    console.log(`running on localhost: ${port}`);
};