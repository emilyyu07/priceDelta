import { Router } from "express";
import { getHealth } from "../controllers/health.controller";
const router = Router();

//point root of router to the controller function
//verify that server is responsive to requests
router.get("/", getHealth);
export default router;
