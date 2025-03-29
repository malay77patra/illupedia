const User = require("@models/user");
const jwt = require("jsonwebtoken");
const { REFRESH_TOKEN_OPTIONS } = require("@config");

const registerUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and Password are required." });
    }

    try {
        const existedUser = await User.findOne({ email });

        if (existedUser) {
            return res.status(400).json({ message: "This email is already used." });
        }

        const user = await User.create({ email, password });

        return res.status(201).json({ message: "Registered successfully." });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong, please try again later." });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and Password are required." });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        const isPasswordValid = await user.isPasswordCorrect(password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Incorrect password." });
        }

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        await User.findByIdAndUpdate(user._id, { refreshToken }, { new: true });

        return res
            .status(200)
            .cookie("refreshToken", refreshToken, REFRESH_TOKEN_OPTIONS)
            .json({ accessToken, message: "Logged in successfully." });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong, please try again later." });
    }
};

const logoutUser = async (req, res) => {
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

    return res.status(200).json({ message: "Logged out." });
};

const refreshUser = async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken;

    if (!incomingRefreshToken) {
        return res.status(204).send();
    }

    try {
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);

        const user = await User.findById(decodedToken?._id);

        if (!user) {
            return res.status(403).json({ message: "User not found or invalid token." });
        }

        if (!user.refreshToken) {
            return res.status(403).json({ message: "User not logged in." });
        }

        if (user.refreshToken !== incomingRefreshToken) {
            return res.status(403).json({ message: "Invalid refresh token." });
        }

        const accessToken = user.generateAccessToken();

        await User.findByIdAndUpdate(user._id, { accessToken }, { new: true });

        return res.status(200).json({
            user: { accessToken },
            message: "Access token refreshed successfully."
        });

    } catch (error) {
        console.error(error);

        if (error.name === "TokenExpiredError" || error.name === "JsonWebTokenError") {
            return res.status(403).json({ message: "Invalid or expired token." });
        }

        return res.status(500).json({ message: "Something went wrong, please try again later." });
    }
};

module.exports = { registerUser, loginUser, logoutUser, refreshUser };
