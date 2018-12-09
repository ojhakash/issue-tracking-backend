"use strict";
/**
 * Module Dependencies
 */
const mongoose = require("mongoose");
const _ = require("lodash");

const { User } = require("./User");

let issueSchema = new mongoose.Schema({
    issueId: {
        type: String,
        unique: true
    },
    title: {
        type: String,
        required: "title field can't be empty"
    },
    description: {
        type: String,
        default: ""
    },
    assignedTo: {
        type: mongoose.Schema.ObjectId,
        required: "assignedTo field can't be empty",
        ref: "User"
    },
    reportedBy: {
        type: mongoose.Schema.ObjectId,
        required: "reporter field can't be empty",
        ref: "User"
    },
    status: {
        type: String,
        enum: ["backlog", "inProgress", "inTest", "done"],
        required: "status field can't be empty",
        default: "inProgress"
    },
    createdAt: {
        type: Date,
        default: ""
    },
    watchers: [
        {
            type: String
        }
    ]
});

issueSchema.methods.toJSON = function() {
    let Issue = this;
    let IssueObject = Issue.toObject();
    return _.pick(IssueObject, [
        "issueId",
        "title",
        "assignedTo",
        "reportedBy",
        "status",
        "createdat"
    ]);
};

let Issue = mongoose.model("Issue", issueSchema);

module.exports = { Issue };
