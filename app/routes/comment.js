const express = require("express");
const router = express.Router();
const commentController = require("../controllers/comment.controller");
const appConfig = require("./../../config/appConfig");
const auth = require("./../middlewares/auth");

module.exports.setRouter = app => {
    let baseUrl = `${appConfig.apiVersion}/comment`;

    app.post(`${baseUrl}/add`, auth.isAuthorized, commentController.addComment);
    app.get(
        `${baseUrl}/:issueId/all`,
        auth.isAuthorized,
        commentController.getAllComments
    );
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

    app.delete(
        `${baseUrl}/:commentId/remove`,
        auth.isAuthorized,
        commentController.removeComment
    );
};
