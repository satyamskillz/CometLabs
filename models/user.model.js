const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		unique: true,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	isAdmin: {
		type: Boolean,
		default: false,
		required: true,
	},
	createAt: {
		type: Date,
		required: true,
		default: Date.now,
	},
	updateAt: {
		type: Date,
		required: true,
		default: Date.now,
	},
});

module.exports = mongoose.model("Users", userSchema);
