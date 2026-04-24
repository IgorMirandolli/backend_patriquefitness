require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./config/db");
const registerRoutes = require("./config/routes");

const app = express();
const PORT = Number(process.env.PORT || 3000);
app.db = db;

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

registerRoutes(app);

app.use((_req, res) => {
  res.status(404).json({ message: "Rota nao encontrada" });
});

app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(500).json({ message: "Erro interno do servidor" });
});

app.listen(PORT, () => {
  console.log(`API Patrique Fitness rodando na porta ${PORT}`);
});
