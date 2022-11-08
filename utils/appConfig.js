"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.corsConfig = exports.isProduction = void 0;
exports.isProduction = process.env.NODE_ENV === 'production';
var corsConfig = function (others) { return (__assign({ credentials: true, optionsSuccessStatus: 200, origin: exports.isProduction
        ? []
        : ['http://localhost:3000', 'http://localhost:3001'] }, others)); };
exports.corsConfig = corsConfig;
