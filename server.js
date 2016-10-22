// server.js

// BASE SETUP

// call packages we need
var express     = require('express'),     // call express
    app         = express(),              // define app using express
    bodyParser  = require('body-parser');


// config app to use body parser
// this will let us get the data fro a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

// ROUTES
var router = express.Router();

router.get('/', function(request, response){
    response.json( {message: "HELLOOOOOOOOOOO NURSE!"} );
});

// REGISTER ROUTES
app.use('/api', router);

// START THE SERVER
app.listen(port);
console.log('Of happenings on port: ' + port);
