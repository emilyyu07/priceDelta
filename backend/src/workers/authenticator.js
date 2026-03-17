"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = __importDefault(require("../config/prisma"));
const env_js_1 = require("../config/env.js");
require("dotenv/config");
const registerUser = async (email, password) => {
    // Normalize email to lowercase for consistency
    const normalizedEmail = email.toLowerCase().trim();
    if (!normalizedEmail || !password) {
        throw new Error("Email and password are required.");
    }
    const existingUser = await prisma_1.default.user.findUnique({
        where: { email: normalizedEmail },
        select: { id: true },
    });
    if (existingUser) {
        throw new Error("An account with this email already exists.");
    }
    const hashedPassword = await bcryptjs_1.default.hash(password, 10);
    const newUser = await prisma_1.default.user.create({
        data: { email: normalizedEmail, password: hashedPassword },
        select: { id: true, email: true },
    });
    const token = jsonwebtoken_1.default.sign({ userId: newUser.id }, env_js_1.env.JWT_SECRET, {
        expiresIn: "1h",
    });
    return { token, user: newUser };
};
exports.registerUser = registerUser;
const loginUser = async (email, password) => {
    // Normalize email to lowercase for case-insensitive lookup
    const normalizedEmail = email.toLowerCase().trim();
    if (!normalizedEmail || !password) {
        throw new Error("Email and password are required.");
    }
    const user = await prisma_1.default.user.findUnique({
        where: { email: normalizedEmail },
    });
    if (!user) {
        throw new Error("Invalid credentials.");
    }
    const isValid = await bcryptjs_1.default.compare(password, user.password);
    if (!isValid) {
        throw new Error("Invalid credentials.");
    }
    const token = jsonwebtoken_1.default.sign({ userId: user.id }, env_js_1.env.JWT_SECRET, {
        expiresIn: "1h",
    });
    return { token, user: { id: user.id, email: user.email } };
};
exports.loginUser = loginUser;
//# sourceMappingURL=authenticator.js.map