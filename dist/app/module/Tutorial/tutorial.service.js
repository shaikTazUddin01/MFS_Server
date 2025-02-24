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
Object.defineProperty(exports, "__esModule", { value: true });
exports.tutorialService = void 0;
const tutorial_model_1 = require("./tutorial.model");
const createTutorial = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield tutorial_model_1.Tutorial.create(data);
    return res;
});
const getTutorial = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield tutorial_model_1.Tutorial.find().populate("authId");
    return res;
});
const deleteTutorial = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield tutorial_model_1.Tutorial.findByIdAndDelete(id);
    return res;
});
const updateTutorial = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield tutorial_model_1.Tutorial.findByIdAndUpdate(id, data, { new: true });
    return res;
});
exports.tutorialService = {
    createTutorial,
    getTutorial,
    deleteTutorial,
    updateTutorial,
};
