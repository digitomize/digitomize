import express from "express";
import { addUID, dgmAdminCheck } from "../middlewares/authMiddleware.js";
import {
  getUserList,
  updateUser,
  createUserFirebase,
  createUserDB,
  deleteUserFirebase,
  deleteUserDB,
} from "../controllers/AdminUserController.js";
// import { updateUser } from "../controllers/userController.js";

const router = express.Router();

router.get("/user-list", [addUID, dgmAdminCheck], getUserList);
router.put("/user", [addUID, dgmAdminCheck], updateUser);

// CREATE User
router.post("/user", [addUID, dgmAdminCheck], createUserFirebase, createUserDB);
router.delete(
  "/user",
  [addUID, dgmAdminCheck],
  deleteUserFirebase,
  deleteUserDB,
);

export default router;
