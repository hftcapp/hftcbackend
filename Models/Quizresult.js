const mongoose = require("mongoose");
// const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const quizResultSchema = new Schema({
  result: { type: Number, required: true },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  answers: { type: Array, required: true },
  created: {
    type: Date,
    default: Date.now,
  },
});

// userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Quizresult", quizResultSchema);
