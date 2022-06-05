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
