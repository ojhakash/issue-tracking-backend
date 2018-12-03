const mongoose = require("mongoose");
const logger = require("./../libs/loggerLib");
const response = require("./../libs/responseLib");

const UserModel = mongoose.model("User");
const IssueModel = mongoose.model("Issue");

let getMongoIdOfUser = userId => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await UserModel.findOne({ userId })
                .select("-password -__v")
                .lean();
            logger.info(user);
            if (!user) {
                let apiResponse = response.generate(
                    true,
                    "user not found",
                    404,
                    null
                );
                reject(apiResponse);
            }
            resolve(user._id);
        } catch (e) {
            reject(e);
        }
    });
};

let getMongoIdOfIssue = issueId => {
    return new Promise(async (resolve, reject) => {
        try {
            let issue = await IssueModel.findOne({ issueId })
                .select("_id")
                .lean();
            logger.info(issue);
            if (!issue) {
                let apiResponse = response.generate(
                    true,
                    "issue not found",
                    404,
                    null
                );
                reject(apiResponse);
            }
            resolve(issue._id);
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    getMongoIdOfUser,
    getMongoIdOfIssue
};
