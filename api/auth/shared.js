const crypto = require("crypto");
const jwt = require("jwt-simple");
const { authSecret, authExpiresInSeconds } = require("../../environment");

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hashed = crypto.scryptSync(password, salt, 64).toString("hex");
  return `scrypt$${salt}$${hashed}`;
}

function verifyPassword(password, stored) {
  if (!stored) return false;

  // Compatibilidade com registros legados em texto plano.
  if (!stored.startsWith("scrypt$")) {
    return password === stored;
  }

  const parts = stored.split("$");
  if (parts.length !== 3) return false;

  const salt = parts[1];
  const hash = parts[2];
  const candidate = crypto.scryptSync(password, salt, 64).toString("hex");

  return crypto.timingSafeEqual(Buffer.from(candidate, "hex"), Buffer.from(hash, "hex"));
}

function sanitizeUser(user) {
  return {
    id: user.id,
    nome: user.nome,
    email: user.email,
    telefone: user.telefone,
    tipo: user.tipo,
    ativo: Boolean(user.ativo),
    altura: user.altura,
    peso: user.peso,
    objetivo: user.objetivo,
    nivel_experiencia: user.nivel_experiencia,
    foto_perfil: user.foto_perfil,
    data_criacao: user.data_criacao,
    data_atualizacao: user.data_atualizacao,
  };
}

function buildToken(user) {
  const nowInSeconds = Math.floor(Date.now() / 1000);
  const payload = {
    id: user.id,
    email: user.email,
    tipo: user.tipo,
    iat: nowInSeconds,
    exp: nowInSeconds + authExpiresInSeconds,
  };

  return jwt.encode(payload, authSecret);
}

module.exports = {
  normalizeEmail,
  hashPassword,
  verifyPassword,
  sanitizeUser,
  buildToken,
};
