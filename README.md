# Integrador TLP II – API de playlists (MySQL + MongoDB)

API REST con **Express**, **Sequelize (MySQL)**, **Mongoose (MongoDB)** y **express-validator** (ESModules).

El proyecto usa **las dos bases de datos en paralelo, sin relación de datos entre ellas**:

- **MySQL (Sequelize):** usuarios con perfil, autenticación (bcrypt, JWT en cookie `httpOnly`) y el modelo de playlists y canciones con sus relaciones.
- **MongoDB (Mongoose):** el mismo dominio de playlists y canciones con documentos embebidos y referencias.

Los endpoints de **auth** trabajan con MySQL y los de **songs** con MongoDB.

## Instalación y configuración

1. Instalar dependencias:

   ```bash
   npm install
   ```

2. Tener **MySQL** y **MongoDB** corriendo en local, y crear la base de MySQL (`DB_NAME`):

   ```sql
   CREATE DATABASE integrador_playlists;
   ```

   La base de MongoDB se crea sola al insertar el primer documento.

3. Crear el archivo `.env` a partir de `.env.example` y completar los valores:

   ```bash
   cp .env.example .env
   ```

   Contenido de `.env.example`:

   ```
   PORT=3000
   DB_HOST=localhost
   DB_PORT=3306
   DB_NAME=integrador_playlists
   DB_USER=root
   DB_PASSWORD=
   JWT_SECRET=secreto
   MONGODB_URI=mongodb://127.0.0.1:27017/integrador_playlists
   ```

   | Variable      | Descripción                                          |
   | ------------- | ---------------------------------------------------- |
   | `PORT`        | Puerto del servidor (ej.: `3000`)                    |
   | `DB_HOST`     | Host de MySQL                                        |
   | `DB_PORT`     | Puerto de MySQL (ej.: `3306`)                        |
   | `DB_NAME`     | Nombre de la base de MySQL                           |
   | `DB_USER`     | Usuario de MySQL                                     |
   | `DB_PASSWORD` | Contraseña de MySQL                                  |
   | `JWT_SECRET`  | Clave con la que se firman los tokens                |
   | `MONGODB_URI` | Cadena de conexión de MongoDB                        |

4. Levantar el servidor en modo desarrollo:

   ```bash
   npm run dev
   ```

   Para producción: `npm start`. Al arrancar, `sync` crea las tablas de MySQL.

## Formato de respuestas

Todas las respuestas son JSON con la forma `{ message, data }` (salvo el logout, que responde `204` sin cuerpo).

| Código | Significado                                   |
| ------ | --------------------------------------------- |
| 200    | Consulta, actualización o eliminación exitosa |
| 201    | Recurso creado                                |
| 204    | Sesión cerrada (sin cuerpo)                   |
| 400    | Error de validación                           |
| 401    | Sin sesión iniciada o credenciales inválidas  |
| 403    | Sin permisos (se requiere administrator)      |
| 404    | Recurso inexistente                           |
| 500    | Error inesperado                              |

## Endpoints

### Auth – `/api/auth` (MySQL)

| Método | Ruta        | Acceso          |
| ------ | ----------- | --------------- |
| POST   | `/register` | público         |
| POST   | `/login`    | público         |
| POST   | `/logout`   | sesión iniciada |

### Songs – `/api/songs` (MongoDB)

| Método | Ruta   | Acceso                                  | Descripción                                                  |
| ------ | ------ | --------------------------------------- | ------------------------------------------------------------ |
| GET    | `/`    | sesión iniciada                         | Listar canciones (incluye sus playlists)                     |
| POST   | `/`    | sesión iniciada + administrator         | Crear una canción                                            |
| DELETE | `/:id` | sesión iniciada + administrator         | Eliminar una canción (se quita de las playlists que la usan) |

Para crear canciones hay que iniciar sesión con un usuario con `role: "administrator"` (se registra con `POST /api/auth/register` enviando `"role": "administrator"`).

## Datos de prueba (MongoDB)

La API no tiene endpoints para los usuarios ni para las playlists de MongoDB: se cargan directamente con mongosh. Las canciones se crean por la API (guardá su `_id`).

Usuario:

```js
db.users.insertOne({
  username: "usuario1",
  email: "usuario1@mail.com",
  profile: { nickname: "user1", firstName: "Ana", lastName: "Gomez" },
  deletedAt: null,
});
```

Playlist que referencia a una canción (reemplazá los `_id` por los reales):

```js
db.playlists.insertOne({
  name: "Mi playlist",
  visibility: "public",
  cover: { color: "blue", imageUrl: "https://example.com/cover.jpg" },
  owner: ObjectId("ID_DEL_USUARIO"),
  songs: [ObjectId("ID_DE_LA_CANCION")],
});
```

## Postman

Importar `Integrador.postman_collection.json`. La variable `baseUrl` apunta a `http://localhost:3000`. Ejecutar la colección de arriba hacia abajo: las variables (`songId`, los emails...) se completan solas. `ownerId` es solo una referencia: pegá ahí el `_id` del usuario que cargaste en MongoDB si querés armar la playlist de prueba.

## Estructura

```
app.js
src/
├── config/        conexiones: sequelize.js y mongoose.js
├── helpers/       bcrypt y jwt
├── middlewares/   auth, admin, validator y validations/
├── models/
│   ├── sequelize/ user, profile, playlist, song, playlist_song
│   └── mongoose/  user, song, playlist
├── controllers/   auth, songs
└── routes/        auth, songs
```
