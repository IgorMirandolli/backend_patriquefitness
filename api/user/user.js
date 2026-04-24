const { normalizeEmail } = require("../auth/shared");

async function findUserByEmail(db, email) {
  const normalizedEmail = normalizeEmail(email);
  const [rows] = await db.query(
    "SELECT id, nome, email, senha, telefone, tipo, ativo, data_criacao, data_atualizacao FROM `user` WHERE email = ? LIMIT 1",
    [normalizedEmail]
  );

  return rows[0] || null;
}

module.exports = {
  findUserByEmail,
};
