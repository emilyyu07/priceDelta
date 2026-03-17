import express from "express";
import request from "supertest";
import { describe, expect, it, vi, beforeEach } from "vitest";

vi.mock("../workers/authenticator", () => ({
  loginUser: vi.fn(),
  registerUser: vi.fn(),
}));

import authRoutes from "./auth.routes";
import { loginUser, registerUser } from "../workers/authenticator";

describe("auth routes", () => {
  const app = express();
  app.use(express.json());
  app.use("/api/auth", authRoutes);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("register returns token and user", async () => {
    vi.mocked(registerUser).mockResolvedValue({
      token: "token-1",
      user: { id: "u1", email: "test@example.com" },
    });

    const res = await request(app).post("/api/auth/register").send({
      email: "test@example.com",
      password: "Password1",
    });

    expect(res.status).toBe(201);
    expect(res.body).toEqual({
      token: "token-1",
      user: { id: "u1", email: "test@example.com" },
    });
  });

  it("register duplicate email returns 400", async () => {
    vi.mocked(registerUser).mockRejectedValue(
      new Error("An account with this email already exists."),
    );

    const res = await request(app).post("/api/auth/register").send({
      email: "test@example.com",
      password: "Password1",
    });

    expect(res.status).toBe(400);
  });

  it("login with wrong password returns 401", async () => {
    vi.mocked(loginUser).mockRejectedValue(new Error("Invalid credentials."));

    const res = await request(app).post("/api/auth/login").send({
      email: "test@example.com",
      password: "WrongPass1",
    });

    expect(res.status).toBe(401);
  });

  it("login with correct credentials returns token", async () => {
    vi.mocked(loginUser).mockResolvedValue({
      token: "token-2",
      user: { id: "u1", email: "test@example.com" },
    });

    const res = await request(app).post("/api/auth/login").send({
      email: "test@example.com",
      password: "Password1",
    });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      token: "token-2",
      user: { id: "u1", email: "test@example.com" },
    });
  });
});

