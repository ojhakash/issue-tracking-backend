const express = require("express");
const router = express.Router();
const commentController = require("../controllers/comment.controller");
const appConfig = require("./../../config/appConfig");
const auth = require("./../middlewares/auth");

module.exports.setRouter = app => {
    let baseUrl = `${appConfig.apiVersion}/comment`;

    // params: authToken,issueId.

    /**
     * @apiGroup comment
     * @apiVersion  1.0.0
     * @api {post} /api/v1/watcher/add api for add comment.
     *
     * @apiParam {authToken} string authToken of the user. (body params) (required)
     * @apiParam {comment} string comment to be added. (body params) (required)
     * @apiParam {issueId} string issueId to be added. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, data.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "Sucessfully added the comment",
            "status": 200,
            "data": {
                "commentId": "0GcUkpFEA",
                "comment": "it's just a alot comment",
                "issue": "6VtFkzpcn",
                "commentedBy": "5c03b14c4d98b205d3fa971f"
            }
        }
    */

    app.post(`${baseUrl}/add`, auth.isAuthorized, commentController.addComment);

    // params: authToken,issueId.

    /**
     * @apiGroup comment
     * @apiVersion  1.0.0
     * @api {get} /api/v1/comment/:issueId/all api for get all comments belong to a issue.
     *
     * @apiParam {authToken} string authToken of the user. (query params) (required)
     * @apiParam {issueId} issueId issueId of the issue to be watched. (url params) (required)
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

    app.get(
        `${baseUrl}/:issueId/all`,
        auth.isAuthorized,
        commentController.getAllComments
    );

    /**
     * @apiGroup comment
     * @apiVersion  1.0.0
     * @api {delete} /api/v1/comment/:commentId/remove api for get all comments belong to a issue.
     *
     * @apiParam {authToken} string authToken of the user. (query params) (required)
     * @apiParam {commentId} commentId commentId of the issue to be watched. (url params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, data.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "Successfully remove the Comment",
            "status": 200,
            "data": {
                "commentId": "IU318PYxL",
                "comment": "comment 4",
                "issue": "6VtFkzpcn",
                "commentedBy": "5c03b14c4d98b205d3fa971f"
            }
        }
    */

    app.delete(
        `${baseUrl}/:commentId/remove`,
        auth.isAuthorized,
        commentController.removeComment
    );

    //unused routes
    app.get(
        `${baseUrl}/:commentId`,
        auth.isAuthorized,
        commentController.getSingleComment
    );
    app.put(
        `${baseUrl}/:commentId/edit`,
        auth.isAuthorized,
        commentController.editComment
    );
};
