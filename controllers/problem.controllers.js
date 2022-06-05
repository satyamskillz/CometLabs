// language: javascript
// path : controllers\user.controllers.js

const sphereService = require("../services/sphere.service");
const questionModel = require("../models/question.model");
const logger = require("../logger");
/*
	this controller used to add question by admin
	request body: {
		name: String,
        body: String,
        masterjudgeId: Number,
	}
	response: {
		message: String,
	}
*/
module.exports.addQuestion = async (req, res) => {
	try {
		const { name, body, masterjudgeId } = req.body;

		// check weather request body is vaild or not
		if (!name || !body || !masterjudgeId) {
			return res.status(400).json({
				message: "title, description, masterJudgeId is required",
			});
		}

		// add question to sphere problem database
		const { problemId, message } = await sphereService.addProblem(req.body);

		if (!problemId) {
			return res.status(400).json({
				message: message,
			});
		}

		// add question to mongo database
		const question = await questionModel({
			name,
			body,
			problemId,
			masterjudgeId,
		}).save();

		return res.status(200).json({
			message: "Question added successfull",
			data: {
				question,
			},
		});
	} catch (error) {
		logger.error(error);
		return res.status(500).json({
			message: "Failed to add question",
			error: error,
		});
	}
};
