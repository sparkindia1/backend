"use strict";
exports.__esModule = true;
exports.validateCancelDeleteProduct = exports.validateConfirmDeleteProduct = exports.validateInitDeleteProduct = exports.validateSearchProducts = exports.validateGetSingleProduct = exports.validateEditProduct = exports.validateCreateProduct = exports.OTP_DIGIT_LENGTH = void 0;
var zod_1 = require("zod");
var validate_1 = require("../utils/validate");
exports.OTP_DIGIT_LENGTH = 6;
var typeOfLevelLimit = zod_1.z.string().min(3).max(500).optional().nullable();
var typeofPricePerLevel = zod_1.z.number().positive().optional().nullable();
var createProductSchema = zod_1.z.object({
    name: zod_1.z.string().min(3).max(50),
    owner: zod_1.z.number().positive(),
    description: zod_1.z.string().min(3).max(500),
    imageUrl: zod_1.z.string().min(3).max(500),
    stock: zod_1.z.number().positive(),
    categoryId: zod_1.z.number().positive(),
    levelOneLimit: typeOfLevelLimit,
    pricePerProductLevelOne: typeofPricePerLevel,
    levelTwoLimit: typeOfLevelLimit,
    pricePerProductLevelTwo: typeofPricePerLevel,
    levelThreeLimit: typeOfLevelLimit,
    pricePerProductLevelThree: typeofPricePerLevel,
    levelFourLimit: typeOfLevelLimit,
    pricePerProductLevelFour: typeofPricePerLevel,
    levelFiveLimit: typeOfLevelLimit,
    pricePerProductLevelFive: typeofPricePerLevel
});
exports.validateCreateProduct = (0, validate_1.validate)(createProductSchema);
exports.validateEditProduct = (0, validate_1.validate)(createProductSchema.extend({
    productId: zod_1.z.number().positive()
}));
exports.validateGetSingleProduct = (0, validate_1.validate)(zod_1.z.object({
    productId: zod_1.z.number().positive()
}));
exports.validateSearchProducts = (0, validate_1.validate)(zod_1.z.object({
    category: zod_1.z.string().min(3).max(50).optional().nullable(),
    name: zod_1.z.string().min(3).max(50).optional().nullable()
}));
exports.validateInitDeleteProduct = (0, validate_1.validate)(zod_1.z.object({
    productId: zod_1.z.number().positive()
}));
exports.validateConfirmDeleteProduct = (0, validate_1.validate)(zod_1.z.object({
    productId: zod_1.z.number().positive(),
    otp: zod_1.z.string().min(exports.OTP_DIGIT_LENGTH).max(exports.OTP_DIGIT_LENGTH)
}));
exports.validateCancelDeleteProduct = (0, validate_1.validate)(zod_1.z.object({
    productId: zod_1.z.number().positive()
}));
