"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const JWTUtils_1 = require("../utils/JWTUtils");
const AuthMiddleware = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ error: 'Access Denied' });
    }
    const user = (0, JWTUtils_1.verifyJWT)(token);
    if (!user) {
        return res.status(401).json({ error: 'Invalid Token' });
    }
    req.body.user = user;
    next();
};
exports.AuthMiddleware = AuthMiddleware;
