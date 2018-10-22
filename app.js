// this is the template engine
const express = require('express')
const app = express()
const port = 3000
const fs= require('fs'); // this will include the File System module - file system module allows you to work with the file system on your computer.
var bodyParser = require('body-parser')

app.set('view engine', 'ejs') // includes the .ejs file in the 'views' folder. 

app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', function(req, res) { //first route, READS AND RENDER PAGE W/ ALL USERS
fs.readFile('./users.json', (function (err, data) { //callback function
  if (err) { //if error print error
    throw err;
  } 
  var file = JSON.parse(data); //parses the object constructing the javascript value
  res.render('index', {user: file}) // user= the key, file= the object. the key is used in the index to print the information within the json file
}))
})
// var userInput = process.argv[2]; /// from the search bar instead!

app.post('/') //ROUTE 2/ SEARCH BAR
fs.readFile('./users.json', (function (err, data) { //callback function
  if (err) { //if error print error
    throw err;
  } 
  var file = JSON.parse(data);
  console.log(file)
}))

app.post('/pagetwo', function(req,res){ //ROUTE THREE - SHOWS THE MATCHING USER ON NEW PAGE
  fs.readFile('./users.json', (function (err, data) { //callback function
    if (err) { //if error print error
      throw err;
    } 
    let file = JSON.parse(data);
    let userInput1 = req.body.firstname //this is the userinput -> name in form(input name= firstname) will be the reference in route one 
    let userInput2 = req.body.lastname
  function userfinder (files) { 
    for (let i =0; i<files.length; i++){ // running through the file users.json
      if (userInput1 === files[i].firstname || userInput2 === files[i].lastname) { // if user input matching the user in the file than it will print the below value
        console.log('User: ' + files[i].firstname + ' ' + files[i].lastname); // prints the objects from the module 'users.json'
        res.render('pagetwo', {user: file[i]})
      }
      }
    }
    userfinder(file)
}))})


app.post('/pagetwo', function(req,res){ //ROUTE FOUR - RENDERS A PAGE WITH 'ADD USER'
  fs.readFile('./users.json', (function (err, data) { //callback function
    if (err) { //if error print error
      throw err;
    } 
    let file = JSON.parse(data);
    console.log(file)
    res.render('pagetwo')

  }))})
  
  app.post('/pagetwo/:firstname/:lastname/:email?', addUser)  //ROUTE FIVE GOES BACK TO INDEX AND ADDS NEW USER TO THE LIST
    function addUser (req, res) {
      let users = req.params 
      users.firstname === firstname
      users.lastname === lastname
      users.email === email

      let file = JSON.stringify(data, null, 2)
      fs.writeFile('users.json', users, finished)
      function finished(err) {
        console.log('great, file is updated!')
      }
      res.redirect('/index', {user: file.users.firstname, user: file.users.lastname, user: file.users.email})
    }
app.listen(port, () => console.log(`Example app listening on port ${port}!`)) 