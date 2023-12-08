import express from "express";
import { createQuestions, getQuestionByQId, deleteQuestionByQId } from "../controllers/questionController.js";

const router = express.Router();

router.route('/')
    .post(createQuestions) // Create a new question
    .get(getQuestionByQId) // Get a question by q_id
    .delete(deleteQuestionByQId);

export default router;