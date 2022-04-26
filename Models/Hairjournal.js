const mongoose = require("mongoose");
// const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const hairJournalSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  list: { type: Array },
});

// userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Hairjournal", hairJournalSchema);
