"use strict";
exports.__esModule = true;
var fieldsNotToSend = ['password', 'deleted'];
function filter(obj) {
    var res = {};
    for (var key in obj) {
        if (!fieldsNotToSend.includes(key)) {
            res[key] = obj[key];
        }
    }
    return res;
}
function filterResponse(response) {
    if (Array.isArray(response)) {
        var res = response.map(function (item) { return filter(item); });
        return res;
    }
    else {
        return filter(response);
    }
}
exports["default"] = filterResponse;
