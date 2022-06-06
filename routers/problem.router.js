var AuthenticationAdmin = require("../middlewares/AuthenticationAdmin");
var problemController = require("../controllers/problem.controllers");
var Authentication = require("../middlewares/Authentication");
var express = require("express");
var router = express.Router();

// This api is used to add question by admin
router.post(
	"/v1/add-question",
	AuthenticationAdmin,
	problemController.addQuestion
);

// This api is used to delete question by admin
router.delete(
	"/v1/delete-question/:questionId",
	AuthenticationAdmin,
	problemController.deleteQuestion
);

// This api is used to update question by admin
router.put(
	"/v1/update-question",
	AuthenticationAdmin,
	problemController.updateQuestion
);

// This api is used to add test case to problem by admin
router.post(
	"/v1/add-testcase",
	AuthenticationAdmin,
	problemController.addTestCase
);

module.exports = router;
