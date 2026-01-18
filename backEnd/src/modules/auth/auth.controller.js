import express from "express";
import { login } from "./auth.service.js";

const router = express.Router();

// /auth/login
router.post("/login", login);

export default router;
