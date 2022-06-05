const jwt = require("jsonwebtoken");

/*
	function name : createRefreshToken
	description : this function create access token for user
	input : user object
	output : access token
*/

module.exports.createAccessToken = async (user) => {
	const token = jwt.sign(
		{
			user: user._id,
		},
		process.env.JWT_SECRET_1,
		{
			expiresIn: "1d",
		}
	);
	return token;
};
