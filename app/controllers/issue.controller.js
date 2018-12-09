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

// models
const IssueModel = mongoose.model("Issue");
const UserModel = mongoose.model("User");
const WatcherModel = mongoose.model("Watcher");

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

        let watcher = new WatcherModel({
            watcherId: shortid.generate(),
            watcher: req.body.assignedTo,
            issue: issue.issueId,
            watcherAddedTime: time.now()
        });

        watcher = await watcher.save();

        if (!watcher) {
            let apiResponse = response.generate(
                true,
                "Failed to add watcher",
                400,
                null
            );
            res.send(apiResponse);
        }

        watcher = new WatcherModel({
            watcherId: shortid.generate(),
            watcher: req.user.userId,
            issue: issue.issueId,
            watcherAddedTime: time.now()
        });

        watcher = await watcher.save();

        if (!watcher) {
            let apiResponse = response.generate(
                true,
                "Failed to add watcher",
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
exports.getAllIssues = async (req, res) => {
    try {
        let skipIssueNumber = (req.params.pageNo - 1) * 20;
        let loggedInUser = await getMongoIdOfUser(req.user.userId);
        console.log("loggedInUser", loggedInUser);

        const totalIssues = await IssueModel.countDocuments({
            assignedTo: loggedInUser
        });
        const totalPages = Math.ceil(totalIssues / 20);
        IssueModel.find({ assignedTo: loggedInUser })
            .populate({ path: "assignedTo", select: "-_id firstName lastName" })
            .populate({ path: "reportedBy", select: "-_id firstName lastName" })
            .select(" -__v -_id")
            .lean()
            .skip(skipIssueNumber)
            .limit(20)
            .exec((err, result) => {
                if (err) {
                    logger.error(
                        err.message,
                        "Issue Controller: getAllIssue",
                        3
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
                        "Issue Controller: getAllIssue"
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
                        "All Issue Details Found",
                        200,
                        result
                    );
                    res.send({ ...apiResponse, totalPages, totalIssues });
                }
            });
    } catch (error) {
        let apiResponse = response.generate(
            true,
            "Failed to create new issue",
            400,
            error
        );
        res.send(apiResponse);
    }
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
exports.getFilteredIssues = async (req, res) => {
    let skipIssueNumber = (req.params.pageNo - 1) * 20;

    const regex = new RegExp(req.query.title, "i");
    const query = {};
    query.title = regex;
    if (req.query.status && req.query.status !== "") {
        query.status = req.query.status;
    }
    if (req.query.createdAt && req.query.createdAt !== "") {
        query.createdAt = req.query.createdAt;
    }
    if (req.query.reporterId && req.query.reporterId !== "null") {
        let reporterId = await getMongoIdOfUser(req.query.reporterId);
        if (reporterId) query.reportedBy = reporterId;
    }

    const totalIssues = await IssueModel.countDocuments(query);
    const totalPages = Math.ceil(totalIssues / 20);

    IssueModel.find(query)
        .populate({ path: "assignedTo", select: "-_id firstName lastName" })
        .populate({ path: "reportedBy", select: "-_id firstName lastName" })
        .select(" -__v -_id")
        .lean()
        .skip(skipIssueNumber)
        .limit(20)
        .exec((err, result) => {
            if (err) {
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
                res.send({ ...apiResponse, totalIssues, totalPages });
            }
        });
}; // end get filtered issues

exports.editIssue = async (req, res) => {
    try {
        let options = req.body;
        let assignedTo = await getMongoIdOfUser(req.body.assignedTo);
        let watchers = await WatcherModel.find({ issue: req.params.issueId });
        let issue = await IssueModel.findOne({ issueId: req.params.issueId });

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
                eventEmitter.emit(
                    "connection",
                    watchers,
                    `issue named ${issue.title} gets updated`,
                    req.params.issueId
                );

                let apiResponse = response.generate(
                    false,
                    "Successfully updated the issue.",
                    200,
                    result
                );
                res.send(apiResponse);
            }
        }); // end issue model update
    } catch (error) {
        let apiResponse = response.generate(
            true,
            error.message || "Failed in editing issue",
            400,
            error
        );
        res.send(apiResponse);
    }
}; // end edit issue

exports.removeIssue = async (req, res) => {
    try {
        let issue = await IssueModel.findOne({ issueId: req.params.issueId });
        let watchers = await WatcherModel.find({ issue: req.params.issueId });
        if (!issue) {
            throw { message: "No issue found" };
        }
        await issue.remove();
        let apiResponse = response.generate(
            false,
            "Successfully remove this issue",
            200,
            issue
        );
        res.send(apiResponse);

        eventEmitter.emit(
            "connection",
            watchers,
            `Remove issue named ${issue.title}`,
            req.params.issueId
        );
    } catch (error) {
        logger.error(error, "Issue Controller:removeIssue", 10);
        let apiResponse = response.generate(
            true,
            error.message || "Failed in removing issue",
            400,
            error
        );
        res.send(apiResponse);
    }
};
