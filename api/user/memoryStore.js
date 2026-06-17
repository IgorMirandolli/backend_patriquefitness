const { normalizeEmail } = require("../auth/shared");

const now = () => new Date().toISOString();

function cloneUser(user) {
  return user ? { ...user } : null;
}

function createMemoryStore() {
  const initialDate = now();
  const usersByEmail = new Map();
  let nextId = 1;

  const seedUsers = [
    {
      nome: "Usuario Patrique",
      email: "demo@gmail.com",
      senha: "123456",
      telefone: null,
      tipo: "aluno",
      ativo: true,
      altura: 175,
      peso: 75,
      objetivo: "Hipertrofia",
      nivel_experiencia: "Intermediario",
      foto_perfil: null,
      data_criacao: initialDate,
      data_atualizacao: initialDate,
    },
  ];

  for (const user of seedUsers) {
    const email = normalizeEmail(user.email);
    usersByEmail.set(email, {
      id: nextId,
      ...user,
      email,
    });
    nextId += 1;
  }

  return {
    kind: "memory",

    async findUserByEmail(email) {
      const normalizedEmail = normalizeEmail(email);
      return cloneUser(usersByEmail.get(normalizedEmail));
    },

    async createUser(payload) {
      const normalizedEmail = normalizeEmail(payload.email);
      const createdAt = now();
      const user = {
        id: nextId,
        nome: payload.nome,
        email: normalizedEmail,
        senha: payload.senha,
        telefone: payload.telefone ?? null,
        tipo: payload.tipo || "aluno",
        ativo: payload.ativo ?? true,
        altura: payload.altura ?? 175,
        peso: payload.peso ?? 75,
        objetivo: payload.objetivo ?? "Hipertrofia",
        nivel_experiencia: payload.nivel_experiencia ?? "Intermediario",
        foto_perfil: payload.foto_perfil ?? null,
        data_criacao: createdAt,
        data_atualizacao: createdAt,
      };

      usersByEmail.set(normalizedEmail, user);
      nextId += 1;
      return cloneUser(user);
    },

    async updateUserProfile(email, patch) {
      const normalizedEmail = normalizeEmail(email);
      const current = usersByEmail.get(normalizedEmail);
      if (!current) return null;

      const updated = {
        ...current,
        ...patch,
        email: normalizedEmail,
        data_atualizacao: now(),
      };

      usersByEmail.set(normalizedEmail, updated);
      return cloneUser(updated);
    },

    async ping() {
      return {
        connected: true,
        storage: "memory",
        users: usersByEmail.size,
      };
    },
  };
}

module.exports = {
  createMemoryStore,
};
