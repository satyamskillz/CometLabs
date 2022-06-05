const logger = require("../logger");
const bcrypt = require("bcryptjs");

/*
    function name : getHassPassword
    description : Get hashed password
    input : password
    output : hashed password
*/
module.exports.getHassPassword = async (password) => {
	logger.info("Hashing password...");
	try {
		return await bcrypt.hash(password, 10);
	} catch (error) {
		throw new Error("Can't hass password");
	}
};

/*
    function name : comparePassword
    description : this function compare user password with database password
    input : user password, database password
    output : true or false
*/
module.exports.comparePassword = async (userPassword, databasePassword) => {
	logger.info("Comparing passwords...");
	try {
		const isMacted = await bcrypt.compare(userPassword, databasePassword);
		if (isMacted) {
			logger.info("Password matched");
			return true;
		} else {
			logger.info("Password didn't match");
			return false;
		}
	} catch (error) {
		throw new Error("Can't compare password");
	}
};

/*
    function name : validatePassword
    description : this function ckeck if password contain at least one number, one lowercase and one uppercase letter, and at least eight characters
    input : password
    output : true or false
*/
module.exports.validatePassword = async (password) => {
	logger.info("Validating password...");
	const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
	if (regex.test(password)) {
		logger.info("Password is valid");
		return true;
	} else {
		logger.info("Password is not valid");
		return false;
	}
};
