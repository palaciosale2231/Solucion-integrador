// ! ARCHIVO BASE: no modificar
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    logging: false,
  },
);

export const connectSequelize = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("MySQL conectado");
  } catch (error) {
    console.error("Error al conectar con MySQL:", error.message);
  }
};
