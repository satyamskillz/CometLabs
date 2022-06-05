const mongoose = require("mongoose");

const testCaseSchema = new mongoose.Schema(
	{
		input: {
			type: String,
			required: true,
		},
		output: {
			type: String,
			required: true,
		},
		problemId: {
			type: Number,
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("TestCases", testCaseSchema);
