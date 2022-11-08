"use strict";
exports.__esModule = true;
exports.generateOtp = void 0;
var generateOtp = function () {
    var otp = Math.floor(100000 + Math.random() * 900000);
    return otp.toString();
};
exports.generateOtp = generateOtp;
