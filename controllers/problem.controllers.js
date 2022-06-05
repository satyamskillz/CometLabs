// language: javascript
// path : controllers\user.controllers.js

const sphereService = require("../services/sphere.service");
const questionModel = require("../models/question.model");
const testCaseModel = require("../models/testcase.model");
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

/*
    this controller used to delete question by admin
    parameters: {
        questionId: String,
    }
    response: {
        message: String,
    }
*/

module.exports.deleteQuestion = async (req, res) => {
	try {
		const { questionId } = req.params;

		// check weather request body is vaild or not
		if (!questionId) {
			return res.status(400).json({
				message: "questionId is required",
			});
		}

		// get question from mongo database
		const question = await questionModel.findById(questionId);

		// delete question from sphere problem database
		const { isDeleted, message } = await sphereService.deleteProblem(
			question.problemId
		);

		if (!isDeleted) {
			return res.status(400).json({
				message: message,
			});
		}

		// delete question from mongo database
		await questionModel.findOneAndDelete({
			_id: questionId,
		});

		return res.status(200).json({
			message: "Question deleted successfull",
		});
	} catch (error) {
		logger.error(error);
		return res.status(500).json({
			message: "Failed to delete question",
			error: error,
		});
	}
};

/*
    this controller used to update question by admin
    parameters: {
        questionId: String,
        name: String,
        body: String,
        masterjudgeId: Number,
    }
    response: {
        message: String,
    }
*/

module.exports.updateQuestion = async (req, res) => {
	try {
		const { questionId, name, body, masterjudgeId } = req.body;

		// check weather request body is vaild or not
		if (!questionId || !name || !body || !masterjudgeId) {
			return res.status(400).json({
				message:
					"questionId, name, description, masterJudgeId is required",
			});
		}

		// get question from mongo database
		const question = await questionModel.findById(questionId);

		// update question in sphere problem database
		const { isUpdated, message } = await sphereService.updateProblem(
			question.problemId,
			req.body
		);

		if (!isUpdated) {
			return res.status(400).json({
				message: message,
			});
		}

		// update question in mongo database
		const newQuestion = await questionModel.findOneAndUpdate(
			{
				_id: questionId,
			},
			{
				name,
				body,
				masterjudgeId,
			}
		);

		return res.status(200).json({
			message: "Question updated successfull",
			data: {
				questionId: newQuestion._id,
			},
		});
	} catch (error) {
		logger.error(error);
		return res.status(500).json({
			message: "Failed to update question",
			error: error,
		});
	}
};
