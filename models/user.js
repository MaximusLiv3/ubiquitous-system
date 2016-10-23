'use strict';

const faker = require('faker');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/ConnectionTest');

const Schema = mongoose.Schema;

var userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: Number,
  score: Number,
  gender: String,
  photoUrl: String,
  created_at: Date,
  updated_at: Date
});

var User = mongoose.model('User', userSchema);

// Clear out users
User.remove({}, function(err) {
   console.log('Users cleared');
});

// Generate 20 randos
for (var i = 0; i < 20; i++) {

  var newUser = User({
    username: faker.name.firstName() + Math.floor(Math.random() * 90 + 10),
    password: 'password',
    age:      Math.floor(Math.random() * 50 + 18),
    score:    Math.floor(Math.random() * 550 + 300),
    gender:   Math.floor(Math.random() * 2) ? "men" : "women"
  });
  newUser.photoUrl = "https://randomuser.me/api/portraits/" + newUser.gender + "/" + Math.floor(Math.random() * 89 + 10) + ".jpg"
  newUser.save(function(err) {if (err) throw err;});

}





module.exports = User;
