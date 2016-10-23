var express = require('express');
var bodyParser = require('body-parser');
var urlencode = bodyParser.urlencoded({ extended: true });

var User = require('../models/user');



var router = express.Router();

router.route('/')
  .get(function(request, response) {
    User.find({}, function(error, users) {
      if (error) throw err;
      // console.log('users', users);
      response.render('index.ejs', { users: users } );
    });
  })

//   .post(urlencode, function(request, response) {
//     var newUser = request.body;
//     if(!newUser.name || !newUser.description) {
//       response.sendStatus(400);
//       return false;
//     }
//     client.hset('users', newUser.name, newUser.description, function(error, name) {
//       if(error) throw error;
//       response.status(201).json(newUser.name);
//     });
//   });
// // router.route('/')

router.route('/:username')
  .get(function(request, response) {
    User.find({ username: request.params.username }, function(error, user){
      if(error) throw error;
      // console.log("user returned: " , user);
      response.render('show.ejs', { user: user[0] } );
    });
  });
// router.route('/:name')




// REGISTER ROUTES
// we might not need this
// app.use('/api', router);

module.exports = router;
