var express = require('express');
var bodyParser = require('body-parser');
var urlencode = bodyParser.urlencoded({ extended: true });

// INSTALL REDIS
// if (process.env.REDISTOGO_URL) {
//     var rtg   = require("url").parse(process.env.REDISTOGO_URL);
//     var client = require("redis").createClient(rtg.port, rtg.hostname);
//     // Node's url lib does not seperate auth into user and pass
//     // so we split by the ':' and take the password
//     client.auth(rtg.auth.split(":")[1]);
// } else {
    var client = require("redis").createClient();

    //client.select((process.env.NODE_ENV || 'development').length);
// }

var router = express.Router();

router.route('/')
  .get(function(request, response) {
    client.hkeys('users', function(error, names) {
      if(error) throw error;
      console.log(names);
      response.render('index.ejs', { names: names} );
    });
  })

  .post(urlencode, function(request, response) {
    var newUser = request.body;
    if(!newUser.name || !newUser.description) {
      response.sendStatus(400);
      return false;
    }
    client.hset('users', newUser.name, newUser.description, function(error, name) {
      if(error) throw error;
      response.status(201).json(newUser.name);
    });
  });
// router.route('/')

router.route('/:name')
  .get(function(request, response) {
    client.hget('users', request.params.name, function(error, description){
      if(error) throw error;
      response.render('show.ejs', { user:
        { name: request.params.name, description: description }
      });
    });
  });
// router.route('/:name')




// REGISTER ROUTES
// we might not need this
// app.use('/api', router);

module.exports = router;
