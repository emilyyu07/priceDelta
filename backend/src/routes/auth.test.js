"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const supertest_1 = __importDefault(require("supertest"));
const vitest_1 = require("vitest");
vitest_1.vi.mock("../workers/authenticator", () => ({
    loginUser: vitest_1.vi.fn(),
    registerUser: vitest_1.vi.fn(),
}));
const auth_routes_1 = __importDefault(require("./auth.routes"));
const authenticator_1 = require("../workers/authenticator");
(0, vitest_1.describe)("auth routes", () => {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use("/api/auth", auth_routes_1.default);
    (0, vitest_1.beforeEach)(() => {
        vitest_1.vi.clearAllMocks();
    });
    (0, vitest_1.it)("register returns token and user", async () => {
        vitest_1.vi.mocked(authenticator_1.registerUser).mockResolvedValue({
            token: "token-1",
            user: { id: "u1", email: "test@example.com" },
        });
        const res = await (0, supertest_1.default)(app).post("/api/auth/register").send({
            email: "test@example.com",
            password: "Password1",
        });
        (0, vitest_1.expect)(res.status).toBe(201);
        (0, vitest_1.expect)(res.body).toEqual({
            token: "token-1",
            user: { id: "u1", email: "test@example.com" },
        });
    });
    (0, vitest_1.it)("register duplicate email returns 400", async () => {
        vitest_1.vi.mocked(authenticator_1.registerUser).mockRejectedValue(new Error("An account with this email already exists."));
        const res = await (0, supertest_1.default)(app).post("/api/auth/register").send({
            email: "test@example.com",
            password: "Password1",
        });
        (0, vitest_1.expect)(res.status).toBe(400);
    });
    (0, vitest_1.it)("login with wrong password returns 401", async () => {
        vitest_1.vi.mocked(authenticator_1.loginUser).mockRejectedValue(new Error("Invalid credentials."));
        const res = await (0, supertest_1.default)(app).post("/api/auth/login").send({
            email: "test@example.com",
            password: "WrongPass1",
        });
        (0, vitest_1.expect)(res.status).toBe(401);
    });
    (0, vitest_1.it)("login with correct credentials returns token", async () => {
        vitest_1.vi.mocked(authenticator_1.loginUser).mockResolvedValue({
            token: "token-2",
            user: { id: "u1", email: "test@example.com" },
        });
        const res = await (0, supertest_1.default)(app).post("/api/auth/login").send({
            email: "test@example.com",
            password: "Password1",
        });
        (0, vitest_1.expect)(res.status).toBe(200);
        (0, vitest_1.expect)(res.body).toEqual({
            token: "token-2",
            user: { id: "u1", email: "test@example.com" },
        });
    });
});
//# sourceMappingURL=auth.test.js.map