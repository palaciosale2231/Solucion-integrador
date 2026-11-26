// * ARCHIVO A COMPLETAR (RESUELTO)
import { Schema, model } from "mongoose";

// Documento embebido (1:1)
const coverSchema = new Schema(
  {
    color: {
      type: String,
      required: true,
      enum: ["red", "blue", "green", "black"],
    },
    imageUrl: { type: String, required: true, trim: true },
  },
  { _id: false },
);

const playlistSchema = new Schema(
  {
    // * name y visibility: ya implementados
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    visibility: {
      type: String,
      enum: ["private", "public"],
      default: "private",
    },

    // TODO 1: cover: documento embebido 1:1. El campo cover es un objeto que contiene dos campos propios, cada uno con su definición:
    //   - color: String, obligatorio (`required`), valores permitidos (`enum`): ["red", "blue", "green", "black"].
    //   - imageUrl: String, obligatorio (`required`).
    cover: { type: coverSchema, required: true },

    // TODO 2: owner (ObjectId, obligatorio (`required`), referencia (`ref`) al modelo User).
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // TODO 3: songs (array de ObjectId con referencia (`ref`) al modelo Song).
    songs: [{ type: Schema.Types.ObjectId, ref: "Song" }],
  },
  { timestamps: true, versionKey: false },
);

const Playlist = model("Playlist", playlistSchema);

export default Playlist;
