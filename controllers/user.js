const User = require("@models/user");
const { HTTP_ONLY_OPTIONS } = require("@config");

const registerUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password required" });
    }

    try {
        const existedUser = await User.findOne({ email });

        if (existedUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const user = await User.create({ email, password });

        const createdUser = await User.findById(user._id).select(
            "-password -refreshToken"
        );

        if (!createdUser) {
            return res.status(500).json({ message: "Something went wrong, please try again later" });
        }

        return res
            .status(201)
            .json({ message: "User created successfully", action: "login" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong, please try again later" });
    }
};

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new Error(error.message);
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordValid = await user.isPasswordCorrect(password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
            user._id
        );

        const loggedInUser = await User.findById(user._id).select(
            "-password -refreshToken"
        );

        return res
            .status(200)
            .cookie("refreshToken", refreshToken, HTTP_ONLY_OPTIONS)
            .json({
                accessToken,
                message: "Logged in successfully",
            });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
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
        .cookie("refreshToken", "", HTTP_ONLY_OPTIONS)
        .json({ message: "Logged out successfully" });
};

const refreshAccessToken = async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken;

    if (!incomingRefreshToken) {
        return res.status(401).json({ message: "Refresh token not found", action: "login" });
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );

        const user = await User.findById(decodedToken?._id);

        if (!user) {
            return res.status(404).json({ message: "User not found", action: "login" });
        }

        if (user?.refreshToken !== incomingRefreshToken) {
            return res.status(401).json({ message: "Refresh token is invalid", action: "login" });
        }

        const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
            user._id
        );

        // Set the new tokens in cookies
        return res
            .status(200)
            .cookie("refreshToken", refreshToken, HTTP_ONLY_OPTIONS)
            .json({ accessToken, message: "Access token refreshed" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

module.exports = { registerUser, loginUser, logoutUser, refreshAccessToken };