function adminMiddleware(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ message: "Não autenticado" });
  }

  if (req.user.tipo !== "admin") {
    return res.status(403).json({ message: "Acesso negado — apenas administradores" });
  }

  return next();
}

module.exports = adminMiddleware;