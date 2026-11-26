// ! ARCHIVO BASE: no modificar
import { Router } from "express";
import { create, getAll, remove } from "../controllers/songs.controller.js";
import {
  createSongValidation,
  songIdValidation,
} from "../middlewares/validations/song.validation.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";
import { validator } from "../middlewares/validator.middleware.js";

const router = Router();

router.get("/", authMiddleware, getAll);
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  createSongValidation,
  validator,
  create,
);
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  songIdValidation,
  validator,
  remove,
);

export default router;
