import express from "express";
import { addUID } from "../middlewares/authMiddleware.js";
import { getUserList, updateUser, createUserFirebase, createUserDB } from "../controllers/userController.js";
// import { updateUser } from "../controllers/userController.js";
import { dgmAdminCheck } from "../middlewares/authMiddleware.js";
import { handleUserSignup } from "../controllers/authController.js";

const router = express.Router();

router.get("/user-list", [addUID, dgmAdminCheck], getUserList);
router.put("/user", [addUID, dgmAdminCheck], updateUser);

// CREATE User
router.post("/user", addUID, createUserFirebase, createUserDB);

export default router;
