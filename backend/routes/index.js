const { Router } = require("express");

const router = Router();

// Routes under /routes
const userRoutes = require("./user");

// Registering
router.use("/api", userRoutes);


module.exports = router;