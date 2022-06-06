const mongoose = require("mongoose");
const SchemaTypes = mongoose.Schema.Types;
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
		number: {
			type: Number,
			required: true,
		},
		judgeId: {
			type: Number,
			required: true,
		},
		timelimit: {
			type: Number,
			required: true,
		},
		questionId: {
			type: SchemaTypes.ObjectId,
			ref: "Questions",
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("TestCases", testCaseSchema);
