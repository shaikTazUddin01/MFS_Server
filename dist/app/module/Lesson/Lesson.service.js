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
exports.lessonService = void 0;
const Lesson_model_1 = require("./Lesson.model");
const AppError_1 = require("../../error/AppError");
const http_status_codes_1 = require("http-status-codes");
const createLesson = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const isLessonNo = yield Lesson_model_1.Lesson.findOne({ lessonNumber: data === null || data === void 0 ? void 0 : data.lessonNumber });
    // check is lesson no is already exists
    if (isLessonNo) {
        throw new AppError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Already used the some lesson no. Please try to with another Lesson Number");
    }
    const isExistslessonName = yield Lesson_model_1.Lesson.findOne({ lessonName: data === null || data === void 0 ? void 0 : data.lessonName });
    // check is lesson name is already exists
    if (isExistslessonName) {
        throw new AppError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Already used the some lesson Name. Please try with to another Lesson Name");
    }
    const res = yield Lesson_model_1.Lesson.create(data);
    return res;
});
const getLesson = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield Lesson_model_1.Lesson.find().populate("authId");
    return res;
});
const getSpecificLesson = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield Lesson_model_1.Lesson.findOne({ _id: id }).populate("authId");
    return res;
});
const deleteLesson = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield Lesson_model_1.Lesson.findByIdAndDelete(id);
    return res;
});
const updateLesson = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield Lesson_model_1.Lesson.findByIdAndUpdate(id, data, { new: true });
    return res;
});
// added vocabulary
const addVoc = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const vocabulary = {
        word: data === null || data === void 0 ? void 0 : data.word,
        pronunciation: data === null || data === void 0 ? void 0 : data.pronunciation,
        whenToSay: data === null || data === void 0 ? void 0 : data.whenToSay,
        adminEmail: data === null || data === void 0 ? void 0 : data.adminEmail,
        meaning: data === null || data === void 0 ? void 0 : data.meaning,
    };
    // console.log(data,"-->",vocabulary);
    const res = yield Lesson_model_1.Lesson.updateOne({ lessonNumber: data === null || data === void 0 ? void 0 : data.lessonNo }, { $addToSet: { vocabulary: vocabulary } }, { new: true });
    // console.log(res);
    return res;
});
// delete vocabulary
const deleteVoc = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield Lesson_model_1.Lesson.updateOne({ _id: data === null || data === void 0 ? void 0 : data.lessonId }, { $pull: { vocabulary: { _id: data === null || data === void 0 ? void 0 : data.vocabularyId } } }, { new: true });
    return res;
});
// update vocabulary
// const updateVoc = async (data: any) => {
//   const lessonId = new mongoose.Types.ObjectId(data?.lessonId);
//   const vocId = new mongoose.Types.ObjectId(data?.vocId);
//   const updateData = data?.data;
//   //   console.log(lessonId,vocId,updateData);
// // console.log("-->",data);
// // data-->
// //  lessonId: '6759e3cc50dcb60fb6c24351',
// // vocId: '675b0f523bffdec7eb89ef8d',
// // data: {
// //   word: 'こんにちは',
// //   pronunciation: 'Konnichiwas',
// //   meaning: 'Hello',
// //   whenToSay: 'Used as a daytime greeting',
// //   LessonNo: '2'
// // }
// // }
// if (data?.data?.LessonNo) {
// const find =await Lesson.findOne({_id:data?.lesson ,vocabulary._id:vocId})
//   // const res = await Lesson.updateOne(
//   //   { _id: data?.lessonId },
//   //   { $pull: { vocabulary: { _id: data?.vocId } } },
//   //   { new: true }
//   // );
//   // if (res) {
//   //   const res = await Lesson.updateOne(
//   //     { lessonNumber: data?.lessonNo },
//   //     { $addToSet: { vocabulary: vocabulary } },
//   //     { new: true }
//   //   );
//   // }
// }
//   const res = await Lesson.updateOne(
//     { _id: lessonId, "vocabulary._id": vocId },
//     {
//       $set: {
//         "vocabulary.$": updateData,
//       },
//     },
//     { new: true }
//   );
//   return res;
// };
const updateVoc = (data) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const lessonId = data === null || data === void 0 ? void 0 : data.lessonId;
    const vocId = data === null || data === void 0 ? void 0 : data.vocId;
    const updateData = data === null || data === void 0 ? void 0 : data.data;
    if ((_a = data === null || data === void 0 ? void 0 : data.data) === null || _a === void 0 ? void 0 : _a.LessonNo) {
        // Check if LessonNo is different
        const currentLesson = yield Lesson_model_1.Lesson.findOne({
            _id: lessonId,
            "vocabulary._id": vocId,
        });
        if (currentLesson && currentLesson.lessonNumber !== data.data.LessonNo) {
            // Remove vocabulary from the current lesson
            yield Lesson_model_1.Lesson.updateOne({ _id: lessonId }, { $pull: { vocabulary: { _id: vocId } } });
            // Add vocabulary to the new lesson
            yield Lesson_model_1.Lesson.updateOne({ lessonNumber: data.data.LessonNo }, { $addToSet: { vocabulary: updateData } });
            return { message: "Vocabulary moved to a new lesson." };
        }
    }
    // Update vocabulary in the same lesson
    const res = yield Lesson_model_1.Lesson.updateOne({ _id: lessonId, "vocabulary._id": vocId }, {
        $set: {
            "vocabulary.$": updateData,
        },
    }, { new: true });
    return res;
});
exports.lessonService = {
    createLesson,
    getSpecificLesson,
    getLesson,
    deleteLesson,
    updateLesson,
    addVoc,
    deleteVoc,
    updateVoc,
};
