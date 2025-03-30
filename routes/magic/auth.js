const { Router } = require("express");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const Pending = require("@models/pending");
const User = require("@models/user");

dotenv.config();
const router = Router();

router.get("/verify", async (req, res) => {
    const { token } = req.query;

    if (!token) {
        return res.render("message", {
            title: "Invalid Link",
            heading: "Oops! This Link Seems Invalid",
            message: "The verification link you used is invalid or missing. Please check your email and try again."
        });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.MAGIC_SECRET);
        const { name, email, password } = decodedToken;
        const pending = await Pending.findOne({ email });

        if (!pending) {
            const existingUser = await User.findOne({ email });

            if (existingUser) {
                return res.render("message", {
                    title: "Already Verified",
                    heading: "You're Already Verified!",
                    message: "Your account has already been verified. You can close this window and login."
                });
            } else {
                throw "User not found!";
            }
        }

        await User.create({ name, email, password });
        await Pending.deleteOne({ email });

        return res.render("message", {
            title: "Success",
            heading: "Email Verified Successfully 🎉",
            message: `Welcome, ${name}! Your email has been verified. You can close this window now and login.</a>.`
        });

    } catch (error) {
        let title = "Error";
        let heading = "Something Went Wrong";
        let message = "An unexpected error occurred. Please try again later.";

        if (error.name === "TokenExpiredError") {
            heading = "Link Expired";
            message = "The verification link has expired. Please register again.";
        } else if (error.name === "JsonWebTokenError") {
            heading = "Invalid Link";
            message = "The verification link is invalid. Please check your email and try again.";
        } else if (error.name === "NotBeforeError") {
            heading = "Link Not Active Yet";
            message = "This verification link is not active yet. Please try again later.";
        }

        console.error(error);
        return res.render("message", {
            title,
            heading,
            message
        });
    }
});

module.exports = router;
