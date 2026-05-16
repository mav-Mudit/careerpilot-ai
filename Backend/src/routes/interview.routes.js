const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const interviewController = require("../controllers/interview.controller");
const upload = require("../middlewares/file.middleware");

const interviewRouter = express.Router();

/**
 * @route POST /api/interview
 * @desc generate new interview report on the basis of the provided job description, candidate resume and user self description
 * @access Private
 */

interviewRouter.post("/", authMiddleware.authUser,upload.single("resume"),interviewController.generateInterviewReportController);

module.exports = interviewRouter;
