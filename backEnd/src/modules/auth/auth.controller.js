import express from "express";
import { login } from "./auth.service.js";
import { adminLogin } from "./auth.validation.js";
import { isValid } from './../../middleware/validation.middleware.js';

const router = express.Router();

// /auth/login
router.post("/login",isValid(adminLogin) , login);

export default router;
