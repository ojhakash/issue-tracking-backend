const mongoose = require("mongoose");
const shortid = require("shortid");
const time = require("../libs/timeLib");
const response = require("../libs/responseLib");
const logger = require("../libs/loggerLib");
const validateInput = require("../libs/paramsValidationLib");
const check = require("../libs/checkLib");
const token = require("../libs/tokenLib");
const { getMongoIdOfUser } = require("../middlewares/mongoId");

// models
const IssueModel = mongoose.model("Issue");
const UserModel = mongoose.model("User");

//add a new blog
exports.addIssue = async (req, res) => {
    try {
        //   this code is for finding assignedto user for giving reference to assignedto in issue
        let assignedTo = await getMongoIdOfUser(req.body.assignedTo);
        let reportedBy = await getMongoIdOfUser(req.user.userId);

        let issue = new IssueModel({
            issueId: shortid.generate(),
            title: req.body.title,
            description: req.body.description,
            reportedBy,
            assignedTo,
            createdAt: time.now()
        });

        console.log(issue);

        issue = await issue.save();

        if (!issue) {
            let apiResponse = response.generate(
                true,
                "Failed to create new issue",
                400,
                null
            );
            res.send(apiResponse);
        }
        let apiResponse = response.generate(
            false,
            "Sucessfully added the issue",
            200,
            issue
        );
        res.send(apiResponse);
    } catch (e) {
        let apiResponse = response.generate(
            true,
            "Failed to create new issue",
            400,
            e
        );
        res.send(apiResponse);
    }
};

/* Get all Issue Details */
exports.getAllIssues = (req, res) => {
    IssueModel.find()
        .populate({ path: "assignedTo", select: "-_id firstName lastName" })
        .populate({ path: "reportedBy", select: "-_id firstName lastName" })
        .select(" -__v -_id")
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err);
                logger.error(err.message, "Issue Controller: getAllIssue", 10);
                let apiResponse = response.generate(
                    true,
                    "Failed To Find Issue Details",
                    500,
                    null
                );
                res.send(apiResponse);
            } else if (check.isEmpty(result)) {
                logger.info("No Issue Found", "Issue Controller: getAllIssue");
                let apiResponse = response.generate(
                    true,
                    "No Issue Found",
                    404,
                    null
                );
                res.send(apiResponse);
            } else {
                let apiResponse = response.generate(
                    false,
                    "All Issue Details Found",
                    200,
                    result
                );
                res.send(apiResponse);
            }
        });
}; // end get all Issues

/* Get Single Issue Details */
exports.getSingleIssue = (req, res) => {
    IssueModel.findOne({ issueId: req.params.issueId })
        .populate({
            path: "assignedTo",
            select: "-_id firstName lastName email"
        })
        .populate({ path: "reportedBy", select: "-_id firstName lastName" })
        .select(" -__v -_id")
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err);
                logger.error(
                    err.message,
                    "Issue Controller: getSingleIssue",
                    10
                );
                let apiResponse = response.generate(
                    true,
                    "Failed To Find Issue Details",
                    500,
                    null
                );
                res.send(apiResponse);
            } else if (check.isEmpty(result)) {
                logger.info(
                    "No Issue Found",
                    "Issue Controller: getSingleIssue"
                );
                let apiResponse = response.generate(
                    true,
                    "No Issue Found",
                    404,
                    null
                );
                res.send(apiResponse);
            } else {
                let apiResponse = response.generate(
                    false,
                    "Issue Details Found",
                    200,
                    result
                );
                res.send(apiResponse);
            }
        });
}; // end get all Issues

/* Get filtered Issue Details */
exports.getFilteredIssues = (req, res) => {
    console.log(req.query);

    const regex = new RegExp(req.query.title, "i");
    const query = {};
    query.title = regex;
    if (req.query.status && req.query.status !== "") {
        query.status = req.query.status;
    }
    if (req.query.createdAt && req.query.createdAt !== "") {
        query.createdAt = req.query.createdAt;
    }
    IssueModel.find(query)
        .populate({ path: "assignedTo", select: "-_id firstName lastName" })
        .populate({ path: "reportedBy", select: "-_id firstName lastName" })
        .select(" -__v -_id")
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err);
                logger.error(err.message, "Issue Controller: getAllIssue", 10);
                let apiResponse = response.generate(
                    true,
                    "Failed To Find Issue Details",
                    500,
                    null
                );
                res.send(apiResponse);
            } else if (check.isEmpty(result)) {
                logger.info("No Issue Found", "Issue Controller: getAllIssue");
                let apiResponse = response.generate(
                    true,
                    "No Issue Found",
                    404,
                    null
                );
                res.send(apiResponse);
            } else {
                let apiResponse = response.generate(
                    false,
                    "All Issue Details Found",
                    200,
                    result
                );
                res.send(apiResponse);
            }
        });
}; // end get filtered issues

exports.editIssue = async (req, res) => {
    let options = req.body;
    let assignedTo = await getMongoIdOfUser(req.body.assignedTo);
    IssueModel.update(
        { issueId: req.params.issueId },
        { ...options, assignedTo }
    ).exec((err, result) => {
        if (err) {
            console.log(err);
            logger.error(err.message, "Issue Controller:editIssue", 10);
            let apiResponse = response.generate(
                true,
                "Failed To edit Issue details",
                500,
                null
            );
            res.send(apiResponse);
        } else if (check.isEmpty(result)) {
            logger.info("No Issue Found", "Issue Controller: editIssue");
            let apiResponse = response.generate(
                true,
                "No Issue Found",
                404,
                null
            );
            res.send(apiResponse);
        } else {
            let apiResponse = response.generate(
                false,
                "Issue details edited",
                200,
                result
            );
            res.send(apiResponse);
        }
    }); // end issue model update
}; // end edit issue

exports.removeIssue = async (req, res) => {
    try {
        let issue = await IssueModel.findOne({ issueId: req.params.issueId });
        if (!issue) {
            throw { message: "No Issue found" };
        }
        await issue.remove();
        let apiResponse = response.generate(
            false,
            "Successfully remove the issue",
            200,
            issue
        );
        res.send(apiResponse);
    } catch (error) {
        logger.error(error, "Issue Controller:removeIssue", 10);
        let apiResponse = response.generate(
            true,
            "Failed in deleting Issue",
            400,
            error
        );
        res.send(apiResponse);
    }
};
