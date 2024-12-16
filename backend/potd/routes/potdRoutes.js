import { Router } from "express";
import {
  gfgController,
  leetcodeController,
} from "../controllers/potdController.js";
const router = Router();

// GET route for POTD
router.get("/leetcode", leetcodeController);
router.get("/gfg", gfgController);

export default router;
