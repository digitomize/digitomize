import express from "express";
import { createQuestions, getQuestionByQId, deleteQuestionByQId } from "../controllers/questionController.js";

const router = express.Router();

router.route('/')
    .post(createQuestions)
    .get(getQuestionByQId)
    .delete(deleteQuestionByQId);

export default router;