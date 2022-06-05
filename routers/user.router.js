var userControllers = require("../controllers/user.controllers");
var express = require("express");
var router = express.Router();

// Testing user api
router.get("/", userControllers.testController);

// Register user api
router.post("/v1/register", userControllers.register);

module.exports = router;
