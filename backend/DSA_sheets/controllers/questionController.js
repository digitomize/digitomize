// questionController.js
import QuestionModel from "../models/questionModel.js";

// Controller function to create a new question

export const createQuestions = async(req, res) => {
  try {
    const questionsData = req.body;

    // Validate if questionsData is an array and not empty
    if (!Array.isArray(questionsData) || questionsData.length === 0) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Invalid or empty array of questions provided.",
      });
    }

    // Check if any of the provided questions already exists
    const existingQuestions = await QuestionModel.find({
      q_id: { $in: questionsData.map((q) => q.q_id) },
    });

    if (existingQuestions.length > 0) {
      const duplicateQIds = existingQuestions.map((q) => q.q_id);
      return res.status(409).json({
        error: "Conflict",
        message: `Questions with the following q_ids already exist: ${duplicateQIds.join(
          ", ",
        )}.`,
      });
    }

    // Create an array of question instances
    const newQuestions = questionsData.map(
      (question) => new QuestionModel(question),
    );

    // Save the new questions to the database
    const savedQuestions = await QuestionModel.insertMany(newQuestions);

    // Send the saved questions in the response
    res.status(201).json(savedQuestions);
  } catch (error) {
    console.error("Error creating questions:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred. Please try again later.",
    });
  }
};

// Controller function to get a question by q_id
export const getQuestionByQId = async(req, res) => {
  try {
    const { q_id } = req.body;

    // Validate if q_id is provided
    if (!q_id) {
      return res.status(400).json({
        error: "Bad Request",
        message: "q_id is required to get a question.",
      });
    }

    // Find the question by q_id
    const question = await QuestionModel.findOne({ q_id });

    // Check if the question was found
    if (!question) {
      return res.status(404).json({
        error: "Not Found",
        message: "Question not found.",
      });
    }

    // Send the found question in the response
    res.status(200).json(question);
  } catch (error) {
    console.error("Error getting question:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred. Please try again later.",
    });
  }
};

// Controller function to delete a question by q_id
export const deleteQuestionByQId = async(req, res) => {
  try {
    const { q_id } = req.body;

    // Validate if q_id is provided
    if (!q_id) {
      return res.status(400).json({
        error: "Bad Request",
        message: "q_id is required for deletion.",
      });
    }

    // Find the question by q_id and remove it
    const deletedQuestion = await QuestionModel.findOneAndDelete({ q_id });

    // Check if the question was found and deleted
    if (!deletedQuestion) {
      return res.status(404).json({
        error: "Not Found",
        message: "Question not found for deletion.",
      });
    }

    // Return a success response with the deleted question
    res.status(200).json({
      status: "success",
      message: "Question deleted successfully.",
      deletedQuestion,
    });
  } catch (error) {
    console.error("Error deleting question:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred. Please try again later.",
    });
  }
};
