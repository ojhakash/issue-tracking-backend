const express = require("express");
const router = express.Router();
const issueController = require("../controllers/issue.controller");
const notificationController = require("../controllers/notification.controller");
const appConfig = require("./../../config/appConfig");
const auth = require("./../middlewares/auth");

module.exports.setRouter = app => {
    let baseUrl = `${appConfig.apiVersion}/issue`;

    // params: authToken,description,title,assignedTo.

    /**
     * @apiGroup issue
     * @apiVersion  1.0.0
     * @api {post} /api/v1/issue/add api for add issue.
     *
     * @apiParam {authToken} string authToken of the user. (body params) (required)
     * @apiParam {title} string title of issue . (body params) (required)
     * @apiParam {description} html description of the description. (body params) (required)
     * @apiParam {assignedTo} userId userId of the user to whome the issue is assigned. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, data.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "Sucessfully added the issue",
            "status": 200,
            "data": {
                "issueId": "-I-1lKsdI",
                "title": "xzcxvcb",
                "assignedTo": "5c03b14c4d98b205d3fa971f",
                "reportedBy": "5c03b14c4d98b205d3fa971f",
                "status": "inProgress"
            }
        }
    */

    app.post(`${baseUrl}/add`, auth.isAuthorized, issueController.addIssue);

    // params: authToken,pageNo.

    /**
     * @apiGroup issue
     * @apiVersion  1.0.0
     * @api {get} /api/v1/issue/all/:pageNo api for add issue.
     *
     * @apiParam {authToken} string authToken of the user. (query params) (required)
     * @apiParam {pageNo} number pageNo of issue . (url params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, data.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "All Issue Details Found",
            "status": 200,
            "data": [
                {
                    "description": "<p><span style=\"color:red;\">Hello</span>, world! i &#39;m there my bug</p>",
                    "status": "done",
                    "createdAt": "2018-12-02T10:18:11.000Z",
                    "issueId": "wfyJR2mJh",
                    "title": "asfsdgh",
                    "reportedBy": {
                        "firstName": "Akash",
                        "lastName": "Ojha"
                    },
                    "assignedTo": {
                        "firstName": "Akash",
                        "lastName": "Ojha"
                    }
                },
                {
                    "description": "<p><span style=\"color:red;\">Hello</span>, world!</p>",
                    "status": "inProgress",
                    "createdAt": "2018-12-02T11:40:58.000Z",
                    "issueId": "3cKJvM5MY",
                    "title": "asfsdgh",
                    "reportedBy": {
                        "firstName": "Akash",
                        "lastName": "Ojha"
                    },
                    "assignedTo": {
                        "firstName": "Akash",
                        "lastName": "Ojha"
                    }
                }]
            }
    */

    app.get(
        `${baseUrl}/all/:pageNo`,
        auth.isAuthorized,
        issueController.getAllIssues
    );

    // params: authToken,pageNo,title,status,reporterId.

    /**
     * @apiGroup issue
     * @apiVersion  1.0.0
     * @api {get} /api/v1/issue/all/:pageNo api for add issue.
     *
     * @apiParam {authToken} string authToken of the user. (query params) (required)
     * @apiParam {pageNo} number pageNo of issue . (url params) (required)
     * @apiParam {title} number title of issue . (query params) (required)
     * @apiParam {status} number status of issue . (query params) (required)
     * @apiParam {reporterId} number reporterId of issue . (query params) (required)
     * 
     * @apiSuccess {object} myResponse shows error status, message, http status code, data.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "All Issue Details Found",
            "status": 200,
            "data": [
                {
                    "description": "<p><span style=\"color:red;\">Hello</span>, world! i &#39;m there my bug</p>",
                    "status": "done",
                    "createdAt": "2018-12-02T10:18:11.000Z",
                    "issueId": "wfyJR2mJh",
                    "title": "asfsdgh",
                    "reportedBy": {
                        "firstName": "Akash",
                        "lastName": "Ojha"
                    },
                    "assignedTo": {
                        "firstName": "Akash",
                        "lastName": "Ojha"
                    }
                },
                {
                    "description": "<p><span style=\"color:red;\">Hello</span>, world!</p>",
                    "status": "inProgress",
                    "createdAt": "2018-12-02T11:40:58.000Z",
                    "issueId": "3cKJvM5MY",
                    "title": "asfsdgh",
                    "reportedBy": {
                        "firstName": "Akash",
                        "lastName": "Ojha"
                    },
                    "assignedTo": {
                        "firstName": "Akash",
                        "lastName": "Ojha"
                    }
                }]
            }
    */

    app.get(
        `${baseUrl}/filtered/:pageNo`,
        auth.isAuthorized,
        issueController.getFilteredIssues
    );

    /**
     * @apiGroup issue
     * @apiVersion  1.0.0
     * @api {get} /api/v1/issue/:issueId api for get single issue.
     *
     * @apiParam {authToken} string authToken of the user. (query params) (required)
     * @apiParam {issueId} string issueId of the user. (url params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, data.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "Issue Details Found",
            "status": 200,
            "data": 
                {
                    "description": "<p><span style=\"color:red;\">Hello</span>, world! i &#39;m there my bug</p>",
                    "status": "done",
                    "createdAt": "2018-12-02T10:18:11.000Z",
                    "issueId": "wfyJR2mJh",
                    "title": "asfsdgh",
                    "reportedBy": {
                        "firstName": "Akash",
                        "lastName": "Ojha"
                    },
                    "assignedTo": {
                        "firstName": "Akash",
                        "lastName": "Ojha"
                    }
                }
            }
    */

    app.get(
        `${baseUrl}/:issueId`,
        auth.isAuthorized,
        issueController.getSingleIssue
    );

    /**
     * @apiGroup issue
     * @apiVersion  1.0.0
     * @api {put} /api/v1/issue/:issueId/edit api for get single issue.
     *
     * @apiParam {authToken} string authToken of the user. (body params) (required)
     * @apiParam {title} string title of issue . (body params) (optional)
     * @apiParam {description} html description of the description. (body params) (optional)
     * @apiParam {assignedTo} userId userId of the user to whome the issue is assigned. (body params) (optional)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, data.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "Sucessfully added the issue",
            "status": 200,
            "data": {
                "issueId": "-I-1lKsdI",
                "title": "xzcxvcb",
                "assignedTo": "5c03b14c4d98b205d3fa971f",
                "reportedBy": "5c03b14c4d98b205d3fa971f",
                "status": "inProgress"
            }
        }
    */

    app.put(
        `${baseUrl}/:issueId/edit`,
        auth.isAuthorized,
        issueController.editIssue,
        notificationController.addNotification
    );

    /**
     * @apiGroup issue
     * @apiVersion  1.0.0
     * @api {delete} /api/v1/issue/:issueId/remove api for get single issue.
     *
     * @apiParam {authToken} string authToken of the user. (query params) (required)
     * @apiParam {issueId} string issueId of the user. (url params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, data.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "Issue details updated",
            "status": 200,
            "data": 
                {
                    "description": "<p><span style=\"color:red;\">Hello</span>, world! i &#39;m there my bug</p>",
                    "status": "done",
                    "createdAt": "2018-12-02T10:18:11.000Z",
                    "issueId": "wfyJR2mJh",
                    "title": "asfsdgh",
                    "reportedBy": {
                        "firstName": "Akash",
                        "lastName": "Ojha"
                    },
                    "assignedTo": {
                        "firstName": "Akash",
                        "lastName": "Ojha"
                    }
                }
            }
    */

    app.delete(
        `${baseUrl}/:issueId/remove`,
        auth.isAuthorized,
        issueController.removeIssue
    );
};
