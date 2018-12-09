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
const WatcherModel = mongoose.model("Watcher");

/* Add user as a watcher */
exports.addWatcher = async (req, res) => {
    try {
        const Issue = IssueModel.findOne({ issueId: req.body.issueId });
        let watcher = new WatcherModel({
            watcherId: shortid.generate(),
            watcher: req.user.userId,
            issue: req.body.issueId,
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
            watcher
        );
        res.send(apiResponse);
    } catch (error) {
        logger.error(error, "Wacher Controller:addWacher", 10);
        let apiResponse = response.generate(
            true,
            "Failed in adding Wacher",
            400,
            error
        );
        res.send(apiResponse);
    }
}; /* end of Add user as a watcher */

/* Check if user as a watcher */
exports.checkIfUser = async (req, res) => {
    try {
        let watcher = await WatcherModel.findOne({
            watcher: req.user.userId,
            issue: req.params.issueId
        });

        if (!watcher) {
            throw { message: "No Watcher found" };
        }

        let apiResponse = response.generate(
            false,
            "Sucessfully verify the watcher",
            200,
            watcher
        );
        res.send(apiResponse);
    } catch (error) {
        logger.error(error, "Wacher Controller:checkIfWacher", 10);
        let apiResponse = response.generate(true, "Not a Wacher", 400, error);
        res.send(apiResponse);
    }
};
/* end of Check if user as a watcher */

/* Remove user form folllowing */
exports.removeUser = async (req, res) => {
    try {
        let watcher = await WatcherModel.findOne({
            watcher: req.user.userId,
            issue: req.params.issueId
        });
        if (!watcher) {
            throw { message: "No Watcher found" };
        }
        await watcher.remove();
        let apiResponse = response.generate(
            false,
            "Successfully unfollow this issue",
            200,
            watcher
        );
        res.send(apiResponse);
    } catch (error) {
        logger.error(error, "Wacher Controller:removeWacher", 10);
        let apiResponse = response.generate(
            true,
            "Failed in deleting Wacher",
            400,
            error
        );
        res.send(apiResponse);
    }
};
/* End of Remove user form folllowing */
