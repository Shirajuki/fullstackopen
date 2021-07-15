const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: String,
  url: { type: String, required: true },
  likes: Number,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

blogSchema.set("toJSON", {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
blogSchema.plugin(uniqueValidator);
const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
