"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = __importDefault(require("../config/prisma"));
require("dotenv/config");
const JWT_SECRET = process.env.JWT_SECRET;
const registerUser = async (email, password) => {
    if (!JWT_SECRET) {
        throw new Error("Internal servor issue: JWT Secret is missing.");
    }
    const hashedPassword = await bcryptjs_1.default.hash(password, 10);
    const newUser = await prisma_1.default.user.create({
        data: { email, password: hashedPassword },
        select: { id: true, email: true },
    });
    const token = jsonwebtoken_1.default.sign({ userId: newUser.id }, JWT_SECRET, { expiresIn: "1h" });
    return { token, user: newUser };
};
exports.registerUser = registerUser;
const loginUser = async (email, password) => {
    if (!JWT_SECRET) {
        throw new Error("Internal servor issue: JWT Secret is missing.");
    }
    const user = await prisma_1.default.user.findUnique({ where: { email } });
    if (!user) {
        throw new Error("Invalid credentials.");
    }
    const isValid = await bcryptjs_1.default.compare(password, user.password);
    if (!isValid) {
        throw new Error("Invalid credentials.");
    }
    const token = jsonwebtoken_1.default.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1h" });
    return { token, user: { id: user.id, email: user.email } };
};
exports.loginUser = loginUser;
//# sourceMappingURL=authenticator.js.map