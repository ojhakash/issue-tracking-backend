"use strict";
/**
 * Module Dependencies
 */
const mongoose = require("mongoose");
const _ = require("lodash");

const { User } = require("./User");
const { Issue } = require("./Issue");

let CommentSchema = new mongoose.Schema({
    commentId: {
        type: String,
        unique: true
    },
    comment: {
        type: String,
        required: "comment can't be null"
    },
    issue: {
        type: String,
        required: "issue field can't be empty"
    },
    commentedBy: {
        type: mongoose.Schema.ObjectId,
        required: "commentedBy field can't be empty",
        ref: "User"
    },
    createdAt: {
        type: Date,
        default: ""
    }
});

CommentSchema.methods.toJSON = function() {
    let Comment = this;
    let CommentObject = Comment.toObject();
    return _.pick(CommentObject, [
        "commentId",
        "comment",
        "issue",
        "commentedBy"
    ]);
};

let Comment = mongoose.model("Comment", CommentSchema);

module.exports = { Comment };
