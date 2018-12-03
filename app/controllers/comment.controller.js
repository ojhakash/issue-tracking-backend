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
const CommentModel = mongoose.model("Comment");

exports.addComment = async (req, res) => {
    try {
        //   this code is for getting user details of of commenter from mongodb
        let commentedBy = await getMongoIdOfUser(req.user.userId);

        let comment = new CommentModel({
            commentId: shortid.generate(),
            comment: req.body.comment,
            issue: req.body.issueId,
            commentedBy,
            createdAt: time.now()
        });

        comment = await comment.save();

        if (!comment) {
            throw { message: "Error while saving" };
        }

        let apiResponse = response.generate(
            false,
            "Sucessfully added the comment",
            200,
            comment
        );
        res.send(apiResponse);
    } catch (e) {
        console.log("error", e);

        let apiResponse = response.generate(
            true,
            "Failed to create new comment",
            400,
            e
        );
        res.send(apiResponse);
    }
};

/* Get all Issue Details */
exports.getAllComments = (req, res) => {
    CommentModel.find({ issue: req.params.issueId })
        .populate({
            path: "commentedBy",
            select: "-_id firstName lastName email"
        })
        .select(" -__v -_id")
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err);
                logger.error(
                    err.message,
                    "Comment Controller: getAllComment",
                    10
                );
                let apiResponse = response.generate(
                    true,
                    "Failed To Find Comment Details",
                    500,
                    null
                );
                res.send(apiResponse);
            } else if (check.isEmpty(result)) {
                logger.info(
                    "No Comment Found",
                    "Comment Controller: getAllComment"
                );
                let apiResponse = response.generate(
                    true,
                    "No Comment Found",
                    404,
                    null
                );
                res.send(apiResponse);
            } else {
                let apiResponse = response.generate(
                    false,
                    "All Comment Details Found",
                    200,
                    result
                );
                res.send(apiResponse);
            }
        });
}; // end get all Comments

/* Get a single comment */
exports.getSingleComment = (req, res) => {
    CommentModel.find({
        issue: req.body.issueId,
        commentId: req.params.commentId
    })
        .populate({ path: "commentedBy", select: "-_id firstName lastName" })
        .select(" -__v -_id")
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err);
                logger.error(
                    err.message,
                    "Comment Controller: getSingleComment",
                    10
                );
                let apiResponse = response.generate(
                    true,
                    "Failed To Find Comment Details",
                    500,
                    null
                );
                res.send(apiResponse);
            } else if (check.isEmpty(result)) {
                logger.info(
                    "No Comment Found",
                    "Comment Controller: getSingleComment"
                );
                let apiResponse = response.generate(
                    true,
                    "No Comment Found",
                    404,
                    null
                );
                res.send(apiResponse);
            } else {
                let apiResponse = response.generate(
                    false,
                    "All Comment Details Found",
                    200,
                    result
                );
                res.send(apiResponse);
            }
        });
}; // end get single Comment

exports.editComment = (req, res) => {
    let options = req.body;
    CommentModel.update({ commentId: req.params.commentId }, options).exec(
        (err, result) => {
            if (err) {
                console.log(err);
                logger.error(err.message, "Comment Controller:editComment", 10);
                let apiResponse = response.generate(
                    true,
                    "Failed To edit Comment details",
                    500,
                    null
                );
                res.send(apiResponse);
            } else if (check.isEmpty(result)) {
                logger.info(
                    "No Comment Found",
                    "Comment Controller: editComment"
                );
                let apiResponse = response.generate(
                    true,
                    "No Comment Found",
                    404,
                    null
                );
                res.send(apiResponse);
            } else {
                let apiResponse = response.generate(
                    false,
                    "Comment details edited",
                    200,
                    result
                );
                res.send(apiResponse);
            }
        }
    ); // end comment model update
}; // end edit comment

//delete comment
exports.removeComment = async (req, res) => {
    try {
        let comment = await CommentModel.findOne({
            commentId: req.params.commentId
        });
        if (!comment) {
            throw { message: "No Comment found" };
        }
        await comment.remove();
        let apiResponse = response.generate(
            false,
            "Successfully remove the Comment",
            200,
            comment
        );
        res.send(apiResponse);
    } catch (error) {
        console.log(error);

        logger.error(error, "Comment Controller:removeComment", 10);
        let apiResponse = response.generate(
            true,
            "Failed in deleting Comment",
            400,
            error
        );
        res.send(apiResponse);
    }
};
