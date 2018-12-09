const express = require("express");
const router = express.Router();
const watcherController = require("../controllers/watcher.controller");
const appConfig = require("./../../config/appConfig");
const auth = require("./../middlewares/auth");

module.exports.setRouter = app => {
    let baseUrl = `${appConfig.apiVersion}/watcher`;

    // params: authToken,issueId.

    /**
     * @apiGroup watcher
     * @apiVersion  1.0.0
     * @api {post} /api/v1/watcher/add api for user add watcher.
     *
     * @apiParam {authToken} string authToken of the user. (body params) (required)
     * @apiParam {issueId} issueId issueId of the issue to be watched. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, data.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "Sucessfully added the issue",
            "status": 200,
            "data": {
                "watcherAddedTime": "2018-12-07T15:29:03.000Z",
                "_id": "5c0a91bf86dd5204a320e6ae",
                "watcherId": "iC8xT7yP3",
                "watcher": "_3kGgiCCB",
                "issue": "6VtFkzpcn",
                "__v": 0
            }
        }
    */

    app.post(`${baseUrl}/add`, auth.isAuthorized, watcherController.addWatcher);

    // params: authToken,issueId.

    /**
     * @apiGroup watcher
     * @apiVersion  1.0.0
     * @api {get} /api/v1/watcher/:issueId api for check user is watcher.
     *
     * @apiParam {authToken} string authToken of the user. (body params) (required)
     * @apiParam {issueId} issueId issueId of the issue to be watched. (url params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, data.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "Sucessfully verify the watcher",
            "status": 200,
            "data": {
                "watcherAddedTime": "2018-12-07T15:29:03.000Z",
                "_id": "5c0a91bf86dd5204a320e6ae",
                "watcherId": "iC8xT7yP3",
                "watcher": "_3kGgiCCB",
                "issue": "6VtFkzpcn",
                "__v": 0
            }
        }
    */

    app.get(
        `${baseUrl}/checkifwatcher/:issueId`,
        auth.isAuthorized,
        watcherController.checkIfUser
    );

    // params: authToken,issueId.

    /**
     * @apiGroup watcher
     * @apiVersion  1.0.0
     * @api {delete} /api/v1/watcher/remove/:issueId api for unfollow a issue.
     *
     * @apiParam {authToken} string authToken of the user. (body params) (required)
     * @apiParam {issueId} issueId issueId of the issue to be watched. (url params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, data.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "Successfully unfollow this issue",
            "status": 200,
            "data": {
                "watcherAddedTime": "2018-12-07T15:29:03.000Z",
                "_id": "5c0a91bf86dd5204a320e6ae",
                "watcherId": "iC8xT7yP3",
                "watcher": "_3kGgiCCB",
                "issue": "6VtFkzpcn",
                "__v": 0
            }
        }
    */

    app.delete(
        `${baseUrl}/remove/:issueId`,
        auth.isAuthorized,
        watcherController.removeUser
    );
};
