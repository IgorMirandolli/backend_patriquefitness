const createUser = require("../user/createUser");
const { findUserByEmail } = require("../user/user");
const { verifyPassword, sanitizeUser, buildToken, normalizeEmail } = require("./shared");

module.exports = (app) => {
  app.post("/auth/register", async (req, res, next) => {
    try {
      const result = await createUser(app.db, req.body || {});
      if (result.status !== 201) {
        return res.status(result.status).json(result.body);
      }

      const token = buildToken(result.body);
      return res.status(201).json({
        message: "usuario cadastrado com sucesso",
        token,
        user: sanitizeUser(result.body),
      });
    } catch (error) {
      return next(error);
    }
  });

  app.post("/auth/login", async (req, res, next) => {
    try {
      const email = normalizeEmail(req.body?.email);
      const senha = String(req.body?.senha || "");

      if (!email || !senha) {
        return res.status(400).json({ message: "email e senha sao obrigatorios" });
      }

      const user = await findUserByEmail(app.db, email);
      if (!user || !verifyPassword(senha, user.senha)) {
        return res.status(401).json({ message: "email ou senha invalidos" });
      }

      if (!user.ativo) {
        return res.status(403).json({ message: "usuario inativo" });
      }

      const token = buildToken(user);
      return res.status(200).json({
        message: "login realizado com sucesso",
        token,
        user: sanitizeUser(user),
      });
    } catch (error) {
      return next(error);
    }
  });
};
