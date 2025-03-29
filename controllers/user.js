const User = require("@models/user");
const jwt = require("jsonwebtoken");
const { REFRESH_TOKEN_OPTIONS } = require("@config");
const { loginSchema, registerSchema } = require("@utils/validations");

const registerUser = async (req, res) => {
    try {
        await registerSchema.validate(req.body, { abortEarly: false });

        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email }).lean();

        if (existingUser) {
            return res.status(400).json({
                error: {
                    message: "This email is already in use."
                }
            });
        }

        await User.create({ name, email, password });

        return res.status(201).json({
            success: {
                message: "User registered successfully."
            }
        });

    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({
                error: {
                    message: error.inner[0]?.message || "Validation failed."
                }
            });
        }

        return res.status(500).json({
            error: {
                message: "An unexpected error occurred. Please try again later."
            }
        });
    }
};

const loginUser = async (req, res) => {
    try {
        await loginSchema.validate(req.body, { abortEarly: false });

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                error: {
                    message: "User not found, please enter correct email."
                }
            });
        }

        const isPasswordValid = await user.isPasswordCorrect(password);

        if (!isPasswordValid) {
            return res.status(401).json({
                error: {
                    message: "Please enter the correct password."
                }
            });
        }

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        await User.findByIdAndUpdate(user._id, { refreshToken }, { new: true });

        return res
            .status(200)
            .cookie("refreshToken", refreshToken, REFRESH_TOKEN_OPTIONS)
            .json({
                success: {
                    accessToken,
                    message: "Logged in successfully."
                }
            });
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({
                error: {
                    message: error.inner[0]?.message || "Validation failed."
                }
            });
        }

        return res.status(500).json({
            error: {
                message: "An unexpected error occurred. Please try again later."
            }
        });
    }
};

const logoutUser = async (req, res) => {
    try {

        await User.findByIdAndUpdate(
            req.user._id,
            { $unset: { refreshToken: 1 } },
            { new: true }
        );

        // Remove the maxAge since its depreacted from clearCookie.
        //
        // express deprecated res.clearCookie: Passing "options.maxAge" is deprecated.
        // In v5.0.0 of Express, this option will be ignored, as res.clearCookie will automatically set cookies to expire immediately.
        //
        const REFRESH_TOKEN_OPTIONS_FOR_DELETION = { ...REFRESH_TOKEN_OPTIONS };
        delete REFRESH_TOKEN_OPTIONS_FOR_DELETION.maxAge;

        res.clearCookie("refreshToken", REFRESH_TOKEN_OPTIONS_FOR_DELETION);

        return res.status(200).json({
            success: {
                message: "Logged out successfully."
            }
        });
    } catch (error) {
        return res.status(500).json({
            error: {
                message: "An unexpected error occurred. Please try again later."
            }
        });
    }
};

const refreshUser = async (req, res) => {
    try {
        const incomingRefreshToken = req.cookies.refreshToken;

        if (!incomingRefreshToken) {
            return res.status(401).json({
                error: {
                    message: "No refresh token provided."
                }
            });
        }

        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
        const user = await User.findById(decodedToken?._id);

        if (!user) {
            return res.status(401).json({
                error: {
                    message: "User not found."
                }
            });
        }

        if (!user.refreshToken) {
            return res.status(401).json({
                error: {
                    message: "User is not authenticated."
                }
            });
        }

        if (user.refreshToken !== incomingRefreshToken) {
            return res.status(401).json({
                error: {
                    message: "Invalid refresh token."
                }
            });
        }

        const accessToken = user.generateAccessToken();
        await User.findByIdAndUpdate(user._id, { accessToken }, { new: true });

        return res.status(200).json({
            success: {
                accessToken,
                message: "Access token refreshed successfully."
            }
        });

    } catch (error) {

        if (error.name === "TokenExpiredError" || error.name === "JsonWebTokenError") {
            return res.status(401).json({
                error: {
                    message: "Invalid or expired refresh token."
                }
            });
        }

        return res.status(500).json({
            error: {
                message: "An unexpected error occurred. Please try again later."
            }
        });
    }
};

module.exports = { registerUser, loginUser, logoutUser, refreshUser };
