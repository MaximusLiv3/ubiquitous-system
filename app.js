var express = require("express");
var app = express();

// might not need this we're making an api
// app.use(express.static('public'));

var users = require('./routes/users');
app.use('/users', users);

// i think this is the right place for this
var router = require("./routes/users");
app.use('', router);

module.exports = app;
