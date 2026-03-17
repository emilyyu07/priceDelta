"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticator_1 = require("../workers/authenticator");
const router = (0, express_1.Router)();
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res
                .status(400)
                .json({ error: "Email and password are required." });
        }
        const result = await (0, authenticator_1.loginUser)(email, password);
        res.json(result);
    }
    catch (err) {
        const message = err instanceof Error ? err.message : "Authentication failed.";
        const status = message === "Invalid credentials."
            ? 401
            : message === "Email and password are required."
                ? 400
                : 500;
        res.status(status).json({ error: message });
    }
});
router.post("/register", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res
                .status(400)
                .json({ error: "Email and password are required." });
        }
        const { token, user } = await (0, authenticator_1.registerUser)(email, password);
        res.status(201).json({ token, user });
    }
    catch (err) {
        const message = err instanceof Error ? err.message : "Registration failed.";
        const status = message === "An account with this email already exists." ||
            message === "Email and password are required."
            ? 400
            : 500;
        res.status(status).json({ error: message });
    }
});
exports.default = router;
//# sourceMappingURL=auth.routes.js.map