const { Router } = require("express");
const { registerUser, loginUser, logoutUser, refreshAccessToken } = require("@controllers/user");
const { verifyJWT } = require("@middlewares/auth");

const router = Router();

// ---------------------- Public Routes ----------------------

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.post("/refresh-token", refreshAccessToken);

// ---------------------- Protected Routes ----------------------
router.use(verifyJWT);
router.post("/logout", logoutUser);



module.exports = router;