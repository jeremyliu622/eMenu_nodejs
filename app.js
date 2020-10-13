// Create pooled data connection.
var mongoose = require('mongoose');
// const DB_URI = 'mongodb://localhost:27017/MenuDB';
const DB_URI      = "mongodb+srv://dbUser:P@ssw0rd@cluster0-tycp2.mongodb.net/eMenu?retryWrites=true&w=majority"

let options = { useNewUrlParser: true , useUnifiedTopology: true };
mongoose.connect(DB_URI, options);

var express = require('express');
var http    = require('http');
var app     = express();

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));;

// Parse JSON bodies (as sent by API clients)
app.use(express.json());


var cors = require('cors');
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

// Enable routing and use port 1337.
require('./router')(app);
app.set('port', 1337);

 
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


