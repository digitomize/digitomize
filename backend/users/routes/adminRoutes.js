import express from "express";
import { addUID } from "../middlewares/authMiddleware.js";
import { getUserList, updateUser } from "../controllers/userController.js";

const router = express.Router();

router.get("/user-list", addUID, getUserList);
router.put("/user", addUID, updateUser);

export default router;
