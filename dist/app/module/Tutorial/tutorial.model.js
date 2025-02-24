"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tutorial = void 0;
const mongoose_1 = require("mongoose");
const tutorialSchema = new mongoose_1.Schema({
    videoLink: { type: String, required: true },
    authId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true }
});
exports.Tutorial = (0, mongoose_1.model)("tutorial", tutorialSchema);
