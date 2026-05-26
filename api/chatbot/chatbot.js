const authMiddleware = require("../auth/authMiddleware");
const { findUserByEmail } = require("../user/user");

const NUTRICAO = "Nutricao";
const TREINO = "Duvidas sobre treino";
const DESCANSO = "Descanso e recuperacao";
const ACOMPANHAMENTO = "Acompanhamento";
const PLANOS = "Planos e pagamento";
const HORARIOS = "Horarios e funcionamento";
const SUPORTE = "Falar com suporte";
const DEFICIT = "Deficit calorico para emagrecer";
const BULKING = "Bulking para ganho de massa";

// Novas intencoes
const TREINO_SEMANAL = "Montar treino semanal";
const TROCA_EXERCICIO = "Troca de exercicio";
const LESOES = "Lesoes e dores";
const SUPLEMENTACAO = "Suplementacao";
const HIDRATACAO = "Hidratacao e performance";
const AGUA_POR_KG_ML = 35;

const USER_CONTEXT_TTL_MS = 30 * 60 * 1000;
const USER_CONTEXT = new Map();

const TOPIC_RULES = {
  [TREINO]: [
    "Como montar uma serie?",
    "Quantas vezes treinar por semana?",
    "Como evoluir no treino?",
    TREINO_SEMANAL,
    TROCA_EXERCICIO,
    LESOES,
    "2 dias por semana",
    "3 dias por semana",
    "4 dias por semana",
    "5 dias por semana",
    "Sem equipamento (casa)",
    "Academia lotada",
    "Dor no joelho",
  ],
  [NUTRICAO]: [
    "O que comer antes do treino?",
    "O que comer depois do treino?",
    "Quanto de proteina por dia?",
    DEFICIT,
    BULKING,
    SUPLEMENTACAO,
    HIDRATACAO,
    "Creatina vale a pena?",
    "Whey e obrigatorio?",
    "Pre-treino funciona?",
    "Quanto de agua por dia?",
    "Como hidratar no treino?",
  ],
  [DESCANSO]: [
    "Quantas horas dormir?",
    "O que e overtraining?",
    "Quando posso treinar com dor muscular?",
    LESOES,
    "Dor muscular leve",
    "Dor articular ou aguda",
  ],
  [ACOMPANHAMENTO]: [
    "Ver meu progresso",
    "Meus treinos da semana",
    "Meu streak atual",
  ],
  [PLANOS]: [
    "Como assinar um plano?",
    "Como cancelar assinatura?",
    "Problema com cobranca",
  ],
  [HORARIOS]: [],
  [SUPORTE]: [],
};

const OPTION_TO_TOPIC = buildOptionToTopicMap();

function buildOptionToTopicMap() {
  const map = {};
  for (const [topic, items] of Object.entries(TOPIC_RULES)) {
    map[topic] = topic;
    for (const item of items) {
      map[item] = topic;
    }
  }
  return map;
}

function buildBaseTree() {
  return {
    inicio: {
      mensagem: "Escolha uma opcao abaixo:",
      opcoes: [
        TREINO,
        NUTRICAO,
        DESCANSO,
        ACOMPANHAMENTO,
        PLANOS,
        HORARIOS,
      ],
    },
    [TREINO]: {
      mensagem: "Qual sua duvida sobre treino?",
      opcoes: [
        "Como montar uma serie?",
        "Quantas vezes treinar por semana?",
        "Como evoluir no treino?",
        TREINO_SEMANAL,
        TROCA_EXERCICIO,
        LESOES,
      ],
    },
    [NUTRICAO]: {
      mensagem: "O que voce quer saber sobre nutricao?",
      opcoes: [
        "O que comer antes do treino?",
        "O que comer depois do treino?",
        "Quanto de proteina por dia?",
        DEFICIT,
        BULKING,
        SUPLEMENTACAO,
        HIDRATACAO,
      ],
    },
    [DESCANSO]: {
      mensagem: "O que voce quer saber sobre recuperacao?",
      opcoes: [
        "Quantas horas dormir?",
        "O que e overtraining?",
        "Quando posso treinar com dor muscular?",
        LESOES,
      ],
    },
    [ACOMPANHAMENTO]: {
      mensagem: "O que deseja acompanhar?",
      opcoes: ["Ver meu progresso", "Meus treinos da semana", "Meu streak atual"],
    },
    [PLANOS]: {
      mensagem:
        "Posso te orientar sobre planos e pagamento no app.\n\n" +
        "- Assinatura mensal ou anual\n" +
        "- Renovacao automatica conforme a loja\n" +
        "- Cancelamento pela loja da assinatura",
      opcoes: [
        "Como assinar um plano?",
        "Como cancelar assinatura?",
        "Problema com cobranca",
        "Voltar ao inicio",
      ],
    },
    [HORARIOS]: {
      mensagem:
        "Horario padrao de funcionamento (referencia):\n\n" +
        "- Segunda a sexta: 06:00 as 22:00\n" +
        "- Sabado: 08:00 as 18:00\n" +
        "- Domingo e feriados: 08:00 as 14:00\n\n" +
        "Esse horario e uma base padrao e pode variar por unidade.",
      opcoes: [TREINO, NUTRICAO, DESCANSO, SUPORTE],
    },
    [SUPORTE]: {
      mensagem:
        "Para suporte, use a area de ajuda no app ou o canal oficial da academia/parceiro.\n\n" +
        "Se quiser, eu continuo te ajudando com treino e nutricao.",
      opcoes: [TREINO, NUTRICAO, PLANOS, "Voltar ao inicio"],
    },
    [TREINO_SEMANAL]: {
      mensagem:
        "Perfeito. Quantos dias por semana voce consegue treinar com consistencia?",
      opcoes: [
        "2 dias por semana",
        "3 dias por semana",
        "4 dias por semana",
        "5 dias por semana",
        "Voltar ao inicio",
      ],
    },
    "2 dias por semana": {
      mensagem:
        "Sugestao para 2 dias:\n\n" +
        "- Dia A: Full body (agachamento, supino, remada, desenvolvimento)\n" +
        "- Dia B: Full body (terra leve, puxada, passada, core)\n\n" +
        "Foco em exercicios compostos e progressao semanal.",
      opcoes: ["3 dias por semana", "4 dias por semana", "Voltar ao inicio"],
    },
    "3 dias por semana": {
      mensagem:
        "Sugestao para 3 dias:\n\n" +
        "- Dia A: Peito, ombro, triceps\n" +
        "- Dia B: Costas, biceps\n" +
        "- Dia C: Pernas e core\n\n" +
        "Descanso de 1 dia entre sessoes mais pesadas.",
      opcoes: ["2 dias por semana", "4 dias por semana", "Voltar ao inicio"],
    },
    "4 dias por semana": {
      mensagem:
        "Sugestao para 4 dias:\n\n" +
        "- Upper 1\n" +
        "- Lower 1\n" +
        "- Upper 2\n" +
        "- Lower 2\n\n" +
        "Boa opcao para hipertrofia com volume equilibrado.",
      opcoes: ["3 dias por semana", "5 dias por semana", "Voltar ao inicio"],
    },
    "5 dias por semana": {
      mensagem:
        "Sugestao para 5 dias:\n\n" +
        "- Peito/triceps\n" +
        "- Costas/biceps\n" +
        "- Pernas\n" +
        "- Ombros\n" +
        "- Full body leve ou cardio\n\n" +
        "Mantenha 1-2 dias de descanso na semana.",
      opcoes: ["4 dias por semana", LESOES, "Voltar ao inicio"],
    },
    [TROCA_EXERCICIO]: {
      mensagem: "Qual situacao voce quer adaptar no treino?",
      opcoes: [
        "Sem equipamento (casa)",
        "Academia lotada",
        "Dor no joelho",
        "Voltar ao inicio",
      ],
    },
    "Sem equipamento (casa)": {
      mensagem:
        "Sem equipamentos, voce pode usar:\n\n" +
        "- Agachamento livre\n" +
        "- Flexao de braco\n" +
        "- Afundo\n" +
        "- Prancha\n\n" +
        "Progrida por repeticoes e tempo sob tensao.",
      opcoes: ["Academia lotada", TREINO_SEMANAL, "Voltar ao inicio"],
    },
    "Academia lotada": {
      mensagem:
        "Alternativas rapidas:\n\n" +
        "- Supino -> Flexao com carga/mochila\n" +
        "- Agachamento livre -> Leg press ou hack\n" +
        "- Puxada alta -> Remada baixa\n\n" +
        "Troque padrao de movimento, nao apenas o aparelho.",
      opcoes: [TROCA_EXERCICIO, TREINO_SEMANAL, "Voltar ao inicio"],
    },
    "Dor no joelho": {
      mensagem:
        "Se houver dor no joelho:\n\n" +
        "- Reduza carga e amplitude\n" +
        "- Prefira exercicios sem dor (cadeira extensora leve, ponte de gluteo)\n" +
        "- Evite insistir em dor aguda\n\n" +
        "Se persistir, procure avaliacao profissional.",
      opcoes: [LESOES, SUPORTE, "Voltar ao inicio"],
    },
    [LESOES]: {
      mensagem:
        "Quero te ajudar com seguranca. Qual tipo de dor voce esta sentindo?",
      opcoes: ["Dor muscular leve", "Dor articular ou aguda", "Voltar ao inicio"],
    },
    "Dor muscular leve": {
      mensagem:
        "Se for dor muscular leve (DOMS):\n\n" +
        "- Pode treinar outro grupo muscular\n" +
        "- Faça aquecimento maior\n" +
        "- Reduza intensidade no dia\n\n" +
        "Se piorar, interrompa e descanse.",
      opcoes: ["Quando posso treinar com dor muscular?", "Voltar ao inicio"],
    },
    "Dor articular ou aguda": {
      mensagem:
        "Dor articular/aguda e sinal de alerta.\n\n" +
        "- Pare o exercicio agora\n" +
        "- Evite treino no local dolorido\n" +
        "- Procure avaliacao medica/fisioterapeutica",
      opcoes: [SUPORTE, "Voltar ao inicio"],
    },
    [SUPLEMENTACAO]: {
      mensagem: "Sobre suplementacao, voce quer saber sobre qual tema?",
      opcoes: [
        "Creatina vale a pena?",
        "Whey e obrigatorio?",
        "Pre-treino funciona?",
        "Voltar ao inicio",
      ],
    },
    "Creatina vale a pena?": {
      mensagem:
        "Em geral, sim para forca e volume de treino.\n\n" +
        "- Dose comum: 3g a 5g por dia\n" +
        "- Uso diario, com ou sem treino\n" +
        "- Hidratar bem durante o dia",
      opcoes: ["Whey e obrigatorio?", HIDRATACAO, "Voltar ao inicio"],
    },
    "Whey e obrigatorio?": {
      mensagem:
        "Nao e obrigatorio.\n\n" +
        "Whey e praticidade para bater proteina diaria quando a alimentacao nao cobre sozinha.",
      opcoes: ["Quanto de proteina por dia?", SUPLEMENTACAO, "Voltar ao inicio"],
    },
    "Pre-treino funciona?": {
      mensagem:
        "Pode ajudar no foco e energia, dependendo da formula.\n\n" +
        "Se for sensivel a cafeina, comece com dose baixa e evite perto do horario de sono.",
      opcoes: [SUPLEMENTACAO, "Quantas horas dormir?", "Voltar ao inicio"],
    },
    [HIDRATACAO]: {
      mensagem: "Quer uma referencia geral ou para o treino em si?",
      opcoes: ["Quanto de agua por dia?", "Como hidratar no treino?", "Voltar ao inicio"],
    },
    "Quanto de agua por dia?": {
      mensagem:
        "Posso calcular uma meta exata diaria com seu peso cadastrado.",
      opcoes: ["Como hidratar no treino?", HIDRATACAO, "Voltar ao inicio"],
    },
    "Como hidratar no treino?": {
      mensagem:
        "No treino:\n\n" +
        "- Tome pequenos goles a cada 10-15 minutos\n" +
        "- Treinos longos/intensos podem pedir reposicao de sodio",
      opcoes: [HIDRATACAO, SUPLEMENTACAO, "Voltar ao inicio"],
    },
    "Como assinar um plano?": {
      mensagem:
        "Voce pode assinar pelo fluxo de planos dentro do app.\n\n" +
        "- Escolha mensal ou anual\n" +
        "- Confirme na loja (Google Play / App Store)\n" +
        "- O acesso premium e liberado apos confirmacao",
      opcoes: ["Problema com cobranca", "Como cancelar assinatura?", "Voltar ao inicio"],
    },
    "Como cancelar assinatura?": {
      mensagem:
        "O cancelamento e feito na loja em que a assinatura foi criada:\n\n" +
        "- Android: Google Play > Assinaturas\n" +
        "- iPhone: Ajustes > Assinaturas\n\n" +
        "Depois do cancelamento, o acesso segue ate o fim do ciclo pago.",
      opcoes: ["Problema com cobranca", "Como assinar um plano?", "Voltar ao inicio"],
    },
    "Problema com cobranca": {
      mensagem:
        "Se houve cobranca indevida ou duplicada, abra chamado com:\n\n" +
        "- Email da conta\n" +
        "- Data e valor da cobranca\n" +
        "- Comprovante da loja\n\n" +
        "Assim o suporte resolve mais rapido.",
      opcoes: [SUPORTE, "Como cancelar assinatura?", "Voltar ao inicio"],
    },
    "Como montar uma serie?": {
      mensagem:
        "Para iniciantes, recomendo:\n\n" +
        "- 3 series de 12 repeticoes\n" +
        "- Descanso de 60 segundos\n" +
        "- Foco na tecnica antes do peso",
      opcoes: ["Voltar ao inicio", "Quantas vezes treinar por semana?"],
    },
    "Quantas vezes treinar por semana?": {
      mensagem:
        "Depende do seu nivel:\n\n" +
        "- Iniciante: 3x por semana\n" +
        "- Intermediario: 4x por semana\n" +
        "- Avancado: 5-6x por semana\n\n" +
        "Sempre respeitando o descanso.",
      opcoes: [TREINO_SEMANAL, "Como evoluir no treino?", "Voltar ao inicio"],
    },
    "Como evoluir no treino?": {
      mensagem:
        "A chave e a sobrecarga progressiva:\n\n" +
        "- Aumente o peso gradualmente\n" +
        "- Adicione mais repeticoes\n" +
        "- Reduza o tempo de descanso\n" +
        "- Varie os exercicios a cada 4-6 semanas",
      opcoes: [TREINO_SEMANAL, TROCA_EXERCICIO, "Voltar ao inicio"],
    },
    "O que comer antes do treino?": {
      mensagem:
        "Ideal comer 1-2h antes:\n\n" +
        "- Carboidratos de facil digestao\n" +
        "- Banana com pasta de amendoim\n" +
        "- Pao integral com ovo\n" +
        "- Aveia com frutas\n\n" +
        "Evite gorduras e fibras em excesso.",
      opcoes: ["O que comer depois do treino?", HIDRATACAO, "Voltar ao inicio"],
    },
    "O que comer depois do treino?": {
      mensagem:
        "Ate 1h apos o treino:\n\n" +
        "- Proteina para recuperacao muscular\n" +
        "- Frango com arroz e legumes\n" +
        "- Atum com batata-doce\n" +
        "- Whey protein com fruta",
      opcoes: ["Quanto de proteina por dia?", SUPLEMENTACAO, "Voltar ao inicio"],
    },
    "Quanto de proteina por dia?": {
      mensagem:
        "A recomendacao geral e:\n\n" +
        "- 1.6g a 2.2g por kg de peso corporal\n" +
        "- Exemplo: 70kg = 112g a 154g/dia\n" +
        "- Distribua em 4-5 refeicoes",
      opcoes: [DEFICIT, BULKING, "Voltar ao inicio"],
    },
    [DEFICIT]: {
      mensagem:
        "Consigo montar uma estimativa de macros para deficit calorico com base no seu peso.\n\n" +
        "Use como referencia inicial e ajuste semanalmente conforme evolucao.",
      opcoes: [BULKING, "Quanto de proteina por dia?", "Voltar ao inicio"],
    },
    [BULKING]: {
      mensagem:
        "Consigo montar uma estimativa de macros para bulking com base no seu peso.\n\n" +
        "Use como referencia inicial e ajuste conforme ganho de peso e performance.",
      opcoes: [DEFICIT, "Quanto de proteina por dia?", "Voltar ao inicio"],
    },
    "Quantas horas dormir?": {
      mensagem:
        "O sono e fundamental para os resultados:\n\n" +
        "- Minimo de 7-8 horas por noite\n" +
        "- Evite telas 1h antes de dormir\n" +
        "- Mantenha horarios regulares",
      opcoes: ["O que e overtraining?", LESOES, "Voltar ao inicio"],
    },
    "O que e overtraining?": {
      mensagem:
        "Overtraining e excesso de treino:\n\n" +
        "- Queda no desempenho\n" +
        "- Cansaco excessivo\n" +
        "- Irritabilidade\n" +
        "- Dificuldade para dormir\n\n" +
        "Se identificar esses sinais, diminua a carga e priorize recuperacao.",
      opcoes: ["Quando posso treinar com dor muscular?", "Quantas horas dormir?", "Voltar ao inicio"],
    },
    "Quando posso treinar com dor muscular?": {
      mensagem:
        "Depende do tipo de dor:\n\n" +
        "- Dor muscular tardia (DOMS): pode treinar outro grupo\n" +
        "- Dor articular/aguda: pare e descanse\n" +
        "- Dor leve: treine com intensidade reduzida",
      opcoes: [LESOES, "O que e overtraining?", "Voltar ao inicio"],
    },
    "Ver meu progresso": {
      mensagem:
        "Voce esta indo muito bem.\n\n" +
        "- Streak atual: 7 dias\n" +
        "- Treinos este mes: 18\n" +
        "- Grupo favorito: Peito e triceps",
      opcoes: ["Meus treinos da semana", "Meu streak atual", "Voltar ao inicio"],
    },
    "Meus treinos da semana": {
      mensagem:
        "Sua semana ate agora:\n\n" +
        "- Segunda: Peito e triceps\n" +
        "- Terca: Costas e biceps\n" +
        "- Quarta: Pernas\n" +
        "- Quinta: Ombros\n" +
        "- Sexta: Cardio\n" +
        "- Sabado\n" +
        "- Domingo",
      opcoes: ["Meu streak atual", "Ver meu progresso", "Voltar ao inicio"],
    },
    "Meu streak atual": {
      mensagem:
        "Seu streak atual e de 7 dias.\n\n" +
        "Voce esta entre os mais consistentes da plataforma. Continue treinando amanha para manter.",
      opcoes: ["Ver meu progresso", "Meus treinos da semana", "Voltar ao inicio"],
    },
    "Voltar ao inicio": {
      mensagem: "Claro. Como posso te ajudar?",
      opcoes: [
        TREINO,
        NUTRICAO,
        DESCANSO,
        ACOMPANHAMENTO,
        PLANOS,
        HORARIOS,
      ],
    },
  };
}

function normalizeText(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s]/g, "");
}

function getUserContext(userKey) {
  const empty = {
    lastTopic: null,
    lastOption: null,
    lastOptions: [],
    fallbackCount: 0,
    updatedAt: Date.now(),
  };

  const saved = USER_CONTEXT.get(userKey);
  if (!saved) return empty;

  if (Date.now() - saved.updatedAt > USER_CONTEXT_TTL_MS) {
    USER_CONTEXT.delete(userKey);
    return empty;
  }

  return saved;
}

function saveUserContext(userKey, patch) {
  const nextState = {
    ...patch,
    updatedAt: Date.now(),
  };
  USER_CONTEXT.set(userKey, nextState);
}

function resolveOptionByIndex(rawNormalized, lastOptions) {
  if (!Array.isArray(lastOptions) || lastOptions.length === 0) return null;

  const indexedTerms = [
    { idx: 0, terms: ["1", "primeira", "primeiro", "um"] },
    { idx: 1, terms: ["2", "segunda", "segundo", "dois"] },
    { idx: 2, terms: ["3", "terceira", "terceiro", "tres"] },
    { idx: 3, terms: ["4", "quarta", "quarto", "quatro"] },
    { idx: 4, terms: ["5", "quinta", "quinto", "cinco"] },
  ];

  for (const item of indexedTerms) {
    if (!lastOptions[item.idx]) continue;
    const matched = item.terms.some((term) =>
      new RegExp(`(^|\\s)${term}($|\\s)`).test(rawNormalized)
    );
    if (matched) return lastOptions[item.idx];
  }

  return null;
}

function resolveOption(input, tree, context = {}) {
  const raw = String(input || "").trim();
  if (!raw) return "inicio";
  if (tree[raw]) return raw;

  const rawNormalized = normalizeText(raw);
  if (!rawNormalized) return "inicio";

  const byIndex = resolveOptionByIndex(rawNormalized, context.lastOptions);
  if (byIndex && tree[byIndex]) return byIndex;

  const keys = Object.keys(tree);
  const normalizedByKey = new Map(
    keys.map((key) => [key, normalizeText(key)])
  );

  for (const [key, normalized] of normalizedByKey.entries()) {
    if (normalized === rawNormalized) return key;
  }

  // Regras especificas de frase (prioridade alta)
  if (
    rawNormalized.includes("quantas vezes") &&
    rawNormalized.includes("treinar") &&
    rawNormalized.includes("semana")
  ) {
    return "Quantas vezes treinar por semana?";
  }

  if (
    rawNormalized.includes("quanto") &&
    rawNormalized.includes("agua") &&
    rawNormalized.includes("dia")
  ) {
    return "Quanto de agua por dia?";
  }

  const exactKeywordRoutes = [
    { keywords: ["inicio", "menu", "comecar", "voltar", "oi", "ola"], target: "inicio" },
    { keywords: ["emagrecer", "deficit", "cutting"], target: DEFICIT },
    { keywords: ["bulking", "massa", "hipertrofia"], target: BULKING },
    { keywords: ["nutricao", "dieta", "alimentacao", "comida"], target: NUTRICAO },
    { keywords: ["treino", "exercicio", "musculacao", "serie"], target: TREINO },
    { keywords: ["descanso", "sono", "recuperacao"], target: DESCANSO },
    { keywords: ["progresso", "streak", "acompanhamento"], target: ACOMPANHAMENTO },
    { keywords: ["horario", "funcionamento", "abre", "fecha", "academia"], target: HORARIOS },
    { keywords: ["pagamento", "plano", "assinatura", "cobranca", "cancelar", "preco"], target: PLANOS },
    { keywords: ["suporte", "atendimento", "ajuda", "contato"], target: SUPORTE },
    { keywords: ["lesao", "dor", "joelho", "ombro", "lombar"], target: LESOES },
    { keywords: ["suplemento", "whey", "creatina", "pre treino"], target: SUPLEMENTACAO },
    { keywords: ["hidrata", "agua", "sede", "eletr"], target: HIDRATACAO },
    { keywords: ["rotina", "semana", "dias"], target: TREINO_SEMANAL },
    { keywords: ["substituir", "trocar", "adaptar"], target: TROCA_EXERCICIO },
  ];

  for (const route of exactKeywordRoutes) {
    if (route.keywords.some((keyword) => rawNormalized.includes(keyword))) {
      return route.target;
    }
  }

  let bestKey = null;
  let bestScore = 0;
  const words = rawNormalized.split(/\s+/).filter((word) => word.length > 2);

  for (const [key, normalizedKey] of normalizedByKey.entries()) {
    let score = 0;

    if (
      normalizedKey.includes(rawNormalized) ||
      rawNormalized.includes(normalizedKey)
    ) {
      score += 2;
    }

    for (const word of words) {
      if (normalizedKey.includes(word)) score += 1;
    }

    if (score > bestScore) {
      bestScore = score;
      bestKey = key;
    }
  }

  if (bestScore > 0 && bestKey) return bestKey;

  // Se o usuario escrever algo curto/ambiguo, tenta manter no topico anterior.
  const shortInput = words.length <= 2;
  if (shortInput && context.lastTopic && tree[context.lastTopic]) {
    return context.lastTopic;
  }

  return raw;
}

function inferTopic(option, previousTopic = null) {
  if (!option) return previousTopic;
  if (option === "inicio" || option === "Voltar ao inicio") return null;
  return OPTION_TO_TOPIC[option] || previousTopic;
}

function buildSmartFallback(rawInput, tree, context = {}) {
  const cleanInput = String(rawInput || "").trim();
  const shortInput = cleanInput.length > 80
    ? `${cleanInput.slice(0, 80)}...`
    : cleanInput;

  const inicioOpcoes = tree.inicio?.opcoes || [];
  const topicOptions = context.lastTopic && tree[context.lastTopic]
    ? tree[context.lastTopic].opcoes || []
    : [];

  let opcoes = topicOptions.slice(0, 4);
  if (opcoes.length === 0 && Array.isArray(context.lastOptions)) {
    opcoes = context.lastOptions.slice(0, 4);
  }
  if (opcoes.length === 0) {
    opcoes = inicioOpcoes.slice(0, 4);
  }

  if (!opcoes.includes("Voltar ao inicio")) {
    opcoes.push("Voltar ao inicio");
  }
  if (context.fallbackCount >= 1 && !opcoes.includes(SUPORTE)) {
    opcoes.push(SUPORTE);
  }

  return {
    mensagem:
      `Nao entendi bem "${shortInput || "sua mensagem"}".\n\n` +
      "Tente reformular em uma frase curta ou escolha uma opcao abaixo para eu te ajudar com mais precisao.",
    opcoes,
  };
}

function formatMacroMessage({
  baseMessage,
  peso,
  calorias,
  proteinaG,
  carboG,
  gorduraG,
  tipo,
}) {
  return (
    `${baseMessage}\n\n` +
    `Peso cadastrado: ${peso}kg\n` +
    `Meta calorica (${tipo}): ${calorias.toFixed(0)} kcal/dia\n\n` +
    "Macros diarios sugeridos:\n" +
    `- Proteina: ${proteinaG.toFixed(0)}g\n` +
    `- Carboidratos: ${carboG.toFixed(0)}g\n` +
    `- Gorduras: ${gorduraG.toFixed(0)}g\n\n` +
    "Ajuste essa base a cada 1-2 semanas conforme progresso."
  );
}

function formatWaterMessage({ baseMessage, peso }) {
  const aguaMl = Math.round(peso * AGUA_POR_KG_ML);
  const aguaL = (aguaMl / 1000).toFixed(2);
  const copos250 = Math.round(aguaMl / 250);

  return (
    `${baseMessage}\n\n` +
    `Peso cadastrado: ${peso}kg\n` +
    `Meta diaria exata: ${aguaMl}ml (${aguaL}L)\n` +
    `Equivale a aproximadamente ${copos250} copos de 250ml.\n\n` +
    "Em dias muito quentes ou treinos longos, aumente a ingestao."
  );
}

function personalizeResponse(option, response, user) {
  if (!response || !user) return response;

  if (option === "Quantas vezes treinar por semana?") {
    const nivel = user.nivel_experiencia || "nao informado";
    return {
      ...response,
      mensagem: `${response.mensagem}\n\nSeu nivel atual no perfil: ${nivel}.`,
    };
  }

  if (option === "Quanto de proteina por dia?") {
    const peso = Number(user.peso);
    if (Number.isFinite(peso) && peso > 0) {
      const min = (peso * 1.6).toFixed(0);
      const max = (peso * 2.2).toFixed(0);
      return {
        ...response,
        mensagem:
          `${response.mensagem}\n\n` +
          `Pelo seu peso cadastrado (${peso}kg), sua faixa estimada e ${min}g a ${max}g de proteina por dia.`,
      };
    }
  }

  if (option === "Quanto de agua por dia?") {
    const peso = Number(user.peso);
    if (Number.isFinite(peso) && peso > 0) {
      return {
        ...response,
        mensagem: formatWaterMessage({
          baseMessage: response.mensagem,
          peso,
        }),
      };
    }

    return {
      ...response,
      mensagem:
        `${response.mensagem}\n\n` +
        "Nao encontrei seu peso no perfil. Atualize seu peso para eu calcular sua meta diaria de agua com precisao.",
    };
  }

  if (option === DEFICIT) {
    const peso = Number(user.peso);
    if (Number.isFinite(peso) && peso > 0) {
      const proteinaG = peso * 2.2;
      const gorduraG = peso * 0.8;
      const calorias = peso * 28;
      const caloriasProteina = proteinaG * 4;
      const caloriasGordura = gorduraG * 9;
      const carboG = Math.max(
        0,
        (calorias - caloriasProteina - caloriasGordura) / 4
      );
      return {
        ...response,
        mensagem: formatMacroMessage({
          baseMessage: response.mensagem,
          peso,
          calorias,
          proteinaG,
          carboG,
          gorduraG,
          tipo: "deficit",
        }),
      };
    }

    return {
      ...response,
      mensagem:
        `${response.mensagem}\n\n` +
        "Nao encontrei seu peso no perfil. Atualize seu peso para eu calcular seus macros com precisao.",
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
      const carboG = Math.max(
        0,
        (calorias - caloriasProteina - caloriasGordura) / 4
      );
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
      mensagem:
        `${response.mensagem}\n\n` +
        "Nao encontrei seu peso no perfil. Atualize seu peso para eu calcular seus macros com precisao.",
    };
  }

  return response;
}

module.exports = (app) => {
  app.post("/chatbot/reply", authMiddleware, async (req, res, next) => {
    try {
      const rawOption = String(req.body?.option || "inicio").trim() || "inicio";
      const email = req.user.email;

      const tree = buildBaseTree();
      const context = getUserContext(email);
      const resolvedOption = resolveOption(rawOption, tree, context);
      const hasNode = Boolean(tree[resolvedOption]);

      const response = hasNode
        ? tree[resolvedOption]
        : buildSmartFallback(rawOption, tree, context);

      const user = await findUserByEmail(app.db, email);
      const personalized = personalizeResponse(resolvedOption, response, user);

      const nextTopic = inferTopic(resolvedOption, context.lastTopic);
      saveUserContext(email, {
        lastTopic: nextTopic,
        lastOption: resolvedOption,
        lastOptions: Array.isArray(personalized.opcoes)
          ? personalized.opcoes
          : [],
        fallbackCount: hasNode ? 0 : (context.fallbackCount || 0) + 1,
      });

      return res.status(200).json({
        mensagem: personalized.mensagem,
        opcoes: personalized.opcoes || [],
      });
    } catch (error) {
      return next(error);
    }
  });
};
