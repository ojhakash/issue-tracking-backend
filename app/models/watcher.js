const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const time = require("../libs/timeLib");

const Watcher = new Schema({
    watcherId: {
        type: String
    },
    issue: {
        type: String
    },
    watcher: {
        type: String
    },
    watcherAddedTime: {
        type: Date,
        default: time.now()
    }
});

module.exports = mongoose.model("Watcher", Watcher);
