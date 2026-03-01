"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.getMe = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const getMe = async (req, res) => {
    res.status(200).json(req.user);
};
exports.getMe = getMe;
const updateUser = async (req, res, next) => {
    try {
        const { id } = req.user; // Get user ID from authenticated request
        const { name } = req.body; // Get name from request body
        const updatedUser = await prisma_1.default.user.update({
            where: { id },
            data: { name },
            select: { id: true, email: true, name: true }, // Select fields to return
        });
        res.status(200).json(updatedUser);
    }
    catch (error) {
        next(error); // Pass error to global error handler
    }
};
exports.updateUser = updateUser;
//# sourceMappingURL=user.controller.js.map