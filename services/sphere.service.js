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
