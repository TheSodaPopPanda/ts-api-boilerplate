"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = exports.logoutUser = exports.loginUser = void 0;
const tslib_1 = require("tslib");
const mongo_1 = require("../lib/mongo");
const UserSchema_1 = require("../models/mongo/UserSchema");
const bcryptjs_1 = require("bcryptjs");
const uuid_1 = require("uuid");
const _dayjs = (0, tslib_1.__importStar)(require("dayjs"));
const dayjs = _dayjs.default;
const users = mongo_1.mongoDb.model('Users', UserSchema_1.UserSchema);
const sessions = mongo_1.mongoDb.model('Sessions', UserSchema_1.SessionSchema);
const createSession = (userData, res) => {
    const session_token = (0, uuid_1.v4)();
    const newSession = new sessions({
        session_token,
        player_uuid: userData._id,
        last_active: dayjs().format("YYYY-MM-DD hh:mm:ss")
    });
    newSession.save()
        .then((sessionData) => {
        res.status(200).send({
            session_token: sessionData.session_token,
            _uuid: sessionData.session_token,
        });
    })
        .catch((err) => {
        res.status(400).send({ error: "Unknown error occurred", debug: err.toString() });
    });
};
const loginUser = (data, req, res) => {
    users.findOne({ email: data.email })
        .then((result) => {
        if (result) {
            if ((0, bcryptjs_1.compareSync)(data.password, result.password)) {
                createSession(result, res);
            }
            else {
                res.status(400).send({ error: "invalid password" });
            }
        }
        else {
            res.status(400).send({ error: "couldn't find an account with that username" });
        }
    })
        .catch((err) => {
        res.status(500).send({ error: "Unknown error occurred", debug: err.toString() });
    });
};
exports.loginUser = loginUser;
const logoutUser = (data, req, res) => {
    sessions.findOneAndDelete({ session_token: data.session_token })
        .then((result) => {
        if (result) {
            res.status(200).send({ message: "session destroyed" });
        }
        else {
            res.status(400).send({ error: "session not found" });
        }
    })
        .catch((err) => {
        res.status(500).send({ error: "Unknown error occurred", debug: err.toString() });
    });
};
exports.logoutUser = logoutUser;
const registerUser = (data, req, res) => {
    users.findOne({ email: data.email }, (result) => {
        if (result) {
            res.status(400).send({ error: "an account with that email already exists" });
        }
        else {
            const newUser = new users({
                username: data.username,
                email: data.email,
                password: (0, bcryptjs_1.hashSync)(data.password, 10)
            });
            newUser.save()
                .then((result) => {
                createSession(result, res);
            })
                .catch((err) => {
                res.status(500).send({ error: "Unknown error occurred", debug: err.toString() });
            });
        }
    });
};
exports.registerUser = registerUser;
