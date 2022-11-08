"use strict";
exports.__esModule = true;
exports.assertHasUser = void 0;
function assertHasUser(req) {
    if (!('email' in req) || !('isAuthenticated' in req)) {
        throw new Error('Request object without user found unexpectedly');
    }
}
exports.assertHasUser = assertHasUser;
