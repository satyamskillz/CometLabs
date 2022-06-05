const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

// function to get token from authorization bearer header
function getToken(req) {
	if (
		req.headers.authorization &&
		req.headers.authorization.split(" ")[0] === "Bearer"
	) {
		return req.headers.authorization.split(" ")[1];
	}
	return null;
}

const AuthenticationUser = async (req, res, next) => {
	// Get token from authorization header
	// And check weather token is vaild or not
	const token = getToken(req);
	if (!token) {
		return res.status(401).json({
			message: "Authentication failed",
		});
	}

	try {
		// Verify the access token
		const decoded = jwt.verify(token, process.env.JWT_SECRET_1);

		// Check if the user exists in the database
		const user = await userModel.findOne({
			_id: decoded.user,
		});

		// checking weather user is exist or not and has admin role or not
		if (!user || user.isAdmin) {
			return res.status(401).json({
				message: "Authentication failed",
			});
		}

		req.user = user;
	} catch (err) {
		return res.status(401).json({
			message: "Authentication failed",
		});
	}

	next();
};

module.exports = AuthenticationUser;
