// questionModel.js
import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  q_id: String,
  name: String,
  difficulty: String,
  topics: [String],
});

const QuestionModel = mongoose.model("Question", questionSchema);

export default QuestionModel;
