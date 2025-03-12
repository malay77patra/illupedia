const User = require("@models/user");
const jwt = require("jsonwebtoken");
const { ACCESS_TOKEN_OPTIONS } = require("@config");

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

        const createdUser = await User.findById(user._id).select(
            "-password -refreshToken"
        );

        if (!createdUser) {
            return res.status(500).json({ message: "Something went wrong, please try again later." });
        }

        return res
            .status(201)
            .json({ message: "Registered successfully." });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong, please try again later." });
    }
};

// const generateAccessAndRefreshTokens = async (userId) => {
//     try {
//         const user = await User.findById(userId);

//         const accessToken = user.generateAccessToken();
//         const refreshToken = user.generateRefreshToken();

//         user.refreshToken = refreshToken;
//         await user.save({ validateBeforeSave: false });

//         return { accessToken, refreshToken };
//     } catch (error) {
//         throw new Error(error.message);
//     }
// };


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

        // const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
        //     user._id
        // );
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.accessToken = accessToken;
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        const loggedInUser = await User.findById(user._id).select(
            "-password -refreshToken"
        );

        // Set refresh token as http-Only with expiry time
        return res
            .status(200)
            .cookie("refreshToken", refreshToken, ACCESS_TOKEN_OPTIONS)
            .json({
                accessToken,
                message: "Logged in successfully."
            });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong, please try again later." });
    }
};

const logoutUser = async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: { refreshToken: undefined },
        },
        { new: true }
    );

    return res
        .status(200)
        .cookie("refreshToken", "", ACCESS_TOKEN_OPTIONS)
        .json({ message: "Logged out." });
};

const refreshAccessToken = async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken;

    if (!incomingRefreshToken) {
        return res.status(401).json({ message: "Refresh token not found." });
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );

        const user = await User.findById(decodedToken?._id);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        if (!user.refreshToken) {
            return res.status(401).json({ message: "User not logged in." });
        }

        if (user.refreshToken !== incomingRefreshToken) {
            return res.status(401).json({ message: "Invalid refresh token." });
        }

        // const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
        //     user._id
        // );
        const accessToken = user.generateAccessToken();

        user.accessToken = accessToken;
        await user.save({ validateBeforeSave: false });

        return res
            .status(200)
            .json({ accessToken, message: "Access token refreshed successfully." });
        // return res
        //     .status(200)
        //     .cookie("refreshToken", refreshToken, ACCESS_TOKEN_OPTIONS)
        //     .json({ accessToken, message: "Access token refreshed successfully." });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrongagain, please try again later." });
    }
};

module.exports = { registerUser, loginUser, logoutUser, refreshAccessToken };