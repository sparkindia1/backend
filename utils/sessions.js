"use strict";
exports.__esModule = true;
exports.createSession = exports.invalidateSession = exports.getSession = exports.sessions = void 0;
exports.sessions = new Map();
function getSession(sessionId) {
    if (!sessionId)
        return null;
    var session = exports.sessions.get(sessionId);
    return session && session.valid ? session : null;
}
exports.getSession = getSession;
function invalidateSession(sessionId) {
    var session = exports.sessions.get(sessionId);
    if (session)
        session.valid = false;
}
exports.invalidateSession = invalidateSession;
function createSession(user) {
    var sessionId = (exports.sessions.entries.length + 1).toString();
    exports.sessions.set(sessionId, { sessionId: sessionId, userId: user.id, valid: true });
    return exports.sessions.get(sessionId);
}
exports.createSession = createSession;
