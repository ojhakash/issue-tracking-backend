const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notification.controller");
const appConfig = require("./../../config/appConfig");
const auth = require("./../middlewares/auth");

module.exports.setRouter = app => {
    let baseUrl = `${appConfig.apiVersion}/notification`;

    // params: authToken.

    /**
     * @apiGroup notification
     * @apiVersion  1.0.0
     * @api {get} /api/v1/notification/all api for get notifications of logged in user.
     *
     * @apiParam {authToken} string authToken of the user. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, data.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "All Notification Details Found",
            "status": 200,
            "data": {
                {
                    issueId: "3cKJvM5MY",
                    notification: "issue named asfsdgh gets updated",
                    notificationAddedTime: "2018-12-09T06:27:55.000Z",
                    notificationId: "Q4tvoFnFtq",
                    userId: "_3kGgiCCB",
                    "__v": 0
                },
                {
                    issueId: "miXRuu1dx",
                    notification: "comment added to the issue named g hjvh",
                    notificationAddedTime: "2018-12-09T06:51:19.000Z",
                    notificationId: "jerJwIbBpr",
                    userId: "_3kGgiCCB",
                    __v: 0
                }
            }
        }
    */
    app.get(
        `${baseUrl}/all`,
        auth.isAuthorized,
        notificationController.getNotification
    );
};
