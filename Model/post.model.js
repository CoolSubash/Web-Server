const mongoose = require('mongoose')

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    postimage: {
      type: String,
      default: undefined,
    },
    author: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
  },
  { timestamps: true },
)

const Post = mongoose.model('Post', postSchema)

module.exports = Post
