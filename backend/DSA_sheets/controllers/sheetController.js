// sheetController.js
import SheetModel from "../models/sheetModel.js";
import { getQuestionByQId } from "./questionController.js";

// Controller function to create a new sheet
export const createSheet = async (req, res) => {
  try {
    // Extract sheet data from the request body
    const { name, s_id, desc, questions } = req.body;

    // Validate required fields
    if (!name || !s_id || !desc || !questions) {
      return res.status(400).json({
        error: "Bad Request",
        message:
          "Missing required fields. Please provide name, s_id, desc, and questions.",
      });
    }

    // Create a new sheet instance
    const newSheet = new SheetModel({
      name,
      s_id,
      desc,
      questions,
    });

    // Save the new sheet to the database
    const savedSheet = await newSheet.save();

    // Send the saved sheet in the response
    res.status(201).json(savedSheet);
  } catch (error) {
    // Log the error for developers
    console.error("Error creating sheet:", error);

    // Send an error response with an error object
    res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred. Please try again later.",
    });
  }
};

export const removeSheet = async (req, res) => {
  try {
    const { s_id } = req.body;

    // Validate required fields
    if (!s_id) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Missing required fields. Please provide s_id.",
      });
    }

    // Find the sheet by s_id
    const sheet = await SheetModel.findOne({ s_id });

    // Check if the sheet was found
    if (!sheet) {
      return res.status(404).json({
        error: "Not Found",
        message: "Sheet not found.",
      });
    }

    // Remove the sheet from the database
    await SheetModel.deleteOne({ s_id });

    // Return a success response
    res.status(200).json({
      status: "success",
      message: "Sheet removed successfully.",
    });
  } catch (error) {
    console.error("Error removing sheet:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred. Please try again later.",
    });
  }
};

export const getSheets = async (req, res) => {
  try {
    const sheets = await SheetModel.find();

    const sheetsWithQuestions = [];

    for (const sheet of sheets) {
      const questionsWithDetails = [];
      console.log(sheet);

      for (const questionId of sheet?.questions) {
        const questionDetails = await getQuestionByQId({
          params: { q_id: questionId },
        });
        questionsWithDetails.push(questionDetails);
      }

      sheetsWithQuestions.push({
        ...sheet.toObject(),
        questions: questionsWithDetails,
      });
    }

    res
      .status(200)
      .json({ count: sheetsWithQuestions.length, sheets: sheetsWithQuestions });
  } catch (error) {
    console.error("Error fetching sheets:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred. Please try again later.",
    });
  }
};

export const addQuestions = async (req, res) => {
  try {
    const { s_id, q_ids } = req.body;

    // Validate required fields
    if (!s_id || !q_ids || !Array.isArray(q_ids) || q_ids.length === 0) {
      return res.status(400).json({
        error: "Bad Request",
        message:
          "Invalid or missing required fields. Please provide s_id and a non-empty array of q_ids.",
      });
    }

    // Find the sheet by s_id
    const sheet = await SheetModel.findOne({ s_id });

    // Check if the sheet was found
    if (!sheet) {
      return res.status(404).json({
        error: "Not Found",
        message: "Sheet not found.",
      });
    }

    // Check if any of the questions are already in the sheet
    const existingQuestions = sheet.questions.filter((existingQId) =>
      q_ids.includes(existingQId),
    );

    if (existingQuestions.length > 0) {
      return res.status(409).json({
        error: "Conflict",
        message: `Questions with the following q_ids already exist in the sheet: ${existingQuestions.join(
          ", ",
        )}.`,
      });
    }

    // Add the new q_ids to the questions array of the sheet
    sheet.questions.push(...q_ids);

    // Save the updated sheet to the database
    await sheet.save();

    // Return a success response with the updated sheet
    res.status(200).json({
      status: "success",
      message: "Questions added to the sheet successfully.",
      sheet,
    });
  } catch (error) {
    console.error("Error adding questions to sheet:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred. Please try again later.",
    });
  }
};

export const removeQuestion = async (req, res) => {
  try {
    const { s_id, q_id } = req.body;

    // Validate required fields
    if (!s_id || !q_id) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Missing required fields. Please provide s_id and q_id.",
      });
    }

    // Find the sheet by s_id
    const sheet = await SheetModel.findOne({ s_id });

    // Check if the sheet was found
    if (!sheet) {
      return res.status(404).json({
        error: "Not Found",
        message: "Sheet not found.",
      });
    }

    // Check if the question is in the sheet's questions array
    const indexOfQuestion = sheet.questions.indexOf(q_id);

    if (indexOfQuestion === -1) {
      return res.status(404).json({
        error: "Not Found",
        message: "Question not found in the sheet.",
      });
    }

    // Remove the question from the questions array of the sheet
    sheet.questions.splice(indexOfQuestion, 1);

    // Save the updated sheet to the database
    await sheet.save();

    // Return a success response with the updated sheet
    res.status(200).json({
      status: "success",
      message: "Question removed from the sheet successfully.",
      sheet,
    });
  } catch (error) {
    console.error("Error removing question from sheet:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred. Please try again later.",
    });
  }
};
