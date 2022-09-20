import express from "express";
import auth from "../middlewares/auth.js";
const router = express.Router();

import { userRegister,userLogin,getAllUsers } from "../controllers/user.js";

router.post("/userRegister",userRegister);
router.post("/userLogin",userLogin);
router.get("/admin/getAllUsers",auth,getAllUsers)
export default router;