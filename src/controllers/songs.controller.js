// * ARCHIVO A COMPLETAR (RESUELTO)
// * create ya resuelto: faltan getAll y remove (con la eliminación en cascada)
// * Estructura de cada método ya resuelta: try-catch, lectura de datos, manejo de errores y respuesta final
import { matchedData } from "express-validator";
import Song from "../models/mongoose/song.model.js";
import Playlist from "../models/mongoose/playlist.model.js";

export const create = async (req, res) => {
  try {
    const data = matchedData(req);

    const song = await Song.create(data);

    return res
      .status(201)
      .json({ message: "Canción creada correctamente", data: song });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error interno del servidor", data: null });
  }
};

export const getAll = async (req, res) => {
  try {
    let songs;

    // TODO 1: consultar todas las canciones con populate de su virtual playlists (traer solo name y visibility). Guardar el resultado en songs.
    songs = await Song.find().populate("playlists", "name visibility");

    return res
      .status(200)
      .json({ message: "Canciones obtenidas correctamente", data: songs });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error interno del servidor", data: null });
  }
};

export const remove = async (req, res) => {
  try {
    const { id } = matchedData(req);
    let song = null;

    // TODO 2: eliminar la canción por id y, en cascada, quitarla del array songs de todas las playlists que la referencian. Guardar la canción eliminada en song.
    song = await Song.findByIdAndDelete(id);

    if (song) {
      const playlists = await Playlist.find({ songs: song._id });

      for (const playlist of playlists) {
        playlist.songs = playlist.songs.filter(
          (songId) => songId.toString() !== song._id.toString(),
        );
        await playlist.save();
      }
    }

    if (!song) {
      return res
        .status(404)
        .json({ message: "Canción no encontrada", data: null });
    }

    return res
      .status(200)
      .json({ message: "Canción eliminada correctamente", data: null });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error interno del servidor", data: null });
  }
};
