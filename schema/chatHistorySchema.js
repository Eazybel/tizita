const mongoose = require("mongoose");

const historySchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    chats: [
      {
        prompt: { type: String, required: true },
        response: { type: String, required: true },
        timestamp: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const historyModel = mongoose.model("historyModel", historySchema, "historys");
module.exports = historyModel;