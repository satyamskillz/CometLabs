var AuthenticationAdmin = require("../middlewares/AuthenticationAdmin");
var problemController = require("../controllers/problem.controllers");
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

module.exports = router;
