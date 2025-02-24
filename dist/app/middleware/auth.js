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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const config_1 = require("../config");
const auth_model_1 = require("../module/Auth/auth.model");
const AppError_1 = require("../error/AppError");
const http_status_codes_1 = require("http-status-codes");
const auth = (...requiredRole) => {
    return (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const decoded = jsonwebtoken_1.default.verify((_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.authorization, config_1.config.assessToken);
        // console.log(decoded);
        const { userId, email, role } = decoded;
        const isUserExists = yield auth_model_1.Auth.findById(userId);
        if (!isUserExists) {
            throw new AppError_1.AppError(http_status_codes_1.StatusCodes.UNAUTHORIZED, "you are not authorized");
        }
        if (requiredRole && !requiredRole.includes(role)) {
            throw new AppError_1.AppError(http_status_codes_1.StatusCodes.UNAUTHORIZED, "you are not authorized");
        }
        req.user = decoded;
        next();
    }));
};
exports.auth = auth;
