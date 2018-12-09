const mongoose = require("mongoose");
const shortid = require("shortid");
const time = require("../libs/timeLib");
const response = require("../libs/responseLib");
const logger = require("../libs/loggerLib");
const validateInput = require("../libs/paramsValidationLib");
const check = require("../libs/checkLib");
const token = require("../libs/tokenLib");
const { getMongoIdOfUser } = require("../middlewares/mongoId");
const eventEmitter = require("../libs/eventLib");
const NotificationModel = mongoose.model("Notification");
const WatcherModel = mongoose.model("Watcher");

exports.addNotification = async (req, res) => {
    try {
        let watchers = await WatcherModel.find({ issue: req.issueId });
        await eventEmitter.emit(
            "connection",
            watchers,
            req.notification,
            req.userId
        );
        let notification;
        for (watcher of watchers) {
            notification = new NotificationModel({
                notificationId: shortid.generate(),
                notification: req.notification,
                userId: watcher.watcher,
                issueId: req.issueId,
                notificationAddedTime: time.now()
            });
            notification = await notification.save();
        }

        if (!notification) {
            throw { message: "Error while saving notification" };
        }

        let apiResponse = response.generate(
            false,
            "Sucessfully added the notification",
            200,
            req.issue
        );
        res.send({
            ...apiResponse,
            message: req.sendingMessage
        });
    } catch (e) {
        console.log("error", e);

        let apiResponse = response.generate(
            true,
            "Failed to create new notification",
            400,
            e
        );
        res.send(apiResponse);
    }
};

exports.getNotification = async (req, res) => {
    try {
        let notifications = await NotificationModel.find({
            userId: req.user.userId
        }).limit(30);

        if (!notifications) {
            let apiResponse = response.generate(
                true,
                "No Notifications Found",
                404,
                null
            );
            res.send(apiResponse);
        } else {
            let apiResponse = response.generate(
                false,
                "All Notification Details Found",
                200,
                notifications
            );
            res.send({ ...apiResponse });
        }
    } catch (error) {
        console.log("error", e);

        let apiResponse = response.generate(
            true,
            "Failed to fecth notification",
            400,
            e
        );
        res.send(apiResponse);
    }
};
