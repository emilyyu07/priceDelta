"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_js_1 = __importDefault(require("../config/prisma.js"));
const JWT_SECRET = process.env.JWT_SECRET;
const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            if (!JWT_SECRET) {
                return res
                    .status(500)
                    .json({ message: "Internal server issue: JWT Secret is missing." });
            }
            const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
            const user = await prisma_js_1.default.user.findUnique({
                where: { id: decoded.userId },
                select: { id: true, email: true, name: true, createdAt: true },
            });
            if (!user) {
                return res
                    .status(401)
                    .json({ message: "Not authorized, user not found" });
            }
            req.user = user;
            next();
        }
        catch (error) {
            console.error(error);
            return res.status(401).json({ message: "Not authorized, token failed" });
        }
    }
    else {
        return res.status(401).json({ message: "Not authorized, no token" });
    }
};
exports.protect = protect;
//# sourceMappingURL=auth.middleware.js.map