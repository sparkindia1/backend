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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.register = exports.verifyAccount = void 0;
var bcrypt_1 = __importDefault(require("bcrypt"));
var prisma_1 = require("../../utils/prisma");
var jwt_1 = require("../../utils/jwt");
var verifyAccount = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, otp, user, tempUser;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, otp = _a.otp;
                return [4 /*yield*/, prisma_1.prisma.user.findFirst({
                        where: { email: email }
                    })];
            case 1:
                user = _b.sent();
                if (!user)
                    throw new Error('User not found');
                return [4 /*yield*/, prisma_1.prisma.tempUser.findFirst({
                        where: { userId: user.id }
                    })];
            case 2:
                tempUser = _b.sent();
                if (!tempUser)
                    throw new Error('User not found');
                if (tempUser.otp !== otp)
                    throw new Error('Invalid OTP');
                return [4 /*yield*/, prisma_1.prisma.user.update({
                        where: { id: user.id },
                        data: { verified: true }
                    })];
            case 3:
                _b.sent();
                return [4 /*yield*/, prisma_1.prisma.tempUser["delete"]({
                        where: { id: tempUser.id }
                    })];
            case 4:
                _b.sent();
                return [2 /*return*/, res.status(200).json({
                        message: 'Account verified'
                    })];
        }
    });
}); };
exports.verifyAccount = verifyAccount;
var register = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, phone, password, role, user, hash, savedUser, _b, accessToken, refreshToken;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.body, email = _a.email, phone = _a.phone, password = _a.password, role = _a.role;
                return [4 /*yield*/, prisma_1.prisma.user.findFirst({
                        where: { email: email, deleted: false }
                    })];
            case 1:
                user = _c.sent();
                if (user)
                    throw new Error('User already exists');
                return [4 /*yield*/, bcrypt_1["default"].hash(password, 12)];
            case 2:
                hash = _c.sent();
                return [4 /*yield*/, prisma_1.prisma.user.create({
                        data: { email: email, phone: phone, role: role, password: hash }
                    })];
            case 3:
                _c.sent();
                return [4 /*yield*/, prisma_1.prisma.user.findFirst({
                        where: {
                            email: email
                        }
                    })];
            case 4:
                savedUser = _c.sent();
                _b = (0, jwt_1.issueJWT)(savedUser), accessToken = _b.accessToken, refreshToken = _b.refreshToken;
                res.cookie('refreshToken', JSON.stringify(accessToken));
                res.cookie('accessToken', JSON.stringify(refreshToken));
                return [2 /*return*/, res.status(200).json({
                        message: 'Registration Successful'
                    })];
        }
    });
}); };
exports.register = register;
