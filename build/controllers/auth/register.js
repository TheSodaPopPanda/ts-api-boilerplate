"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = void 0;
const tslib_1 = require("tslib");
const mongo_1 = require("../../lib/mongo");
const UserSchema_1 = require("../../models/mongo/UserSchema");
const bcryptjs_1 = require("bcryptjs");
const _dayjs = (0, tslib_1.__importStar)(require("dayjs"));
const dayjs = _dayjs.default;
const users = mongo_1.mongoDb.model('Users', UserSchema_1.UserSchema);
const sessions = mongo_1.mongoDb.model('Sessions', UserSchema_1.SessionSchema);
const registerUser = (data, req, res) => {
    users.findOne({ email: data.email }, (result) => {
        if (result) {
            res.status(400).send({ error: "an account with that email already exists" });
        }
        else {
            const newUser = new users({
                username: data.username,
                email: data.email,
                password: bcryptjs_1.bcrypt.hashSync(data.password, 10)
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
