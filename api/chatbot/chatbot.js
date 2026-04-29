const { normalizeEmail } = require("../auth/shared");
const { findUserByEmail } = require("../user/user");

const NUTRICAO = "Nutrição";
const TREINO = "Dúvidas sobre treino";
const DESCANSO = "Descanso e recuperação";
const ACOMPANHAMENTO = "Acompanhamento";
const DEFICIT = "Déficit calórico para emagrecer";
const BULKING = "Bulking para ganho de massa";

function buildBaseTree() {
  return {
    inicio: {
      mensagem: "Escolha uma opção abaixo:",
      opcoes: [TREINO, NUTRICAO, DESCANSO, ACOMPANHAMENTO],
    },
    [TREINO]: {
      mensagem: "Qual sua dúvida sobre treino?",
      opcoes: [
        "Como montar uma série?",
        "Quantas vezes treinar por semana?",
        "Como evoluir no treino?",
      ],
    },
    [NUTRICAO]: {
      mensagem: "O que você quer saber sobre nutrição?",
      opcoes: [
        "O que comer antes do treino?",
        "O que comer depois do treino?",
        "Quanto de proteína por dia?",
        DEFICIT,
        BULKING,
      ],
    },
    [DESCANSO]: {
      mensagem: "O que você quer saber sobre recuperação?",
      opcoes: [
        "Quantas horas dormir?",
        "O que é overtraining?",
        "Quando posso treinar com dor muscular?",
      ],
    },
    [ACOMPANHAMENTO]: {
      mensagem: "O que deseja acompanhar?",
      opcoes: ["Ver meu progresso", "Meus treinos da semana", "Meu streak atual"],
    },
    "Como montar uma série?": {
      mensagem:
        "Para iniciantes, recomendo:\n\n- 3 séries de 12 repetições\n- Descanso de 60 segundos\n- Foco na técnica antes do peso\n\nQuer saber mais alguma coisa?",
      opcoes: ["Voltar ao início", "Quantas vezes treinar por semana?"],
    },
    "Quantas vezes treinar por semana?": {
      mensagem:
        "Depende do seu nível:\n\n- Iniciante: 3x por semana\n- Intermediário: 4x por semana\n- Avançado: 5-6x por semana\n\nSempre respeitando o descanso!",
      opcoes: ["Voltar ao início", "Como evoluir no treino?"],
    },
    "Como evoluir no treino?": {
      mensagem:
        "A chave é a sobrecarga progressiva:\n\n- Aumente o peso gradualmente\n- Adicione mais repetições\n- Reduza o tempo de descanso\n- Varie os exercícios a cada 4-6 semanas",
      opcoes: ["Voltar ao início", "Quantas vezes treinar por semana?"],
    },
    "O que comer antes do treino?": {
      mensagem:
        "Ideal comer 1-2h antes:\n\n- Carboidratos de fácil digestão\n- Banana com pasta de amendoim\n- Pão integral com ovo\n- Aveia com frutas\n\nEvite gorduras e fibras em excesso!",
      opcoes: ["Voltar ao início", "O que comer depois do treino?"],
    },
    "O que comer depois do treino?": {
      mensagem:
        "Até 1h após o treino:\n\n- Proteína para recuperação muscular\n- Frango com arroz e legumes\n- Atum com batata-doce\n- Whey protein com fruta\n\nEsse é um momento importante para recuperação!",
      opcoes: ["Voltar ao início", "Quanto de proteína por dia?"],
    },
    "Quanto de proteína por dia?": {
      mensagem:
        "A recomendação geral é:\n\n- 1.6g a 2.2g por kg de peso corporal\n- Exemplo: 70kg = 112g a 154g/dia\n- Distribua em 4-5 refeições\n\nConsulte um nutricionista para orientação personalizada!",
      opcoes: ["Voltar ao início", DEFICIT],
    },
    [DEFICIT]: {
      mensagem:
        "Consigo montar uma estimativa de macros para déficit calórico com base no seu peso.\n\nUse como referência inicial e ajuste semanalmente conforme evolução.",
      opcoes: ["Voltar ao início", BULKING],
    },
    [BULKING]: {
      mensagem:
        "Consigo montar uma estimativa de macros para bulking com base no seu peso.\n\nUse como referência inicial e ajuste conforme ganho de peso e performance.",
      opcoes: ["Voltar ao início", DEFICIT],
    },
    "Quantas horas dormir?": {
      mensagem:
        "O sono é fundamental para os resultados:\n\n- Mínimo de 7-8 horas por noite\n- É durante o sono que o músculo cresce\n- Evite telas 1h antes de dormir\n- Mantenha horários regulares",
      opcoes: ["Voltar ao início", "O que é overtraining?"],
    },
    "O que é overtraining?": {
      mensagem:
        "Overtraining é o excesso de treino:\n\n- Queda no desempenho\n- Cansaço excessivo\n- Irritabilidade\n- Dificuldade para dormir\n\nSe identificar esses sinais, diminua a carga e priorize recuperação.",
      opcoes: ["Voltar ao início", "Quando posso treinar com dor muscular?"],
    },
    "Quando posso treinar com dor muscular?": {
      mensagem:
        "Depende do tipo de dor:\n\n- Dor muscular tardia (DOMS): pode treinar outro grupo muscular\n- Dor articular ou aguda: pare e descanse\n- Dor leve: ok treinar com intensidade reduzida\n\nSempre ouça seu corpo!",
      opcoes: ["Voltar ao início", "O que é overtraining?"],
    },
    "Ver meu progresso": {
      mensagem:
        "Você está indo muito bem!\n\n- Streak atual: 7 dias\n- Treinos este mês: 18\n- Grupo favorito: Peito e tríceps\n\nContinue assim!",
      opcoes: ["Voltar ao início", "Meus treinos da semana"],
    },
    "Meus treinos da semana": {
      mensagem:
        "Sua semana até agora:\n\n- Segunda: Peito e tríceps\n- Terça: Costas e bíceps\n- Quarta: Pernas\n- Quinta: Ombros\n- Sexta: Cardio\n- Sábado\n- Domingo",
      opcoes: ["Voltar ao início", "Meu streak atual"],
    },
    "Meu streak atual": {
      mensagem:
        "Seu streak atual é de 7 dias!\n\nVocê está entre os mais consistentes da plataforma. Continue treinando amanhã para manter!",
      opcoes: ["Voltar ao início", "Ver meu progresso"],
    },
    "Voltar ao início": {
      mensagem: "Claro! Como posso te ajudar?",
      opcoes: [TREINO, NUTRICAO, DESCANSO, ACOMPANHAMENTO],
    },
  };
}

function formatMacroMessage({ baseMessage, peso, calorias, proteinaG, carboG, gorduraG, tipo }) {
  return (
    `${baseMessage}\n\n` +
    `Peso cadastrado: ${peso}kg\n` +
    `Meta calórica (${tipo}): ${calorias.toFixed(0)} kcal/dia\n\n` +
    "Macros diários sugeridos:\n" +
    `- Proteína: ${proteinaG.toFixed(0)}g\n` +
    `- Carboidratos: ${carboG.toFixed(0)}g\n` +
    `- Gorduras: ${gorduraG.toFixed(0)}g\n\n` +
    "Ajuste essa base a cada 1-2 semanas conforme progresso."
  );
}

function personalizeResponse(option, response, user) {
  if (!response || !user) return response;

  if (option === "Quantas vezes treinar por semana?") {
    const nivel = user.nivel_experiencia || "não informado";
    return {
      ...response,
      mensagem: `${response.mensagem}\n\nSeu nível atual no perfil: ${nivel}.`,
    };
  }

  if (option === "Quanto de proteína por dia?") {
    const peso = Number(user.peso);
    if (Number.isFinite(peso) && peso > 0) {
      const min = (peso * 1.6).toFixed(0);
      const max = (peso * 2.2).toFixed(0);
      return {
        ...response,
        mensagem: `${response.mensagem}\n\nPelo seu peso cadastrado (${peso}kg), sua faixa estimada é ${min}g a ${max}g de proteína por dia.`,
      };
    }
  }

  if (option === DEFICIT) {
    const peso = Number(user.peso);
    if (Number.isFinite(peso) && peso > 0) {
      const proteinaG = peso * 2.2;
      const gorduraG = peso * 0.8;
      const calorias = peso * 28;
      const caloriasProteina = proteinaG * 4;
      const caloriasGordura = gorduraG * 9;
      const carboG = Math.max(0, (calorias - caloriasProteina - caloriasGordura) / 4);
      return {
        ...response,
        mensagem: formatMacroMessage({
          baseMessage: response.mensagem,
          peso,
          calorias,
          proteinaG,
          carboG,
          gorduraG,
          tipo: "déficit",
        }),
      };
    }

    return {
      ...response,
      mensagem: `${response.mensagem}\n\nNão encontrei seu peso no perfil. Atualize seu peso para eu calcular seus macros com precisão.`,
    };
  }

  if (option === BULKING) {
    const peso = Number(user.peso);
    if (Number.isFinite(peso) && peso > 0) {
      const proteinaG = peso * 2.0;
      const gorduraG = peso * 1.0;
      const calorias = peso * 38;
      const caloriasProteina = proteinaG * 4;
      const caloriasGordura = gorduraG * 9;
      const carboG = Math.max(0, (calorias - caloriasProteina - caloriasGordura) / 4);
      return {
        ...response,
        mensagem: formatMacroMessage({
          baseMessage: response.mensagem,
          peso,
          calorias,
          proteinaG,
          carboG,
          gorduraG,
          tipo: "bulking",
        }),
      };
    }

    return {
      ...response,
      mensagem: `${response.mensagem}\n\nNão encontrei seu peso no perfil. Atualize seu peso para eu calcular seus macros com precisão.`,
    };
  }

  return response;
}

module.exports = (app) => {
  app.post("/chatbot/reply", async (req, res, next) => {
    try {
      const option = String(req.body?.option || "inicio").trim() || "inicio";
      const email = normalizeEmail(req.body?.email);

      const tree = buildBaseTree();
      const fallback = tree.inicio;
      const response = tree[option] || {
        mensagem:
          "Não entendi essa opção ainda. Escolha uma das sugestões abaixo para eu te ajudar melhor.",
        opcoes: fallback.opcoes,
      };

      let user = null;
      if (email) {
        user = await findUserByEmail(app.db, email);
      }

      const personalized = personalizeResponse(option, response, user);
      return res.status(200).json({
        mensagem: personalized.mensagem,
        opcoes: personalized.opcoes || [],
      });
    } catch (error) {
      return next(error);
    }
  });
};
