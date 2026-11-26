// * ARCHIVO A COMPLETAR (RESUELTO)
// * Imports ya resueltos
import { body, param } from "express-validator";
import Song from "../../models/mongoose/song.model.js";

export const createSongValidation = [
  // TODO 1: de 2 a 100 caracteres (`isLength`) y único (`custom` con una consulta a la base).
  body("title")
    .trim()
    .notEmpty()
    .withMessage("El título es obligatorio")
    .bail()
    .isLength({ min: 2, max: 100 })
    .withMessage("El título debe tener entre 2 y 100 caracteres")
    .bail()
    .custom(async (value) => {
      const song = await Song.findOne({ title: value });
      if (song) {
        throw new Error("Ya existe una canción con ese título");
      }
      return true;
    }),

  // TODO 2: de 2 a 50 caracteres (`isLength`).
  body("artist")
    .trim()
    .notEmpty()
    .withMessage("El artista es obligatorio")
    .bail()
    .isLength({ min: 2, max: 50 })
    .withMessage("El artista debe tener entre 2 y 50 caracteres"),
];

export const songIdValidation = [
  // TODO 3: ID de MongoDB válido (`isMongoId`).
  param("id").isMongoId().withMessage("El ID de la canción no es válido"),
];
