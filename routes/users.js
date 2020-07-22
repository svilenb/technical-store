const express = require("express");
const usersController = require("../controllers/users");
const auth = require("../config/auth");

const router = express.Router();

router.get("/", usersController.getAll);
router.get("/me", auth.isAuthenticated, usersController.getMe);
router.get("/:id", usersController.getUser);
router.post("/:id/friend", auth.isAuthenticated, usersController.friend);

module.exports = router;
