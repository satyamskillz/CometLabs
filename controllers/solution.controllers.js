/**
 * language: javascript
 * path : controllers\solution.controllers.js
 * Compare this snippet from routers\solution.router.js:
 * var solutionController = require("../controllers/solution.controllers");
 */

const sphereService = require("../services/sphere.service");
const questionModel = require("../models/question.model");
const logger = require("../logger");

/**
 * this api is used to submit solution to sphere engine
 * request body: {
 *         problemId: Number,
 *        code: String,
 *       language: String,
 * }
 * response: {
 *        message: String,
 *       data: {}
 * }
 *
 */

module.exports.submitSolution = async (req, res) => {
	try {
		const { questionId, compilerId, source } = req.body;

		// check weather request body is vaild or not
		if (!questionId || !compilerId || !source) {
			return res.status(400).json({
				message: "problemId, code, language is required",
			});
		}

		// get question by problemId and verify it is exist or not
		const question = await questionModel.findById(questionId);

		if (!question) {
			return res.status(400).json({
				message: "Invalid problemId",
			});
		}

		// submit solution to sphere engine
		const { isSubmitted, message, data } =
			await sphereService.submitSolution({
				problemId: question.problemId,
				compilerId: compilerId,
				source: source,
			});

		if (!isSubmitted) {
			return res.status(400).json({
				message,
				data,
			});
		}
		const { submissionData, message: submissionMsg } =
			await sphereService.getSubmissionStatus(data.id);

		if (!submissionData) {
			return res.status(400).json({
				message: submissionMsg,
			});
		}

		return res.status(200).json({
			message: submissionMsg,
			data: submissionData,
		});
	} catch (error) {
		logger.error(error);
		return res.status(500).json({
			message: "Connection failed",
		});
	}
};
