// * ARCHIVO A COMPLETAR (RESUELTO)
// * Consultas a la base, matchedData y respuestas ya resueltos: solo falta la parte de bcrypt, JWT y cookie
import { matchedData } from "express-validator";
import { UserModel } from "../models/sequelize/user.model.js";
import { ProfileModel } from "../models/sequelize/profile.model.js";
import { hashPassword, comparePassword } from "../helpers/bcrypt.helper.js";
import { signToken } from "../helpers/jwt.helper.js";

export const register = async (req, res) => {
  try {
    const { username, email, password, role, profile } = matchedData(req);

    // TODO 1: No guardar la contraseña recibida (`password`) en texto plano: transformarla antes de crear el usuario con `hashPassword`. El resultado debe quedar en `hashedPassword`.
    const hashedPassword = await hashPassword(password);

    const user = await UserModel.create(
      { username, email, password: hashedPassword, role, profile },
      { include: [{ model: ProfileModel, as: "profile" }] },
    );

    const { password: _password, ...data } = user.toJSON();
    return res
      .status(201)
      .json({ message: "Usuario registrado correctamente", data });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error interno del servidor", data: null });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = matchedData(req);

    const user = await UserModel.findOne({ where: { email } });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Credenciales inválidas", data: null });
    }

    // TODO 2: Verificar con `comparePassword` si la contraseña enviada (`password`) corresponde a la guardada en el usuario (`user.password`). El resultado debe quedar en `isMatch`.
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Credenciales inválidas", data: null });
    }

    // TODO 3: Generar con `signToken` el token de sesión del usuario, con su `id` y su `role` (`user.id`, `user.role`), para saber quién es y qué rol tiene. Guardarlo en `token`.
    const token = signToken({ id: user.id, role: user.role });

    // TODO 4: Entregar el token al cliente con `res.cookie`, en una cookie llamada `token`, de modo que el navegador la guarde pero no pueda leerse desde JavaScript (`httpOnly`).
    res.cookie("token", token, { httpOnly: true });

    return res.status(200).json({ message: "Login exitoso", data: null });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error interno del servidor", data: null });
  }
};

export const logout = async (req, res) => {
  try {
    // TODO 1: Cerrar la sesión del usuario en el cliente borrando la cookie `token` con `res.clearCookie`.
    res.clearCookie("token");

    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error interno del servidor", data: null });
  }
};
