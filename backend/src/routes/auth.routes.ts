import { Router } from "express";
import rateLimit from "express-rate-limit";
import { z } from "zod";
import { validate } from "../middleware/validate.js";
import { loginUser, registerUser } from "../workers/authenticator";

const router = Router();
const authSchema = z.object({
  email: z.string().email("A valid email is required."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: "Too many attempts, please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post("/login", authLimiter, validate(authSchema), async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await loginUser(email, password);

    res.json(result);
  } catch (err: any) {
    const message =
      err instanceof Error ? err.message : "Authentication failed.";
    const status =
      message === "Invalid credentials."
        ? 401
        : message === "Email and password are required."
          ? 400
          : 500;

    res.status(status).json({ error: message });
  }
});

router.post(
  "/register",
  authLimiter,
  validate(authSchema),
  async (req, res) => {
    try {
      const { email, password } = req.body;

      const { token, user } = await registerUser(email, password);
      res.status(201).json({ token, user });
    } catch (err: any) {
      const message =
        err instanceof Error ? err.message : "Registration failed.";
      const status =
        message === "An account with this email already exists." ||
        message === "Email and password are required."
          ? 400
          : 500;

      res.status(status).json({ error: message });
    }
  },
);

export default router;
