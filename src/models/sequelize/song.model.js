// ! ARCHIVO BASE: no modificar
import { DataTypes } from "sequelize";
import { sequelize } from "../../config/sequelize.js";

export const SongModel = sequelize.define("Song", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING(100), allowNull: false, unique: true },
  artist: { type: DataTypes.STRING(100), allowNull: false },
});
