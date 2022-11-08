"use strict";
exports.__esModule = true;
exports.verifyToken = void 0;
var auth_1 = require("../utils/auth");
var sessions_1 = require("../utils/sessions");
var verifyToken = function (req, res, next) {
    // steps
    // parse token from the session cookie
    var cookie = req.cookies;
    (0, auth_1.assertHasUser)(req);
    var session = (0, sessions_1.getSession)(cookie.sessionId);
    if (!session)
        throw new Error('Unauthorized');
    // req.email = session.email;
};
exports.verifyToken = verifyToken;
