const jwt = require("jwt-simple");
const { authSecret } = require("../../environment");

function authMiddleware(req, res, next) {
  // Pega o token do header Authorization
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ message: "Token de autenticação não fornecido" });
  }

  // Aceita formato "Bearer <token>" ou só o token
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7)
    : authHeader;

  if (!token) {
    return res.status(401).json({ message: "Token de autenticação inválido" });
  }

  try {
    const payload = jwt.decode(token, authSecret);

    // Verifica se o token expirou
    const nowInSeconds = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < nowInSeconds) {
      return res.status(401).json({ message: "Token expirado, faça login novamente" });
    }

    // Injeta os dados do usuário na requisição
    req.user = {
      id: payload.id,
      email: payload.email,
      tipo: payload.tipo,
    };

    return next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" });
  }
}

module.exports = authMiddleware;