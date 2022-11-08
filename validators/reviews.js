"use strict";
exports.__esModule = true;
exports.validateUpdateReview = exports.validateDeleteReview = exports.validateGetReviews = exports.ValidateCreateReview = exports.MAX_RATING = exports.MIN_RATING = void 0;
var zod_1 = require("zod");
var validate_1 = require("../utils/validate");
exports.MIN_RATING = 0;
exports.MAX_RATING = 5;
exports.ValidateCreateReview = (0, validate_1.validate)(zod_1.z.object({
    productId: zod_1.z.number(),
    userId: zod_1.z.number(),
    rating: zod_1.z.number().min(exports.MIN_RATING).max(exports.MAX_RATING),
    comment: zod_1.z.string().optional()
}));
exports.validateGetReviews = (0, validate_1.validate)(zod_1.z.object({
    productId: zod_1.z.number()
}));
exports.validateDeleteReview = (0, validate_1.validate)(zod_1.z.object({
    reviewId: zod_1.z.number()
}));
exports.validateUpdateReview = (0, validate_1.validate)(zod_1.z.object({
    reviewId: zod_1.z.number(),
    rating: zod_1.z.number().min(exports.MIN_RATING).max(exports.MAX_RATING),
    comment: zod_1.z.string().optional()
}));
