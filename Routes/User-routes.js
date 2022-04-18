const express = require("express");

const usersController = require("../controllers/user-controllers");

const router = express.Router();

router.get("/", usersController.getUsers);
router.post("/deleteusers", usersController.deleteUsers);

router.post("/signup", usersController.signup);
router.post("/emailverify", usersController.emailVerify);
router.post("/newotp", usersController.requestNewEmailOtp);

router.post("/login", usersController.login);
router.post("/forgotpassword", usersController.newPassword);

module.exports = router;
