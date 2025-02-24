"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globalErrorHandler = (err, req, res, next) => {
    //setting default value
    let statusCode = err.statusCode || 500;
    let message = err.message || 'something went wrong.!';
    return res.status(statusCode).json({
        success: false,
        message,
        error: err
    });
};
exports.default = globalErrorHandler;
