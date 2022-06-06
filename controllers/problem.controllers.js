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
			creator: req.user._id,
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

/*
	this controller used to add testcase in question by admin
	request body: {
		input: String,
		output: String,
		questionId: String,
		timelimit: Number,
		jugdeId: Number,
	}
	response: {
		message: String,
	}
*/
module.exports.addTestCase = async (req, res) => {
	try {
		const { input, output, questionId, timelimit, judgeId } = req.body;

		// check weather request body is vaild or not
		if (!input || !output || !questionId || !timelimit || !judgeId) {
			return res.status(400).json({
				message:
					"input, output, questionId, timelimit, judgeId is required",
			});
		}

		// Get problemId from questions
		const question = await questionModel.findById(questionId);

		if (!question) {
			return res.status(400).json({
				message: "Question not found",
			});
		}

		// add testcase to sphere problem database
		const { testcaseNumber, message } = await sphereService.addTestCase(
			question.problemId,
			{
				input,
				output,
				judgeId,
				timelimit,
			}
		);

		if (!testcaseNumber) {
			return res.status(400).json({ message });
		}

		// add testcase to mongo database
		const testcase = await testCaseModel({
			input,
			output,
			judgeId,
			timelimit,
			questionId,
			number: testcaseNumber,
		}).save();

		return res.status(200).json({
			message: "Testcase added successfull",
			data: {
				testcase,
			},
		});
	} catch (error) {
		// logger.error(error);

		console.log(error);

		return res.status(500).json({
			message: "Failed to add testcase",
			error: error,
		});
	}
};

/*
	this controller used to get all questions from mongo database
*/
module.exports.getAllQuestions = async (req, res) => {
	try {
		// find question by id and it list of testcases from mongo database
		const questions = await questionModel.aggregate([
			{
				$lookup: {
					from: "testcases",
					localField: "_id",
					foreignField: "questionId",
					as: "testcases",
				},
			},
			{ $unwind: "$testcases" },
			{
				$group: {
					_id: "$_id",
					name: { $first: "$name" },
					body: { $first: "$body" },
					creator: { $first: "$creator" },
					testCases: {
						$push: "$testcases",
					},
				},
			},
		]);

		return res.status(200).json({
			message: "Questions fetched successfull",
			data: {
				questions,
			},
		});
	} catch (error) {
		logger.error(error);
		return res.status(500).json({
			message: "Failed to get questions",
			error: error,
		});
	}
};

/*
	this controller used to get question by id from mongo database
*/
module.exports.getOneQuestion = async (req, res) => {
	try {
		const { questionId } = req.params;

		// check weather request body is vaild or not
		if (!questionId) {
			return res.status(400).json({
				message: "questionId is required",
			});
		}

		// get qeustion from mongo database
		var question = await questionModel.findById(questionId);

		if (!question) {
			return res.status(400).json({
				message: "Question not found",
			});
		}

		// get all testcases from mongo database
		var testcases = await testCaseModel.find({ questionId });

		if (!testcases) {
			return res.status(400).json({
				message: "Testcases not found",
			});
		}

		// all testcases to question
		question = { ...question._doc, testCases: testcases };

		return res.status(200).json({
			message: "Question fetched successfull",
			data: {
				question,
			},
		});
	} catch (error) {
		logger.error(error);
		return res.status(500).json({
			message: "Failed to get question",
			error: error,
		});
	}
};
