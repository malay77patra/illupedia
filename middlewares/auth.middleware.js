const jwt = require("jsonwebtoken");
const User = require('@models/user.model');

const verifyJWT = async (req, res, next) => {
    try {
        // Look for the token in cookies or headers
        const token =
            req.cookies?.accessToken ||
            req.header("Authorization")?.replace("Bearer ", "");

        // If there's no token, deny access with a 401 Unauthorized status
        if (!token) {
            return res.status(401).json({ message: "Token not found" });
        }

        // Check if the token is valid using a secret key
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        // Get the user linked to the token
        const user = await User.findById(decodedToken?._id).select(
            "-password -refreshToken"
        );

        // If the user isn't found, deny access with a 404 Not Found status
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Attach user info to the request for further use
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

module.exports = { verifyJWT };