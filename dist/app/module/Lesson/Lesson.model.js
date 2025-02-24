"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lesson = void 0;
const mongoose_1 = require("mongoose");
const vocabularySchema = new mongoose_1.Schema({
    word: { type: String, required: true },
    pronunciation: { type: String, required: true },
    whenToSay: { type: String, required: true },
    adminEmail: { type: String, required: true },
    meaning: { type: String, required: true },
});
const lessonSchema = new mongoose_1.Schema({
    lessonName: { type: String, required: true, unique: true },
    lessonNumber: { type: Number, required: true, unique: true },
    authId: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "User" },
    vocabulary: { type: [vocabularySchema], ref: "User" },
});
exports.Lesson = (0, mongoose_1.model)("lesson", lessonSchema);
