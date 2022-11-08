"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.cancelDeleteProduct = exports.confirmDeleteProduct = exports.initDeleteProduct = void 0;
var helpers_1 = require("../../utils/helpers");
var prisma_1 = require("../../utils/prisma");
var initDeleteProduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var productId, product, otp;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                productId = req.body.productId;
                return [4 /*yield*/, prisma_1.prisma.product.findUnique({
                        where: { id: Number(productId) }
                    })];
            case 1:
                product = _a.sent();
                if (!product)
                    throw new Error('Product not found');
                otp = (0, helpers_1.generateOtp)();
                return [4 /*yield*/, prisma_1.prisma.tempProduct.create({
                        data: { otp: otp, productId: product.id }
                    })];
            case 2:
                _a.sent();
                console.log({ otp: otp, productId: product.id });
                // TODO send mail to the user about this otp
                return [2 /*return*/, res.status(200).json({
                        message: 'OTP sent to your email'
                    })];
        }
    });
}); };
exports.initDeleteProduct = initDeleteProduct;
var confirmDeleteProduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, productId, otp, tempProduct;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, productId = _a.productId, otp = _a.otp;
                return [4 /*yield*/, prisma_1.prisma.tempProduct.findUnique({
                        where: { productId: Number(productId) }
                    })];
            case 1:
                tempProduct = _b.sent();
                if (!tempProduct)
                    throw new Error('Product not found');
                if (tempProduct.otp !== otp)
                    throw new Error('Invalid OTP');
                return [4 /*yield*/, prisma_1.prisma.product.update({
                        where: { id: Number(productId) },
                        data: { deleted: true }
                    })];
            case 2:
                _b.sent();
                return [4 /*yield*/, prisma_1.prisma.tempProduct["delete"]({
                        where: { productId: Number(productId) }
                    })];
            case 3:
                _b.sent();
                return [2 /*return*/, res.status(200).json({
                        message: 'Product deleted successfully'
                    })];
        }
    });
}); };
exports.confirmDeleteProduct = confirmDeleteProduct;
var cancelDeleteProduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var productId, tempProduct;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                productId = req.body.productId;
                return [4 /*yield*/, prisma_1.prisma.tempProduct.findUnique({
                        where: { productId: Number(productId) }
                    })];
            case 1:
                tempProduct = _a.sent();
                if (!tempProduct)
                    throw new Error('Product not found');
                // if(tempProduct.otp !== otp) throw new Error("Invalid OTP");
                return [4 /*yield*/, prisma_1.prisma.tempProduct["delete"]({
                        where: { productId: Number(productId) }
                    })];
            case 2:
                // if(tempProduct.otp !== otp) throw new Error("Invalid OTP");
                _a.sent();
                return [2 /*return*/, res.status(200).json({
                        message: 'Product deletion cancelled successfully'
                    })];
        }
    });
}); };
exports.cancelDeleteProduct = cancelDeleteProduct;
