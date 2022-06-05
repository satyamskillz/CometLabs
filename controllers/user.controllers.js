// language : javascript
// path : controllers\user.controllers.js

const logger = require("../logger");
const userModel = require("../models/user.model");
const tokenService = require("../services/token.service");
const passwordService = require("../services/password.service");

// this controller to used to test user api
module.exports.testController = async (req, res) => {
	try {
		return res.status(200).json({
			message: "test successfull",
		});
	} catch (error) {
		return res.status(500).json({
			message: "test failed",
			error: error,
		});
	}
};

/*
	this controller used to register user
	request body: {
		name: String,
		email: String,
		password: String,
		role: String,
	}
	response: {
		message: String,
		data: {
			email: String,
			token: String,
		}
	}
*/
module.exports.register = async (req, res) => {
	try {
		const { name, email, password, role } = req.body;
		var isAdmin = false;

		// check weather request body is vaild or not
		if (!name || !email || !password || !role) {
			return res.status(400).json({
				message: "name, email, password, role is required",
			});
		}

		// check weather role is vaild or not
		if (!["admin", "user"].includes(role)) {
			return res.status(400).json({
				message: "role is not valid",
			});
		} else if (role === "admin") {
			isAdmin = true;
		}

		// check weather user is existed or not
		const user = await userModel.findOne({ email });
		if (user) {
			return res.status(400).json({
				message: "user already existed",
			});
		}

		// hashing password using bcrypt
		const hashedPassword = await passwordService.getHassPassword(password);

		// create new user
		const newUser = new userModel({
			name,
			email,
			isAdmin,
			password: hashedPassword,
		});

		// save new user
		const result = await newUser.save();

		// create JWT token
		const token = await tokenService.createAccessToken(result);

		return res.status(200).json({
			message: "register successfull",
			data: {
				email: result.email,
				token: token,
			},
		});
	} catch (error) {
		logger.error(error);

		return res.status(500).json({
			message: "register failed",
			error: error,
		});
	}
};
