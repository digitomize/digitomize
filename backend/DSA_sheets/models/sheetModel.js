// sheetModel.js
import mongoose from "mongoose";

const sheetSchema = new mongoose.Schema({
  name: String,
  s_id: String,
  desc: String,
  questions: [String], // Array of question IDs
});

const SheetModel = mongoose.model("Sheet", sheetSchema);

export default SheetModel;
