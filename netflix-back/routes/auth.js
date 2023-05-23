import express from "express";
// import { login, deleteAccount } from "../controllers/auth.js";
import { register, login } from "../controllers/auth.js";

const router = express.Router();

router.post("/signup", register);
router.post("/login", login);
// router.delete("/:id/delete", deleteAccount);

export default router;
