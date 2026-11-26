// * ARCHIVO A COMPLETAR (RESUELTO)
import { DataTypes } from "sequelize";
import { sequelize } from "../../config/sequelize.js";
import { PlaylistModel } from "./playlist.model.js";
import { SongModel } from "./song.model.js";

export const PlaylistSongModel = sequelize.define(
  "PlaylistSong",
  {
    // TODO 1: `playlist_id` y `song_id`: tipo `INTEGER`, obligatorios (`allowNull`) y claves foráneas (`references`): `playlist_id` hacia el `id` de `PlaylistModel` y `song_id` hacia el `id` de `SongModel`.
    playlist_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: PlaylistModel, key: "id" },
    },
    song_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: SongModel, key: "id" },
    },
  },
  {
    // TODO 2: En las opciones del modelo, desactivar las columnas `createdAt` y `updatedAt` (`timestamps`).
    timestamps: false,
  },
);

// TODO 3: Relacionar `PlaylistModel` con `SongModel` (N:M): una playlist tiene muchas canciones, a través de la tabla intermedia `PlaylistSongModel`. Alias: `songs`. Debe usar los campos `playlist_id` (apunta a la playlist) y `song_id` (apunta a la canción) de `PlaylistSongModel`.
PlaylistModel.belongsToMany(SongModel, {
  as: "songs",
  through: PlaylistSongModel,
  foreignKey: "playlist_id",
  otherKey: "song_id",
});

// TODO 4: Relacionar `SongModel` con `PlaylistModel` (N:M): una canción puede estar en muchas playlists, a través de la tabla intermedia `PlaylistSongModel`. Alias: `playlists`. Debe usar los campos `song_id` (apunta a la canción) y `playlist_id` (apunta a la playlist) de `PlaylistSongModel`.
SongModel.belongsToMany(PlaylistModel, {
  as: "playlists",
  through: PlaylistSongModel,
  foreignKey: "song_id",
  otherKey: "playlist_id",
});
