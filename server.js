require('module-alias/register');
const express = require("express");
const { urlencoded } = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const connectDB = require("@db/connect");

// Routes
const userRouter = require("@routes/user.routes");

// Environment variables
dotenv.config();

// Definations
const app = express();
const PORT = process.env.PORT || 8000;

// Adding middleware for CORS, JSON parsing, and cookies
app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    })
);
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());

// Registering routes
app.use("/api/v1/users", userRouter);

// test 
app.get("/api/v1", (req, res) => {
    res.send("Hello World");
});

// Connecting to MongoDB and starting the server
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            if (process.env.NODE_ENV !== "production") {
                console.log(`Server listening on port ${PORT}\n➜  Visit : http://localhost:${PORT}`);
            } else {
                console.log(`Server listening on port ${PORT}`);
            }
        });
    })
    .catch((error) => {
        console.log("MongoDB connection failed");
    });