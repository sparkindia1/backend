"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.revalidate = exports.verifyJWT = exports.issueJWT = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var secretKey = process.env.SECRET_KEY;
var issueJWT = function (user) {
    var payload = { sub: user.userID, iat: Date.now() };
    var accessToken = jsonwebtoken_1["default"].sign(payload, secretKey, {
        expiresIn: 300 /* 5 minutes */
    });
    var refreshToken = jsonwebtoken_1["default"].sign(payload, secretKey, {
        expiresIn: '7d' /* 7 days */
    });
    return { accessToken: accessToken, refreshToken: refreshToken };
};
exports.issueJWT = issueJWT;
var verifyJWT = function (accessToken) {
    try {
        var decoded = jsonwebtoken_1["default"].verify(accessToken, secretKey);
        return { valid: true, expired: false, payload: decoded };
    }
    catch (err) {
        return {
            valid: false,
            expired: err.message === 'jwt expired',
            payload: null
        };
    }
};
exports.verifyJWT = verifyJWT;
var revalidate = function (refreshToken, user) {
    try {
        var decoded = jsonwebtoken_1["default"].verify(refreshToken, secretKey);
        if (decoded.sub === user.userID)
            return (0, exports.issueJWT)(user);
        else
            return null;
    }
    catch (err) {
        return null;
    }
};
exports.revalidate = revalidate;
