// * ARCHIVO A COMPLETAR (RESUELTO)
import { DataTypes } from "sequelize";
import { sequelize } from "../../config/sequelize.js";
import { UserModel } from "./user.model.js";

export const PlaylistModel = sequelize.define("Playlist", {
  // * id, name y visibility: ya implementados
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING(100), allowNull: false, unique: true },
  visibility: {
    type: DataTypes.ENUM("private", "public"),
    allowNull: false,
    defaultValue: "private",
  },
  // TODO 1: `owner_id`: tipo `INTEGER`, obligatorio (`allowNull`) y clave foránea (`references`) hacia el `id` del usuario (`UserModel`) dueño de la playlist.
  owner_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: UserModel, key: "id" },
  },
});

// TODO 2: Relacionar `UserModel` y `PlaylistModel` (1:N, en ambos sentidos): un usuario tiene muchas playlists y cada playlist pertenece a un usuario. Alias: `playlists` (desde `UserModel`) y `owner` (desde `PlaylistModel`). La relación debe usar el campo `owner_id` de `PlaylistModel` para unirlos.
UserModel.hasMany(PlaylistModel, { as: "playlists", foreignKey: "owner_id" });
PlaylistModel.belongsTo(UserModel, { as: "owner", foreignKey: "owner_id" });
