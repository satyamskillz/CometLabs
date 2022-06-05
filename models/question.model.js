const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		body: {
			type: String,
			required: true,
		},
		problemId: {
			type: Number,
			required: true,
		},
		masterjudgeId: {
			type: Number,
			required: true,
		},
		testCases: [
			{
				type: Schema.Types.ObjectId,
				ref: "TestCases",
			},
		],
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Questions", questionSchema);
