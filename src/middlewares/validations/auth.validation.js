// * ARCHIVO A COMPLETAR (RESUELTO)
// * Imports, role, profile.* y loginValidation ya resueltos
import { body } from "express-validator";
import { UserModel } from "../../models/sequelize/user.model.js";
import { ProfileModel } from "../../models/sequelize/profile.model.js";

export const registerValidation = [
  // TODO 1: de 3 a 20 caracteres (`isLength`), alfanumérico (`isAlphanumeric`) y único (`custom` con una consulta a la base, con `paranoid: false` para incluir a los usuarios eliminados lógicamente).
  body("username")
    .trim()
    .notEmpty()
    .withMessage("El username es obligatorio")
    .isLength({ min: 3, max: 20 })
    .withMessage("El username debe tener entre 3 y 20 caracteres")
    .isAlphanumeric()
    .withMessage("El username solo puede contener letras y números")
    .custom(async (username) => {
      const found = await UserModel.findOne({
        where: { username },
        paranoid: false,
      });
      if (found) throw new Error("El username ya está en uso");
      return true;
    }),

  // TODO 2: email válido (`isEmail`) y único (`custom` con una consulta a la base, también con `paranoid: false`).
  body("email")
    .trim()
    .isEmail()
    .withMessage("El email no es válido")
    .custom(async (email) => {
      const found = await UserModel.findOne({
        where: { email },
        paranoid: false,
      });
      if (found) throw new Error("El email ya está en uso");
      return true;
    }),

  // TODO 3: con un mínimo de 8 caracteres (`isLength`).
  body("password")
    .isLength({ min: 8 })
    .withMessage("La password debe tener al menos 8 caracteres"),

  body("role")
    .optional()
    .isIn(["user", "administrator"])
    .withMessage("El role debe ser user o administrator"),
  body("profile.nickname")
    .trim()
    .notEmpty()
    .withMessage("El nickname es obligatorio")
    .custom(async (nickname) => {
      const found = await ProfileModel.findOne({ where: { nickname } });
      if (found) throw new Error("El nickname ya está en uso");
      return true;
    }),
  body("profile.first_name")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("El first_name debe tener entre 2 y 50 caracteres"),
  body("profile.last_name")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("El last_name debe tener entre 2 y 50 caracteres"),
  body("profile.phone")
    .optional()
    .isNumeric()
    .withMessage("El phone solo puede contener números"),
];

export const loginValidation = [
  body("email").isEmail().withMessage("El email no es válido"),
  body("password").notEmpty().withMessage("La password es obligatoria"),
];
