import express from 'express'
import { addUID } from '../middlewares/authMiddleware.js'
import { getUserList, updateUser } from '../controllers/AdminUserController.js'
import {
  createUserFirebase,
  createUserDB,
} from '../controllers/AdminUserController.js'
import {
  deleteUserFirebase,
  deleteUserDB,
} from '../controllers/AdminUserController.js'
// import { updateUser } from "../controllers/userController.js";
import { dgmAdminCheck } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.get('/user-list', [addUID, dgmAdminCheck], getUserList)
router.put('/user', [addUID, dgmAdminCheck], updateUser)

// CREATE User
router.post('/user', [addUID, dgmAdminCheck], createUserFirebase, createUserDB)
router.delete(
  '/user',
  [addUID, dgmAdminCheck],
  deleteUserFirebase,
  deleteUserDB
)

export default router
