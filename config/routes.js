const db = require("./db");
const authApi = require("../api/auth/auth");
const profileApi = require("../api/user/profile");
const chatbotApi = require("../api/chatbot/chatbot");

function registerRoutes(app) {
  authApi(app);
  profileApi(app);
  chatbotApi(app);

  app.get("/health", (_req, res) => {
    res.status(200).json({ status: "ok" });
  });

  app.get("/db-test", async (_req, res) => {
    try {
      const [rows] = await db.query("SELECT 1 + 1 AS resultado");
      res.status(200).json({
        connected: true,
        result: rows[0].resultado,
      });
    } catch (error) {
      res.status(500).json({
        connected: false,
        error: error.message,
      });
    }
  });
}

module.exports = registerRoutes;
