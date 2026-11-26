// * ARCHIVO A COMPLETAR (RESUELTO)
import { DataTypes } from "sequelize";
import { sequelize } from "../../config/sequelize.js";

export const UserModel = sequelize.define(
  "User",
  {
    // * username, email, password y role: ya implementados
    username: { type: DataTypes.STRING(20), allowNull: false, unique: true },
    email: { type: DataTypes.STRING(100), allowNull: false, unique: true },
    password: { type: DataTypes.STRING(255), allowNull: false },
    role: {
      type: DataTypes.ENUM("user", "administrator"),
      allowNull: false,
      defaultValue: "user",
    },
  },
  {
    // TODO 1: En las opciones de `UserModel`, activar el borrado lógico (`paranoid`): al eliminar un usuario no se borra la fila, solo se completa la columna `deletedAt`.
    paranoid: true,
  },
);
