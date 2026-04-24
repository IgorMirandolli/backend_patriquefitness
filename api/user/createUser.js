const { normalizeEmail, hashPassword } = require("../auth/shared");
const { findUserByEmail } = require("./user");

async function createUser(db, payload) {
  const nome = String(payload.nome || "").trim();
  const email = normalizeEmail(payload.email);
  const senha = String(payload.senha || "");
  const telefone = payload.telefone ? String(payload.telefone).trim() : null;
  const tipo = payload.tipo ? String(payload.tipo).trim() : "aluno";

  if (!nome || !email || !senha) {
    return { status: 400, body: { message: "nome, email e senha sao obrigatorios" } };
  }

  if (senha.length < 6) {
    return { status: 400, body: { message: "a senha deve ter pelo menos 6 caracteres" } };
  }

  const existingUser = await findUserByEmail(db, email);
  if (existingUser) {
    return { status: 409, body: { message: "email ja cadastrado" } };
  }

  const senhaHash = hashPassword(senha);

  const [result] = await db.query(
    "INSERT INTO `user` (nome, email, senha, telefone, tipo, ativo, data_criacao, data_atualizacao) VALUES (?, ?, ?, ?, ?, 1, NOW(), NOW())",
    [nome, email, senhaHash, telefone, tipo]
  );

  const [rows] = await db.query(
    "SELECT id, nome, email, telefone, tipo, ativo, data_criacao, data_atualizacao FROM `user` WHERE id = ? LIMIT 1",
    [result.insertId]
  );

  return { status: 201, body: rows[0] };
}

module.exports = createUser;
