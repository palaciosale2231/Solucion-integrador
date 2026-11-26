// * ARCHIVO A COMPLETAR (RESUELTO)
import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    // * username, email y profile (documento embebido 1:1): ya implementados
    username: { type: String, required: true, unique: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    profile: {
      type: new Schema(
        {
          nickname: { type: String, required: true },
          firstName: { type: String, required: true },
          lastName: { type: String, required: true },
          phone: { type: String },
        },
        { _id: false },
      ),
      required: true,
    },

    // TODO 1: agregar el campo deletedAt para la eliminación lógica (tipo Date, valor por defecto null con `default`).
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
    versionKey: false,
    // TODO 3: configurar toJSON y toObject para que incluyan los virtuals (`virtuals`).
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// TODO 2: definir el virtual populate "playlists": playlists cuyo campo owner referencia a este usuario (`ref`, `localField`, `foreignField`).
userSchema.virtual("playlists", {
  ref: "Playlist",
  localField: "_id",
  foreignField: "owner",
});

const User = model("User", userSchema);

export default User;
