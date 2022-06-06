var solutionController = require("../controllers/solution.controllers");
var Authentication = require("../middlewares/Authentication");
var express = require("express");
var router = express.Router();

// this api is used to submit solution to sphere engine
router.post(
	"/v1/submit-solution",
	Authentication,
	solutionController.submitSolution
);

module.exports = router;
