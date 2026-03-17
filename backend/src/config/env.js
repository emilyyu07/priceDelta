"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
require("dotenv/config");
const zod_1 = require("zod");
const envSchema = zod_1.z.object({
    DATABASE_URL: zod_1.z.string().min(1, "DATABASE_URL is required"),
    JWT_SECRET: zod_1.z
        .string()
        .min(32, "JWT_SECRET must be at least 32 characters"),
    REDIS_HOST: zod_1.z.string().default("127.0.0.1"),
    REDIS_PORT: zod_1.z.coerce.number().default(6379),
    PORT: zod_1.z.coerce.number().default(3001),
    NODE_ENV: zod_1.z
        .enum(["development", "production", "test"])
        .default("development"),
    FRONTEND_URL: zod_1.z.string().default("http://localhost:5173"),
    SMTP_HOST: zod_1.z.string().optional(),
    SMTP_PORT: zod_1.z.coerce.number().optional(),
    SMTP_USER: zod_1.z.string().optional(),
    SMTP_PASS: zod_1.z.string().optional(),
});
exports.env = envSchema.parse(process.env);
//# sourceMappingURL=env.js.map