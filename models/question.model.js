const mongoose = require("mongoose");
const SchemaTypes = mongoose.Schema.Types;
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
		creator: {
			type: SchemaTypes.ObjectId,
			required: true,
			ref: "Users",
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Questions", questionSchema);
