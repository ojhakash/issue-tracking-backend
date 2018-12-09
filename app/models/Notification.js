const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const time = require("../libs/timeLib");

const Notification = new Schema({
    notificationId: {
        type: String,
        required: "notificationId is required"
    },
    notification: {
        type: String,
        required: "notification is required"
    },
    userId: {
        type: String,
        required: "userId is required"
    },
    issueId: {
        type: String,
        required: "issueId is required"
    },
    notificationAddedTime: {
        type: Date,
        default: time.now()
    }
});

module.exports = mongoose.model("Notification", Notification);
