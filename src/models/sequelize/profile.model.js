// * ARCHIVO A COMPLETAR (RESUELTO)
import { DataTypes } from "sequelize";
import { sequelize } from "../../config/sequelize.js";
import { UserModel } from "./user.model.js";

export const ProfileModel = sequelize.define("Profile", {
  // TODO 1: `user_id`: tipo `INTEGER`, obligatorio (`allowNull`), único (`unique`) y clave foránea (`references`) hacia el `id` del usuario (`UserModel`) dueño del perfil.
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    references: { model: UserModel, key: "id" },
  },
  // * nickname, first_name, last_name y phone: ya implementados
  nickname: { type: DataTypes.STRING(30), allowNull: false, unique: true },
  first_name: { type: DataTypes.STRING(50), allowNull: false },
  last_name: { type: DataTypes.STRING(50), allowNull: false },
  phone: { type: DataTypes.STRING(20), allowNull: true },
});

// TODO 2: Relacionar `UserModel` y `ProfileModel` (1:1, en ambos sentidos): un usuario tiene un único perfil y cada perfil pertenece a un usuario. Alias: `profile` (desde `UserModel`) y `user` (desde `ProfileModel`). La relación debe usar el campo `user_id` de `ProfileModel` para unirlos.
UserModel.hasOne(ProfileModel, { as: "profile", foreignKey: "user_id" });
ProfileModel.belongsTo(UserModel, { as: "user", foreignKey: "user_id" });
