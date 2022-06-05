var nodemailer = require("nodemailer");
var path = require("path");
var ejs = require("ejs");
var fs = require("fs");

/*
	function name: sendWelcomeMail
	description: this function used to send welcome mail to user
	parameters: {
		email: String,
		name: String,
	}
	return: boolean
*/

module.exports.sendWelcomeMail = async (email) => {
	try {
		// fetching mail templete
		var template = fs.readFileSync(
			path.join(__dirname, "/templates/WelcomeMail.html"),
			{
				encoding: "utf-8",
			}
		);

		// Starting node mailer transport server
		var transport = nodemailer.createTransport({
			host: "smtpout.secureserver.net",
			secureConnection: true,
			port: 465,
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASS,
			},
		});

		// Setting up mail option which includes
		// from: sender email address
		// to: reciver email address
		// subject: suject of email
		// html: body of email
		const mailOptions = {
			from: process.env.EMAIL_FROM,
			to: email,
			subject: "Welocome to CometLabs",
			html: ejs.render(template),
		};

		// Sending Mail
		await transport.sendMail(mailOptions);

		// Closing transport server
		transport.close();
		return true;
	} catch (error) {
		return false;
	}
};
