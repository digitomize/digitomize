import express from "express";
import { addUID } from "../middlewares/authMiddleware.js";
import { getUserList } from "../controllers/userController.js";
import { updateUser } from "../services/updateUser.js";

const router = express.Router();

router.get("/user-list", addUID, getUserList);
router.put("/user", addUID, updateUser);
export default router;
