"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const zod_1 = require("zod");
const validate_js_1 = require("../middleware/validate.js");
const authenticator_1 = require("../workers/authenticator");
const router = (0, express_1.Router)();
const authSchema = zod_1.z.object({
    email: zod_1.z.string().email("A valid email is required."),
    password: zod_1.z.string().min(8, "Password must be at least 8 characters."),
});
const authLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: { error: "Too many attempts, please try again later." },
    standardHeaders: true,
    legacyHeaders: false,
});
router.post("/login", authLimiter, (0, validate_js_1.validate)(authSchema), async (req, res) => {
    try {
        const { email, password } = req.body;
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
router.post("/register", authLimiter, (0, validate_js_1.validate)(authSchema), async (req, res) => {
    try {
        const { email, password } = req.body;
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