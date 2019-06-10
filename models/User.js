const mongoose = require("mongoose");
//  const Schema = mongoose.Schema;
const { Schema } = mongoose; // es2015 destructuring. Upper statement is equivalent

const userSchema = new Schema({
  googleID: String,
  vkID: String,
  githubID: String
});

mongoose.model("users", userSchema);
