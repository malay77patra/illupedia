require('module-alias/register');
const express = require("express");
const { urlencoded } = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const connectDB = require("@db/connect");
const path = require("path");
const routes = require("@routes");


// Environment variables
dotenv.config();

// Definations
const app = express();
const PORT = process.env.PORT || 8000;

// Adding middlewares
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
app.use(routes);


// routing handler for SPA in production
if (process.env.NODE_ENV !== "development") {
    app.use(express.static(path.resolve(__dirname, "frontend", "dist")));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
    });
}

// Connecting to MongoDB and starting the server
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            if (process.env.NODE_ENV === "development") {
                console.log(`Server listening on port ${PORT}\n➜  Visit : http://localhost:${PORT}`);
            } else {
                console.log(`Server listening on port ${PORT}`);
            }
        });
    })
    .catch((error) => {
        console.log("MongoDB connection failed");
    });