// this is the template engine
const express = require('express')
const app = express()
const port = 3000
const fs= require('fs'); // this will include the File System module - file system module allows you to work with the file system on your computer.
var bodyParser = require('body-parser')

app.set('view engine', 'ejs') // includes the .ejs file in the 'views' folder. 
app.use(express.static(__dirname + '/views')); //include css
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', function(req, res) {// render first page
  res.render('index')
})

app.get('/new', function(req, res) {// render second page
  res.render('new')
})

app.get('/signatures', function(req, res) { //READS AND RENDER PAGE W/ ALL USERS
fs.readFile('./users.json', (function (err, data) { //callback function
  if (err) { //if error print error
    throw err;
  } 
  var file = JSON.parse(data); //parses the object constructing the javascript value
  res.render('signatures', {user: file}) // user= the key, file= the object. the key is used in the ejs-file to print the information within the json file
}))
})
app.post('/signatures', function(req,res){ //THIS ROUTE WILL ADD A NEW USER TO JSON FILE

  fs.readFile('./users.json', (function (err, data) { //callback function
    if (err) { //if error print error
      throw err;
    } 
    let object = JSON.parse(data);
    console.log(object)
    let newUser = {
        firstname: req.body.addFirstname, //CLIENT SIDE INPUT WILL BE SENT TO THE SERVER SIDE WITH THE BODY PARSER
        lastname: req.body.addLastname,
        email: req.body.addEmail, 
    }
    object.push(newUser) //PUSHES THE NEWUSER DETAILS TO THE SERVER?

    let addJson = JSON.stringify(object, null, 2); //STRINGIFY - OPPOSITE OF PARSE IN ORDER TO WRITE THE DATA TO JSON

     fs.writeFile('./users.json', addJson, function (err, data){
       if (err) throw err}) 
  }  
))
res.redirect('signatures') //REDIRECTS TO LIST OF USERS WITH ADDED USER
})

app.get('/search', function(req, res) {// render fourth page
  res.render('search')
})
app.get('/searchresult', function(req, res) {// render fourth page
  res.render('searchresult')
})

app.post('/searchresult', function(req, res,){ //ROUTE THREE - SHOWS THE MATCHING USER
  fs.readFile('./users.json', (function (err, data) { //callback function
    if (err) { //if error print error
      throw err;
    } 
    let file = JSON.parse(data);
    let firstname = req.body.firstname
    //CLIENT SIDE INPUT WILL BE SENT TO THE SERVER SIDE WITH THE BODY PARSER
    let lastname = req.body.lastname
  
    let msg = "Ouch! Your friend didn't sign yet, tell them to!"
    
      function userfinder (obj) { 
        for (let i =0; i<obj.length; i++){ // running through the file users.json
          if ( firstname === obj[i].firstname.toLowerCase() || lastname === obj[i].lastname.toLowerCase()){
             res.render('searchresult', {users:file[i]})//return res.render('searchresult', {users: file[i]})

      } 
      // else { 
      //   file.push(msg)
      // }
      // res.render('searchresult', {users: file[i], notFound: msg})
    }

 //can only render a page once, thus use push in the if statement
}
userfinder(file)

}))})
// app.get('/test', function(req, res) {// render fourth page
//   res.render('test')
// })
app.post('/search', function(req, res){ // AJAX ASSIGNEMNT
  console.log(req.body)
  fs.readFile('./users.json', (function (err, data) { //callback function
    if (err) { //if error print error
      throw err;
    } 
    let users = JSON.parse(data);
    let search = req.body.search
    console.log(search)
    searchResult = []
    //CLIENT SIDE INPUT WILL BE SENT TO THE SERVER SIDE WITH THE BODY PARSER
    // let lastname = req.body.lastname
    function userfinder (obj) { 
      for (let i =0; i<obj.length; i++){ // running through the file users.json
              // console.log(obj)
              // obj = JSON.stringify(data)
        let fullname = (obj[i].firstname + ' ' + obj[i].lastname)
        if (fullname.toLowerCase().indexOf(search.toLowerCase()) > -1){ //
          searchResult.push(obj[i])
          console.log(searchResult)
        }
        // need to send, not render a page. object that contains users and search 
      }
      res.send(searchResult)    
    }
      userfinder(users)
}))
})

app.listen(port, () => console.log(`user info app listening on port ${port}!`)) 
