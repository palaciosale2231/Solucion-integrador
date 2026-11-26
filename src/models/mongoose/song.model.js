// * ARCHIVO A COMPLETAR (RESUELTO)
import { Schema, model } from "mongoose";

const songSchema = new Schema(
  {
    // * title y artist: ya implementados
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    artist: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    // TODO 2: configurar toJSON y toObject para que incluyan los virtuals (`virtuals`).
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// TODO 1: definir el virtual populate "playlists": playlists que incluyen esta canción en su array songs (`ref`, `localField`, `foreignField`).
songSchema.virtual("playlists", {
  ref: "Playlist",
  localField: "_id",
  foreignField: "songs",
});

const Song = model("Song", songSchema);

export default Song;
