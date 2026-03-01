"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticator_1 = require("../workers/authenticator");
const router = (0, express_1.Router)();
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await (0, authenticator_1.loginUser)(email, password);
        res.json(result);
    }
    catch (err) {
        res.status(401).json({ error: "Invalid credentials." });
    }
});
router.post("/register", async (req, res) => {
    try {
        const { email, password } = req.body;
        const { token, user } = await (0, authenticator_1.registerUser)(email, password);
        res.status(201).json({ token, user });
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
});
exports.default = router;
//# sourceMappingURL=auth.routes.js.map