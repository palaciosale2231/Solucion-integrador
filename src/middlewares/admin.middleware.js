// ! ARCHIVO BASE: no modificar
export const adminMiddleware = (req, res, next) => {
  if (req.user?.role !== "administrator") {
    return res.status(403).json({ message: "Acceso denegado", data: null });
  }
  next();
};
