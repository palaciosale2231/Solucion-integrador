// ! ARCHIVO BASE: no modificar
import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectSequelize } from "./src/config/sequelize.js";
import { connectMongoose } from "./src/config/mongoose.js";
// ! Estos imports cargan los modelos de Sequelize con sus asociaciones (Playlist <-> Song y User <-> Profile) para que sync cree las tablas. Ningún controller los importa.
import "./src/models/sequelize/playlist_song.model.js";
import "./src/models/sequelize/profile.model.js";
import authRoutes from "./src/routes/auth.routes.js";
import songsRoutes from "./src/routes/songs.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/songs", songsRoutes);

app.listen(PORT, async () => {
  await connectSequelize();
  await connectMongoose();
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
