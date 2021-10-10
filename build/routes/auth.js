"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const authRouter = (app) => {
    app.use('/users', route);
    route.get('/me', middlewares.isAuth, middlewares.attachCurrentUser, (req, res) => {
        return res.json({ user: req.currentUser }).status(200);
    });
};
exports.authRouter = authRouter;
