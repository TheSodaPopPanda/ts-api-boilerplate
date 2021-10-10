"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionSchema = exports.UserSchema = void 0;
const mongoose = require('mongoose');
// {type: String, lowercase: true, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true},
exports.UserSchema = new mongoose.Schema({
    username: { type: String, lowercase: true },
    password: String,
    email: { type: String, lowercase: true },
}, { timestamps: true });
exports.SessionSchema = new mongoose.Schema({
    session_token: String,
    username: String,
    user_uuid: String,
    last_active: { type: Date, default: () => new Date() }
}, { timestamps: true });
