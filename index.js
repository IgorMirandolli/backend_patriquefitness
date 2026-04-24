require("dotenv").config();
const db = require("./db");

async function testConnection() {
  const requiredVars = ["DB_USER", "DB_PASSWORD", "DB_NAME"];
  const missingVars = requiredVars.filter((name) => !process.env[name]);

  if (missingVars.length > 0) {
    console.error(
      `Variaveis ausentes no .env: ${missingVars.join(", ")}. Preencha e tente novamente.`
    );
    process.exit(1);
  }

  try {
    const [rows] = await db.query("SELECT 1 + 1 AS resultado");
    console.log("Conexao com MySQL OK. Resultado do teste:", rows[0].resultado);
    process.exit(0);
  } catch (error) {
    console.error("Falha ao conectar no MySQL:", error.message);
    process.exit(1);
  }
}

testConnection();
