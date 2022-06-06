const axios = require("axios").default;
const logger = require("../logger");

/*
    function name: addProblem
    description: this function used to add question to sphere database
    parameters: {
        name: String,
        body: String,
        masterJudgeId: String,
    }
    return: {
        id: String,
    }
*/
module.exports.addProblem = async (problemData) => {
	try {
		const response = await axios.post(
			process.env.SPHERE_ENDPOINT +
				"/api/v4/problems?access_token=" +
				process.env.SPHERE_TOKEN,
			JSON.stringify(problemData),
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		let data = response.data;
		return {
			problemId: data.id,
			message: "Question added successfull",
		};
	} catch (error) {
		// logger.error(error);

		if (error.response.status === 400) {
			return {
				problemId: null,
				message: error.response.data.message,
			};
		} else {
			return {
				problemId: null,
				message: "Connection error, please try again later",
			};
		}
	}
};

/*
	function name: deleteProblem
	description: this function used to delete question from sphere database
	parameters: {
		problemId: String,
	}
	return: {
		isDeleted: Boolean,
		message: String,
	}
*/
module.exports.deleteProblem = async (problemId) => {
	try {
		await axios.delete(
			process.env.SPHERE_ENDPOINT +
				"/api/v4/problems/" +
				problemId +
				"?access_token=" +
				process.env.SPHERE_TOKEN
		);

		return {
			isDeleted: true,
			message: "Question deleted successfull",
		};
	} catch (error) {
		console.log(error);

		if (error.response.status === 401) {
			return {
				isDeleted: false,
				message: error.response.data.message,
			};
		} else if (error.response.status === 403) {
			return {
				isDeleted: false,
				message: error.response.data.message,
			};
		} else if (error.response.status === 404) {
			return {
				isDeleted: false,
				message: error.response.data.message,
			};
		} else {
			return {
				isDeleted: false,
				message: "Connection error, please try again later",
			};
		}
	}
};

/*
	function name: updateProblem
	description: this function used to update question in sphere database
	parameters: {
		problemId: String,
		newProblemData: {
			name: String,
			body: String,
			masterJudgeId: String,
		}
	}
	return: {
		isUpdated: Boolean,
		message: String,
	}
*/
module.exports.updateProblem = async (problemId, newProblemData) => {
	try {
		await axios.put(
			process.env.SPHERE_ENDPOINT +
				"/api/v4/problems/" +
				problemId +
				"?access_token=" +
				process.env.SPHERE_TOKEN,
			JSON.stringify(newProblemData),
			{ headers: { "Content-Type": "application/json" } }
		);

		return {
			isUpdated: true,
			message: "Question updated successfull",
		};
	} catch (error) {
		console.log(error);

		if (error.response.status === 400) {
			return {
				isUpdated: false,
				message: error.response.data.message,
			};
		} else if (error.response.status === 401) {
			return {
				isUpdated: false,
				message: error.response.data.message,
			};
		} else if (error.response.status === 403) {
			return {
				isUpdated: false,
				message: error.response.data.message,
			};
		} else if (error.response.status === 404) {
			return {
				isUpdated: false,
				message: error.response.data.message,
			};
		} else {
			return {
				isUpdated: false,
				message: "Connection error, please try again later",
			};
		}
	}
};

/*
	function name: addTestCase
	description: this function used to add test case to sphere database
	parameter:{ 
		problemId: String,
		testCaseData: {
			input: String,
			output: String,
			judgeId: Number,
			timelimit: Number,
		}
	}
	return: {
		message: String,
		testcaseNumber: Number,
	}
*/
module.exports.addTestCase = async (problemId, testCaseData) => {
	try {
		const response = await axios.post(
			process.env.SPHERE_ENDPOINT +
				"/api/v4/problems/" +
				problemId +
				"/testcases?access_token=" +
				process.env.SPHERE_TOKEN,
			JSON.stringify(testCaseData),
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		let data = response.data;

		return {
			message: "Test case added successfull",
			testcaseNumber: data.number,
		};
	} catch (error) {
		if (error.response.status === 400) {
			return {
				message: error.response.data.message,
				testcaseNumber: null,
			};
		} else if (error.response.status === 401) {
			return {
				message: error.response.data.message,
				testcaseNumber: null,
			};
		} else if (error.response.status === 403) {
			return {
				message: error.response.data.message,
				testcaseNumber: null,
			};
		} else {
			return {
				message: "Connection error, please try again later",
				testcaseNumber: null,
			};
		}
	}
};

/**
 * @description this function used to update test case in sphere database
 *
 * @param {String} submissionData.problemId
 * @param {String} submissionData.language
 * @param {String} submissionData.source
 *
 * @returns {Object} *
 *
 * @example summitSolution({ problemId: '', language: '', source: '' })
 *
 * @return {Boolean} return.isSubmitted
 * @return {String} return.message
 * @return {Ojecct} return.data
 *
 * @author Satyam Sharma < satyamskillz@gmail.com >
 *
 * @createdOn: 06-June-2022
 *
 * @version: 1.0.0
 *
 * @deprecated: No
 */

module.exports.submitSolution = async (submissionData) => {
	try {
		const response = await axios.post(
			process.env.SPHERE_ENDPOINT +
				"/api/v4/submissions?access_token=" +
				process.env.SPHERE_TOKEN,
			JSON.stringify(submissionData),
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		return {
			isSubmitted: true,
			message: "Test case updated successfull",
			data: response.data,
		};
	} catch (error) {
		// console.log(error);

		if (
			error.response.status === 400 ||
			error.response.status === 401 ||
			error.response.status === 403 ||
			error.response.status === 404
		) {
			return {
				isSubmitted: false,
				message: error.response.data.message,
				data: error.response.data,
			};
		} else {
			return {
				isSubmitted: false,
				message: "Connection error, please try again later",
				data: null,
			};
		}
	}
};

/**
 * @discription this function used to get submission status
 *
 * @param {String} submissionId
 * @returns {Object}
 *
 * @example getSubmissionStatus('')
 *
 * @return {String} return.message
 * @return {Ojecct} return.submissionData
 *
 *
 * @author Satyam Sharma < satyamskillz@gmail.com >
 *
 * @createdOn: 06-June-2022
 *
 * @version: 1.0.0
 *
 * @deprecated: No
 *
 */

module.exports.getSubmissionStatus = async (submissionId) => {
	try {
		const response = await axios.get(
			process.env.SPHERE_ENDPOINT +
				"/api/v4/submissions/" +
				submissionId +
				"?access_token=" +
				process.env.SPHERE_TOKEN
		);

		const status = response.data.result.status;

		return {
			message: status.name,
			submissionData: response.data,
		};
	} catch (error) {
		console.log(error.response);

		if (
			error.response.status === 401 ||
			error.response.status === 403 ||
			error.response.status === 404
		) {
			return {
				isSubmitted: false,
				message: error.response.data.message,
				submissionData: error.response.data,
			};
		} else {
			return {
				isSubmitted: false,
				message: "Connection error, please try again later",
				submissionData: null,
			};
		}
	}
};
