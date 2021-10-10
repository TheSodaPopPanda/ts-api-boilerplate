"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
exports.router = (({ app }) => {
    app.use("api/v1/", require("../api/v1"));
    return app;
});
