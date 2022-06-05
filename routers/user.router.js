var userControllers = require("../controllers/user.controllers");
var Authentication = require("../middlewares/Authentication");
var express = require("express");
var router = express.Router();

// Testing user api
router.get("/", Authentication, userControllers.testController);

// Register user api
router.post("/v1/register", userControllers.register);

// Login user api
router.post("/v1/login", userControllers.login);

module.exports = router;
