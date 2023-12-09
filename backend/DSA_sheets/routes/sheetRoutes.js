import express from "express";
import { getSheets, createSheet, removeSheet } from "../controllers/sheetController.js";
import { addQuestions, removeQuestion } from "../controllers/sheetController.js";
// import { fetchAllQuestions, checkQuestionForUser, getUserSolved } from "../controllers/fetchController.js";
// import { addBookmark, removeBookmark } from "../controllers/bookmarkController.js";
// import { addUID } from "../../users/middlewares/authMiddleware.js";

const router = express.Router();

// router.use("/user", addUID);

router.route("/")
    .post(createSheet) // Create a new sheet
    .get(getSheets) // Get all sheets
    .delete(removeSheet); // Delete a sheet

router.route("/question")
    .post(addQuestions) // Add questions to a sheet
    .delete(removeQuestion); // Remove questions from a sheet


// router.get("/user/solved", getUserSolved);
// router.put("/user/fetchAll", fetchAllQuestions);
// router.patch("/user/check", checkQuestionForUser);
// router.route("/user/bookmarks")
//     .post(addBookmark)
//     .delete(removeBookmark);

export default router;