const { normalizeEmail, hashPassword } = require("../auth/shared");
const { findUserByEmail } = require("./user");

function isValidEmail(email) {
  if (typeof email !== "string" || /\s/.test(email)) {
    return false;
  }

  const match = email.match(/^[^\s@]+@([^\s@]+\.[^\s@]+)$/);
  if (!match) {
    return false;
  }

  const allowedDomains = new Set([
    "gmail.com",
    "outlook.com",
    "hotmail.com",
    "live.com",
    "icloud.com",
    "me.com",
    "yahoo.com",
    "proton.me",
    "protonmail.com",
  ]);

  return allowedDomains.has(match[1].toLowerCase());
}

async function createUser(db, payload) {
  const nome = String(payload.nome || "").trim();
  const email = normalizeEmail(payload.email);
  const senha = String(payload.senha || "");
  const telefone = payload.telefone ? String(payload.telefone).trim() : null;
  const tipo = payload.tipo ? String(payload.tipo).trim() : "aluno";

  if (!nome || !email || !senha) {
    return { status: 400, body: { message: "nome, email e senha sao obrigatorios" } };
  }

  if (!isValidEmail(email)) {
    return { status: 400, body: { message: "email invalido: use um provedor permitido (gmail, outlook, icloud, etc)" } };
  }

  if (senha.length < 6) {
    return { status: 400, body: { message: "a senha deve ter pelo menos 6 caracteres" } };
  }

  const existingUser = await findUserByEmail(db, email);
  if (existingUser) {
    return { status: 409, body: { message: "email ja cadastrado" } };
  }

  const senhaHash = hashPassword(senha);

  if (!db || typeof db.createUser !== "function") {
    return { status: 500, body: { message: "armazenamento local indisponivel" } };
  }

  const user = await db.createUser({
    nome,
    email,
    senha: senhaHash,
    telefone,
    tipo,
  });

  return { status: 201, body: user };
}

module.exports = createUser;
