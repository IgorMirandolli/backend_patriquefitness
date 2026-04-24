module.exports = {
  authSecret: process.env.AUTH_SECRET || "patrique-fitness-dev-secret",
  authExpiresInSeconds: Number(process.env.AUTH_EXPIRES_IN_SECONDS || 60 * 60 * 24),
};
