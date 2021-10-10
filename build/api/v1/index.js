"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("./auth");
exports.default = () => {
    const router = (0, express_1.Router)();
    router.use("/auth", (0, auth_1.authRouter)());
    return router;
};
