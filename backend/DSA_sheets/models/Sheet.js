import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  q_id: String,
  name: String,
  difficulty: String,
  topics: [String],
});

const sheetSchema = new mongoose.Schema({
  name: String,
  s_id: String,
  desc: String,
  questions: [questionSchema],
});

const SheetModel = mongoose.model("Sheet", sheetSchema);

export default SheetModel;
