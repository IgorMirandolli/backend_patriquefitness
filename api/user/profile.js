const authMiddleware = require("../auth/authMiddleware");
const { sanitizeUser } = require("../auth/shared");
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
    resistencia: "Resistência",
    forca: "Força",
    "saude geral": "Saúde geral",
  };

  return map[normalized] || null;
}

function normalizeNivel(value) {
  const normalized = normalizeText(value);
  const map = {
    iniciante: "Iniciante",
    intermediario: "Intermediário",
    avancado: "Avançado",
  };

  return map[normalized] || null;
}

module.exports = (app) => {
  // GET /user/profile — protegido por JWT
  app.get("/user/profile", authMiddleware, async (req, res, next) => {
    try {
      const email = req.user.email; // vem do token, não da query

      const user = await findUserByEmail(app.db, email);
      if (!user) {
        return res.status(404).json({ message: "usuario nao encontrado" });
      }

      return res.status(200).json({ user: sanitizeUser(user) });
    } catch (error) {
      return next(error);
    }
  });

  // PUT /user/profile — protegido por JWT
  app.put("/user/profile", authMiddleware, async (req, res, next) => {
    try {
      const email = req.user.email; // vem do token, não do body

      const nome = String(req.body?.nome || "").trim();
      const telefone = req.body?.telefone
        ? String(req.body.telefone).trim()
        : null;
      const objetivo = normalizeObjetivo(req.body?.objetivo);
      const nivelExperiencia = normalizeNivel(req.body?.nivel_experiencia);
      const fotoPerfil = req.body?.foto_perfil
        ? String(req.body.foto_perfil).trim()
        : null;
      const peso = parseOptionalNumber(req.body?.peso);
      const altura = parseOptionalNumber(req.body?.altura);

      if (!nome) {
        return res.status(400).json({ message: "nome e obrigatorio" });
      }

      const user = await findUserByEmail(app.db, email);
      if (!user) {
        return res.status(404).json({ message: "usuario nao encontrado" });
      }

      if (!app.db || typeof app.db.updateUserProfile !== "function") {
        return res.status(500).json({ message: "armazenamento local indisponivel" });
      }

      const updated = await app.db.updateUserProfile(email, {
        nome,
        telefone,
        objetivo,
        nivel_experiencia: nivelExperiencia,
        foto_perfil: fotoPerfil,
        peso,
        altura,
      });
      return res.status(200).json({
        message: "perfil atualizado com sucesso",
        user: sanitizeUser(updated),
      });
    } catch (error) {
      return next(error);
    }
  });
};
