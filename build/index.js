"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = (0, tslib_1.__importDefault)(require("express"));
const dotenv_1 = (0, tslib_1.__importDefault)(require("dotenv"));
const PORT = 8080 || Number(process.env.PORT);
async function startServer() {
    dotenv_1.default.config({ path: __dirname + '/../.env' });
    const app = (0, express_1.default)();
    const expressLoaders = require("./lib/express").expressLoaders;
    expressLoaders({ app });
    console.log(`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT || 27017}`);
    // v1 api router
    app.use("/api/v1/", require("./api/v1").default());
    app.use("*", (req, res) => {
        res.status(404).send("Error 404");
    });
    //  Start Server
    app.listen(PORT, () => {
        console.log(`API listening on port ${PORT}!`);
    });
    return app;
}
startServer();
