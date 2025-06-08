const mongoose = require("mongoose");
const mapComments = require("./mapComments");

module.exports = function (post) {
  return {
    id: post.id,
    title: post.title,
    imageUrl: post.image,
    content: post.content,
    comments: post.comments.map((comment) =>
      mongoose.isObjectIdOrHexString(comment) ? comment : mapComments(comment)
    ),
    publishedAt: post.createdAt,
  };
};
