import { Router } from "express";
import { loginUser, registerUser } from "../workers/authenticator";

const router = Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await loginUser(email, password);

    res.json(result);
  } catch (err: any) {
    res.status(401).json({ error: "Invalid credentials." });
  }
});

router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const { token, user } = await registerUser(email, password);
    res.status(201).json({ token, user });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
