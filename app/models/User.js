"use strict";
/**
 * Module Dependencies
 */
const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
    userId: {
        type: String,
        default: "",
        index: true,
        unique: true
    },
    firstName: {
        type: String,
        required: "firstname is a required field",
        default: ""
    },
    lastName: {
        type: String,
        required: "lastname is a required field",
        default: ""
    },
    password: {
        type: String,
        required: "password is a required field",
        minlength: 8
    },
    email: {
        type: String,
        required: "email is a required field",
        trim: true,
        minlength: 10,
        unique: "email is already registered",
        match: [
            /^([^<>()[\]\\.,;:\s@"]+@[\w.\-]+)(\.[^<>()[\]\\.,;:\s@"]+@[\w.\-]+)*\.([A-Za-z]{2,6})$/,
            "{VALUE} is not a valid email"
        ]
    },
    mobileNumber: {
        type: String,
        required: "mobile number is a required field",
        trim: true,
        minlength: 10,
        unique: "mobile number already in use",
        match: [/^[\d]+$/, "{VALUE} is not a valid mobile number"]
    },
    createdOn: {
        type: Date,
        default: ""
    }
});

mongoose.model("User", userSchema);

let User = mongoose.model("User", userSchema);

module.exports = { User };
