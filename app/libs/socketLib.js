/**
 * modules dependencies.
 */
const socketio = require("socket.io");
const mongoose = require("mongoose");
const shortid = require("shortid");
const logger = require("./loggerLib.js");
const events = require("events");
const eventEmitter = require("./eventLib");

const tokenLib = require("./tokenLib.js");
const check = require("./checkLib.js");
const response = require("./responseLib");
// const ChatModel = mongoose.model("Chat");
const NotificationModel = require("../models/Notification");

// const redisLib = require("./redisLib.js");

let setServer = server => {
    //let allOnlineUsers = []
    let io = socketio.listen(server);
    eventEmitter.addListener(
        "connection",
        (watchers, notification, issueId) => {
            console.log(watchers, notification, issueId);

            for (watcher of watchers) {
                console.log(watcher);

                io.to(watcher.watcher).emit("notification", {
                    notification,
                    issueId
                });

                eventEmitter.emit("save-notification", {
                    notification,
                    watcher,
                    issueId
                });
            }
        }
    );

    io.on("connection", socket => {
        console.log("on connection--emitting verify user");

        socket.emit("verifyUser", "");

        // code to verify the user and make him online

        socket.on("set-user", data => {
            console.log("set-user", data);

            socket.join(data.userId); // We are using room of socket io
        }); // end of listening set-user event

        socket.on("disconnect", () => {
            // disconnect the user from socket
            // remove the user from online list
            // unsubscribe the user from his own channel

            console.log("user is disconnected");
            // console.log(socket.connectorName);
            console.log(socket.userId);

            // var removeIndex = allOnlineUsers.map(function (user) { return user.userId; }).indexOf(socket.userId);
            // allOnlineUsers.splice(removeIndex, 1)
            // console.log(allOnlineUsers)

            if (socket.userId) {
                redisLib.deleteUserFromHash("onlineUsers", socket.userId);
                redisLib.getAllUsersInAHash("onlineUsers", (err, result) => {
                    if (err) {
                        console.log(err);
                    } else {
                        socket.leave(socket.room);
                        socket
                            .to(socket.room)
                            .broadcast.emit("online-user-list", result);
                    }
                });
            }
        }); // end of on disconnect
    });

    // io.sockets.in(userId).emit("new_notification", { msg });
};

// database operations are kept outside of socket.io code.

// saving notifications to database.
eventEmitter.on("save-notification", data => {
    let newNotification = new NotificationModel({
        notificationId: shortid.generate(),
        notification: data.notification,
        userId: data.watcher.watcher,
        issueId: data.issueId
    });

    newNotification.save((err, result) => {
        if (err) {
            console.log(`error occurred: ${err}`);
        } else if (result == undefined || result == null || result == "") {
            console.log("Notification Is Not Saved.");
        } else {
            console.log("Notification Saved.");
            console.log(result);
        }
    });
}); // end of saving notification.

module.exports = {
    setServer: setServer
};
