const mongoose = require('mongoose');

  // {type: String, lowercase: true, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true},

export const UserSchema = new mongoose.Schema({
  username: {type: String, lowercase: true},
  password: String,
  email: {type: String, lowercase: true},
}, {timestamps: true});


export const SessionSchema = new mongoose.Schema({
  session_token: String,
  username: String,
  user_uuid: String,
  last_active: {type: Date, default: ()=> new Date()}
}, {timestamps: true});
