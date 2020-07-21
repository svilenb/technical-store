const express = require("express");
const signupController = require("../controllers/signup");
const auth = require("../config/auth");

const router = express.Router();

router.get("/", auth.isGuest, signupController.getSignup);
router.post("/", auth.isGuest, signupController.postSignup);

module.exports = router;
