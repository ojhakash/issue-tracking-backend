const express = require("express");
const router = express.Router();
const issueController = require("../controllers/issue.controller");
const appConfig = require("./../../config/appConfig");
const auth = require("./../middlewares/auth");

module.exports.setRouter = app => {
    let baseUrl = `${appConfig.apiVersion}/issue`;

    app.post(`${baseUrl}/add`, auth.isAuthorized, issueController.addIssue);
    app.get(`${baseUrl}/all`, auth.isAuthorized, issueController.getAllIssues);
    app.get(
        `${baseUrl}/filtered`,
        auth.isAuthorized,
        issueController.getFilteredIssues
    );
    app.get(
        `${baseUrl}/:issueId`,
        auth.isAuthorized,
        issueController.getSingleIssue
    );
    app.put(
        `${baseUrl}/:issueId/edit`,
        auth.isAuthorized,
        issueController.editIssue
    );

    app.delete(
        `${baseUrl}/:issueId/delete`,
        auth.isAuthorized,
        issueController.removeIssue
    );
};
