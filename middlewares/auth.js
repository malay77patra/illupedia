const jwt = require("jsonwebtoken");
const User = require("@models/user");

const verifyJWT = async (req, res, next) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({ message: "Unauthorized request blocked." });
        }

        let decodedToken;
        try {
            decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        } catch (error) {

            if (error.name === "TokenExpiredError") {
                return res.status(401).json({ message: "Session expired, please login again." });
            }
            if (error.name === "JsonWebTokenError" || error.name === "NotBeforeError") {
                return res.status(403).json({ message: "Unauthorized request blocked." });
            }

            console.error("JWT Verification Error:", error);
            return res.status(500).json({ message: "Unable to verify user, please try again later." });
        }

        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("Unexpected JWT Verification Error:", error);
        return res.status(500).json({ message: "Unable to verify user, please try again later." });
    }
};

module.exports = { verifyJWT };
