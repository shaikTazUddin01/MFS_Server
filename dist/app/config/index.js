"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.config = {
    port: process.env.PORT,
    db_url: process.env.DB_URL,
    saltRounds: process.env.SALTROUND,
    cloudinary_name: process.env.Cloudinary_Name,
    cloudinary_api: process.env.Cloudinary_Api,
    cloudinary_secret: process.env.Cloudinary_Secret,
    assessToken: process.env.ACCESS_Token,
    assessTokenExpireIn: process.env.ACCESS_EXPIRESIN
};
