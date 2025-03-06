const { Router } = require("express");
const { registerUser, loginUser, logoutUser, refreshAccessToken } = require("@controllers/user.controller");
const { verifyJWT } = require("@middlewares/auth.middleware");

const router = Router();

// public routes
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

// protected routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);


module.exports = router;