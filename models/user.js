'use strict';

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ConnectionTest'); 

 
const Schema = mongoose.Schema;

var userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: Number,
  score: Number,
  gender: String,
  created_at: Date,
  updated_at: Date
});

var User = mongoose.model('User', userSchema);

module.exports = User;


