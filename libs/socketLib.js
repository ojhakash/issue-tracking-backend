/**
 * modules dependencies.
 */
const socketIO = require("socket.io");
// const mongoose = require("mongoose");
// const shortid = require("shortid");
// const logger = require("./loggerLib.js");
// const WatcherModel = mongoose.model("Watcher");
const events = require("events");
// const auth = require("./../app/middlewares/auth");
const eventEmitter = new events.EventEmitter();

exports.setServer = io => {
    // let io = socketIO(server);

    io.on("connection", function(socket) {
        console.log("user connected", socket.id);

        socket.on("join", async data => {
            console.log(data);

            socket.join(data.userId); // We are using room of socket io
            io.to(data.userId).emit("new_notification", {
                msg: "hi there" + data.userId
            });
        });
        socket.on("new", function(data) {
            console.log("message from new", data);
        });
    });
};

exports.sendNotificationMessage = io => {
    // let io = socketIO(server);

    io.on("connection", function(socket) {
        socket.on("new", function(data) {
            console.log("message from new", data);
        });
    });
};

// database operations are kept outside of socket.io code.

// saving chats to database.
// eventEmitter.on("save-chat", data => {
//     // let today = Date.now();

//     let newChat = new ChatModel({
//         chatId: data.chatId,
//         senderName: data.senderName,
//         senderId: data.senderId,
//         receiverName: data.receiverName || "",
//         receiverId: data.receiverId || "",
//         message: data.message,
//         chatRoom: data.chatRoom || "",
//         createdOn: data.createdOn
//     });

//     newChat.save((err, result) => {
//         if (err) {
//             console.log(`error occurred: ${err}`);
//         } else if (result == undefined || result == null || result == "") {
//             console.log("Chat Is Not Saved.");
//         } else {
//             console.log("Chat Saved.");
//             console.log(result);
//         }
//     });
// }); // end of saving chat.

///redis code

module.exports = {
    setServer
};
