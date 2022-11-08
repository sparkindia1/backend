"use strict";
exports.__esModule = true;
exports.validateResetPassword = exports.validateForgotPassword = exports.validateVerifyAccount = exports.validateRegister = exports.validateLogin = exports.validateGetuser = void 0;
var zod_1 = require("zod");
var validate_1 = require("../utils/validate");
exports.validateGetuser = (0, validate_1.validate)(zod_1.z.object({
    id: zod_1.z.string()
}), 'params');
exports.validateLogin = (0, validate_1.validate)(zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string()
}));
exports.validateRegister = (0, validate_1.validate)(zod_1.z.object({
    email: zod_1.z.string().email(),
    phone: zod_1.z.string().min(6),
    password: zod_1.z.string().min(6),
    role: zod_1.z["enum"](['ADMIN', 'BUYER', 'SELLER'])
}));
exports.validateVerifyAccount = (0, validate_1.validate)(zod_1.z.object({
    email: zod_1.z.string().email(),
    otp: zod_1.z.string().min(6)
}));
exports.validateForgotPassword = (0, validate_1.validate)(zod_1.z.object({
    email: zod_1.z.string().email()
}));
exports.validateResetPassword = (0, validate_1.validate)(zod_1.z.object({
    userId: zod_1.z.string(),
    otp: zod_1.z.string().min(6),
    password: zod_1.z.string().min(6)
}));
