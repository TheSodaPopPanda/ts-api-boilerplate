"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const tslib_1 = require("tslib");
const express_1 = require("express");
const joi_1 = (0, tslib_1.__importDefault)(require("joi"));
const auth_1 = require("../../controllers/auth");
// import * as _dayjs from 'dayjs'
// const dayjs = _dayjs.default
// console.log("test format")
// console.log(dayjs().format("YYYY-MM-DD hh:mm:ss"))
const loginValid = joi_1.default.object({
    email: joi_1.default.string().email({ tlds: { allow: false } }).required(),
    password: joi_1.default.string().min(8).max(50).required(),
});
const logoutValid = joi_1.default.object({
    session_token: joi_1.default.string().required(),
});
const registerValid = joi_1.default.object({
    username: joi_1.default.string().min(3).max(24).required(),
    email: joi_1.default.string().email({ tlds: { allow: false } }).required(),
    password: joi_1.default.string().min(8).max(50).required(),
});
const authRouter = () => {
    const router = (0, express_1.Router)();
    console.log("auth router");
    router.post('/login', (req, res) => {
        loginValid.validateAsync(req.body)
            .then((data) => {
            (0, auth_1.loginUser)(data, req, res);
        })
            .catch((err) => {
            res.status(400).send({ error: err.details[0].message });
        });
    });
    router.post('/logout', (req, res) => {
        logoutValid.validateAsync(req.body)
            .then((data) => {
            (0, auth_1.logoutUser)(data, req, res);
        })
            .catch((err) => {
            res.status(400).send({ error: err.details[0].message });
        });
    });
    router.post('/register', (req, res) => {
        registerValid.validateAsync(req.body)
            .then((data) => {
            (0, auth_1.registerUser)(data, req, res);
        })
            .catch((err) => {
            res.status(400).send({ error: err.details[0].message });
        });
    });
    return router;
};
exports.authRouter = authRouter;
