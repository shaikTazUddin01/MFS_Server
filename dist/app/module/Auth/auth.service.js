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
exports.authService = void 0;
const AppError_1 = require("../../error/AppError");
const auth_model_1 = require("./auth.model");
const http_status_codes_1 = require("http-status-codes");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../config");
// create new user
const createUserInFoDB = (data, profileImage) => __awaiter(void 0, void 0, void 0, function* () {
    data.image = profileImage;
    const isUserExists = yield auth_model_1.Auth.findOne({ email: data === null || data === void 0 ? void 0 : data.email });
    if (isUserExists) {
        throw new AppError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "This user already exists.try with another E-mail");
    }
    data.role = "USER";
    const res = yield auth_model_1.Auth.create(data);
    return res;
});
// get user
const getUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield auth_model_1.Auth.find();
    return res;
});
// get user
const loginUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExists = yield auth_model_1.Auth.findOne({ email: data === null || data === void 0 ? void 0 : data.email });
    if (!isUserExists) {
        throw new AppError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "You don't have any account,Registration now");
    }
    const isPassMatch = yield bcrypt_1.default.compare(data === null || data === void 0 ? void 0 : data.password, isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists.password);
    if (!isPassMatch) {
        throw new AppError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "Wrong password");
    }
    const userInfo = {
        userId: isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists._id,
        name: isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists.name,
        email: isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists.email,
        role: isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists.role,
        image: isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists.image,
    };
    const token = jsonwebtoken_1.default.sign(userInfo, config_1.config.assessToken, {
        expiresIn: config_1.config === null || config_1.config === void 0 ? void 0 : config_1.config.assessTokenExpireIn,
    });
    return token;
});
// Update user
const updateUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log("--->", data?.id);
    const isUserExists = yield auth_model_1.Auth.findOne({ _id: data === null || data === void 0 ? void 0 : data.id });
    if (!isUserExists) {
        throw new AppError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "You don't have any account,Registration now");
    }
    const res = yield auth_model_1.Auth.findByIdAndUpdate(data === null || data === void 0 ? void 0 : data.id, { role: data === null || data === void 0 ? void 0 : data.role }, { new: true });
    // console.log(res);
    return res;
});
exports.authService = {
    createUserInFoDB,
    getUser,
    loginUser,
    updateUser,
};
