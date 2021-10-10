"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expressLoaders = void 0;
const tslib_1 = require("tslib");
const express_1 = (0, tslib_1.__importDefault)(require("express"));
const cors_1 = (0, tslib_1.__importDefault)(require("cors"));
exports.expressLoaders = (({ app }) => {
    // healthcheck
    app.get('/status', (req, res) => { res.status(200).end(); });
    app.head('/status', (req, res) => { res.status(200).end(); });
    app.enable('trust proxy');
    // middleware
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    return app;
});
