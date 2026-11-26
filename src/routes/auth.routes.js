// ! ARCHIVO BASE: no modificar
import { Router } from "express";
import { register, login, logout } from "../controllers/auth.controller.js";
import {
  registerValidation,
  loginValidation,
} from "../middlewares/validations/auth.validation.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validator } from "../middlewares/validator.middleware.js";

const router = Router();

router.post("/register", registerValidation, validator, register);
router.post("/login", loginValidation, validator, login);
router.post("/logout", authMiddleware, logout);

export default router;
