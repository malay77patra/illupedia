const User = require("@models/user.model.js");

const registerUser = async (req, res) => {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password required" });
    }

    try {
        // Check if the user already exists
        const existedUser = await User.findOne({ email });

        if (existedUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Create a new user in the database
        const user = await User.create({ email, password });

        // Retrieve the created user excluding sensitive information
        const createdUser = await User.findById(user._id).select(
            "-password -refreshToken"
        );

        // Check if user creation was successful
        if (!createdUser) {
            return res.status(500).json({ message: "Something went wrong" });
        }

        // Send a success response with the created user details
        return res
            .status(201)
            .json({ user: createdUser, message: "User created successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        // Find the user by ID in the database
        const user = await User.findById(userId);

        // Generate an access token and a refresh token
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        // Save the refresh token to the user in the database
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        // Return the generated tokens
        return { accessToken, refreshToken };
    } catch (error) {
        // Handle any errors that occur during the process
        throw new Error(error.message);
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Validate email and password presence
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        // Find the user by email in the database
        const user = await User.findOne({ email });

        // Check if the user exists
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Verify the correctness of the provided password
        const isPasswordValid = await user.isPasswordCorrect(password);

        // Handle incorrect password
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        // Generate access and refresh tokens
        const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
            user._id
        );

        // Retrieve the logged-in user excluding sensitive information
        const loggedInUser = await User.findById(user._id).select(
            "-password -refreshToken"
        );

        // Set options for cookies
        const options = {
            httpOnly: true,
            secure: true, // Enable in a production environment with HTTPS
        };

        // Set cookies with the generated tokens
        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json({
                user: loggedInUser,
                accessToken,
                refreshToken,
                message: "Logged in successfully",
            });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

const logoutUser = async (req, res) => {
    // Remove the refresh token from the user's information
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: { refreshToken: undefined },
        },
        { new: true }
    );

    // Set options for cookies
    const options = {
        httpOnly: true,
        secure: true, // Enable in a production environment with HTTPS
    };

    // Clear the access and refresh tokens in cookies
    return res
        .status(200)
        .cookie("accessToken", options)
        .cookie("refreshToken", options)
        .json({ user: {}, message: "Logged out successfully" });
};

const refreshAccessToken = async (req, res) => {
    // Retrieve the refresh token from cookies or request body
    const incomingRefreshToken =
        req.cookies.refreshToken || req.body.refreshToken;

    // If no refresh token is present, deny access with a 401 Unauthorized status
    if (!incomingRefreshToken) {
        return res.status(401).json({ message: "Refresh token not found" });
    }

    try {
        // Verify the incoming refresh token using the secret key
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );

        // Find the user associated with the refresh token
        const user = await User.findById(decodedToken?._id);

        // If the user isn't found, deny access with a 404 Not Found status
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // If the stored refresh token doesn't match the incoming one, deny access with a 401 Unauthorized status
        if (user?.refreshToken !== incomingRefreshToken) {
            return res.status(401).json({ message: "Refresh token is incorrect" });
        }

        // Set options for cookies
        const options = {
            httpOnly: true,
            secure: true, // Enable in a production environment with HTTPS
        };

        // Generate new access and refresh tokens for the user
        const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
            user._id
        );

        // Set the new tokens in cookies
        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json({ accessToken, refreshToken, message: "Access token refreshed" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

module.exports = { registerUser, loginUser, logoutUser, refreshAccessToken };