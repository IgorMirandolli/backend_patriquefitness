const { normalizeEmail, sanitizeUser } = require("../auth/shared");
const { findUserByEmail } = require("./user");

function parseOptionalNumber(value) {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  const parsed = Number(value);
  if (!Number.isFinite(parsed)) {
    return null;
  }

  return parsed;
}

function normalizeText(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function normalizeObjetivo(value) {
  const normalized = normalizeText(value);
  const map = {
    hipertrofia: "Hipertrofia",
    emagrecimento: "Emagrecimento",
    resistencia: "Resistencia",
    forca: "Forca",
    "saude geral": "Saude geral",
  };

  return map[normalized] || null;
}

function normalizeNivel(value) {
  const normalized = normalizeText(value);
  const map = {
    iniciante: "Iniciante",
    intermediario: "Intermediario",
    avancado: "Avancado",
  };

  return map[normalized] || null;
}

module.exports = (app) => {
  app.get("/user/profile", async (req, res, next) => {
    try {
      const email = normalizeEmail(req.query?.email);
      if (!email) {
        return res.status(400).json({ message: "email e obrigatorio" });
      }

      const user = await findUserByEmail(app.db, email);
      if (!user) {
        return res.status(404).json({ message: "usuario nao encontrado" });
      }

      return res.status(200).json({ user: sanitizeUser(user) });
    } catch (error) {
      return next(error);
    }
  });

  app.put("/user/profile", async (req, res, next) => {
    try {
      const email = normalizeEmail(req.body?.email);
      const nome = String(req.body?.nome || "").trim();
      const telefone = req.body?.telefone ? String(req.body.telefone).trim() : null;
      const objetivo = normalizeObjetivo(req.body?.objetivo);
      const nivelExperiencia = normalizeNivel(req.body?.nivel_experiencia);
      const fotoPerfil = req.body?.foto_perfil ? String(req.body.foto_perfil).trim() : null;
      const peso = parseOptionalNumber(req.body?.peso);
      const altura = parseOptionalNumber(req.body?.altura);

      if (!email || !nome) {
        return res.status(400).json({ message: "email e nome sao obrigatorios" });
      }

      const user = await findUserByEmail(app.db, email);
      if (!user) {
        return res.status(404).json({ message: "usuario nao encontrado" });
      }

      await app.db.query(
        "UPDATE `user` SET nome = ?, telefone = ?, objetivo = ?, nivel_experiencia = ?, foto_perfil = ?, peso = ?, altura = ?, data_atualizacao = NOW() WHERE id = ?",
        [nome, telefone, objetivo, nivelExperiencia, fotoPerfil, peso, altura, user.id]
      );

      const updated = await findUserByEmail(app.db, email);
      return res.status(200).json({
        message: "perfil atualizado com sucesso",
        user: sanitizeUser(updated),
      });
    } catch (error) {
      return next(error);
    }
  });
};
