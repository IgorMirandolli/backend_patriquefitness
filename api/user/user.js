const { normalizeEmail } = require("../auth/shared");

async function findUserByEmail(db, email) {
  const normalizedEmail = normalizeEmail(email);
  if (!db || typeof db.findUserByEmail !== "function") {
    return null;
  }

  return db.findUserByEmail(normalizedEmail);
}

module.exports = {
  findUserByEmail,
};
