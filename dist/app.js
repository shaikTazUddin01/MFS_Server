"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import package
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const router_1 = __importDefault(require("./app/router"));
const globalErrorHandler_1 = __importDefault(require("./app/middleware/globalErrorHandler"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
//middleware
app.use((0, cors_1.default)({ origin: ["https://japanesevoc.netlify.app", "http://localhost:5173"], credentials: true }));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
//router
app.use("/api", router_1.default);
//global error middleware
app.use(globalErrorHandler_1.default);
// check server conncetion
app.get("/", (req, res) => {
    res.send("The server is connect successfully");
});
exports.default = app;
