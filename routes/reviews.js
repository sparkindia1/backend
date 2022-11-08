"use strict";
exports.__esModule = true;
var express_1 = require("express");
var reviews_1 = require("../controllers/reviews");
var routes_1 = require("../utils/routes");
var reviews_2 = require("../validators/reviews");
var reviewsRouter = (0, express_1.Router)();
reviewsRouter.post('/create', reviews_2.ValidateCreateReview, (0, routes_1.makeSafe)(reviews_1.createReview));
reviewsRouter.post('/', reviews_2.validateGetReviews, (0, routes_1.makeSafe)(reviews_1.getReviews));
reviewsRouter.post('/delete', reviews_2.validateDeleteReview, (0, routes_1.makeSafe)(reviews_1.deleteReview));
reviewsRouter.post('/update', reviews_2.validateUpdateReview, (0, routes_1.makeSafe)(reviews_1.updateReview));
exports["default"] = reviewsRouter;
