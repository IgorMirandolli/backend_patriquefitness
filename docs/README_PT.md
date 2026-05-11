# Patrique Fitness — Backend API

<p align="center">
  <img src="https://raw.githubusercontent.com/victorhasse/patrique_app/main/assets/images/marca_fundo_preto.png" width="280"/>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-20.x-green?logo=node.js" />
  <img src="https://img.shields.io/badge/JavaScript-ES2022-yellow?logo=javascript" />
  <img src="https://img.shields.io/badge/Express-5.x-lightgrey?logo=express" />
  <img src="https://img.shields.io/badge/MySQL-8.x-blue?logo=mysql" />
  <img src="https://img.shields.io/badge/Status-Em%20desenvolvimento-yellow" />
</p>

<p align="center">
  <a href="../README.md">🇺🇸 English</a> | 🇧🇷 Português
</p>

---

## 📡 Sobre o projeto

Esta é a **API REST backend** do aplicativo mobile Patrique Fitness, desenvolvida com Node.js, Express e MySQL. Responsável por autenticação, perfis de usuário e um chatbot inteligente com respostas personalizadas baseadas nos dados do usuário.

**Repositório frontend:** [victorhasse/patrique_app](https://github.com/victorhasse/patrique_app)

---

## 🛠️ Tecnologias

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| `Node.js` | 20.x | Runtime |
| `JavaScript` | ES2022 | Linguagem |
| `Express` | 5.x | Framework HTTP |
| `MySQL` | 8.x | Banco de dados relacional |
| `mysql2` | 3.x | Driver MySQL com suporte a promises |
| `jwt-simple` | 0.5.x | Geração e validação de tokens JWT |
| `crypto` | Nativo Node | Hash de senhas com scrypt |
| `dotenv` | 17.x | Variáveis de ambiente |
| `cors` | 2.x | Cross-origin resource sharing |

---

## 📁 Estrutura do projeto

```
backend_patriquefitness/
├── api/
│   ├── auth/
│   │   ├── auth.js            # Rotas de registro e login
│   │   ├── authMiddleware.js  # Middleware de autenticação JWT
│   │   ├── adminMiddleware.js # Middleware para rotas de admin
│   │   └── shared.js          # Utilitários de token, senha e sanitização
│   ├── user/
│   │   ├── profile.js         # Rotas GET e PUT do perfil
│   │   ├── user.js            # Helper findUserByEmail
│   │   └── createUser.js      # Lógica de criação de usuário
│   └── chatbot/
│       └── chatbot.js         # Chatbot com árvore de decisões e personalização
├── config/
│   ├── db.js                  # Pool de conexão MySQL
│   └── routes.js              # Registro de rotas
├── docs/
│   └── README_PT.md           # Documentação em português
├── .env.example               # Template de variáveis de ambiente
├── .gitignore
├── environment.js             # Configuração do segredo e expiração do token
├── index.js                   # Ponto de entrada da aplicação
└── package.json
```

---

## 🔌 Endpoints da API

### 🔐 Autenticação
| Método | Rota | Auth | Descrição |
|--------|------|------|-----------|
| POST | `/auth/register` | ❌ | Cadastrar novo usuário |
| POST | `/auth/login` | ❌ | Login e recebimento do token JWT |

### 👤 Perfil do Usuário
| Método | Rota | Auth | Descrição |
|--------|------|------|-----------|
| GET | `/user/profile` | ✅ | Buscar perfil do usuário autenticado |
| PUT | `/user/profile` | ✅ | Atualizar perfil do usuário |

### 🤖 Chatbot
| Método | Rota | Auth | Descrição |
|--------|------|------|-----------|
| POST | `/chatbot/reply` | ✅ | Obter resposta do chatbot para uma opção |

### 🩺 Health Check
| Método | Rota | Auth | Descrição |
|--------|------|------|-----------|
| GET | `/health` | ❌ | Verificação de status do servidor |
| GET | `/db-test` | ❌ | Teste de conexão com o banco |

---

## 🤖 Chatbot

O chatbot utiliza uma **árvore de decisões** com respostas personalizadas baseadas nos dados de perfil do usuário autenticado (peso, nível de experiência).

**Tópicos disponíveis:**
- 🏋️ Dicas de treino (séries, frequência, progressão)
- 🥗 Nutrição (refeições pré/pós treino, ingestão de proteína)
- 📊 Macros para déficit calórico — calculados com base no peso do usuário
- 💪 Macros para bulking — calculados com base no peso do usuário
- 😴 Recuperação (sono, overtraining, dor muscular)
- 📈 Acompanhamento de progresso (streak, treinos da semana)

**Body da requisição:**
```json
{
  "option": "Déficit calórico para emagrecer"
}
```

**Resposta:**
```json
{
  "mensagem": "Peso cadastrado: 75kg\nMeta calórica (déficit): 2100 kcal/dia\n\nMacros diários sugeridos:\n- Proteína: 165g\n- Carboidratos: 210g\n- Gorduras: 60g",
  "opcoes": ["Voltar ao início", "Bulking para ganho de massa"]
}
```

---

## 🔒 Autenticação

Todas as rotas protegidas exigem um token JWT no header `Authorization`:

```
Authorization: Bearer <seu_token>
```

O token é retornado no login (`/auth/login`) e no cadastro (`/auth/register`).

---

## 🚀 Como rodar o projeto

### Pré-requisitos
- Node.js 20.x ou superior
- MySQL 8.x
- npm

### Instalação

```bash
# Clone o repositório
git clone https://github.com/IgorMirandolli/backend_patriquefitness.git

# Entre na pasta
cd backend_patriquefitness

# Instale as dependências
npm install

# Copie o template de variáveis de ambiente
cp .env.example .env

# Edite o .env com suas credenciais
nano .env
```

### Configurar o banco de dados

```bash
# Acesse o MySQL e crie o banco
mysql -u root -p
CREATE DATABASE patriquefitness;
EXIT;
```

### Rodar o servidor

```bash
# Modo produção
npm start
```

O servidor estará rodando em `http://localhost:3000`

---

## 🔒 Variáveis de ambiente

Copie o `.env.example` para `.env` e preencha com seus valores:

```env
PORT=3000

DB_HOST=localhost
DB_PORT=3306
DB_NAME=patriquefitness
DB_USER=seu_usuario
DB_PASSWORD=sua_senha

AUTH_SECRET=uma_string_secreta_longa_e_aleatoria
AUTH_EXPIRES_IN_SECONDS=86400
```

> ⚠️ **Nunca commite o arquivo `.env` no repositório!**
> ⚠️ **Sempre defina um `AUTH_SECRET` forte em produção — nunca use o valor padrão!**

---

## 🗺️ Próximos passos

- [ ] Endpoints de gerenciamento de treinos (CRUD)
- [ ] Endpoints de streak e calendário
- [ ] Endpoints de controle de nutrição
- [ ] Endpoints de amigos e ranking
- [ ] Endpoints de planos de assinatura
- [ ] `nodemon` para auto-reload em desenvolvimento
- [ ] Testes unitários e de integração
- [ ] Documentação da API com Swagger
- [ ] Rate limiting e hardening de segurança
- [ ] Deploy em produção (Railway / Render)

---

## 👨‍💻 Créditos

Desenvolvido por **Victor Hasse**, **Bernardo Santos Vieira**, **Guilherme Mitsuo Honda**, **Igor Vinicius Sotili Mirandolli**

[![GitHub](https://img.shields.io/badge/victorhasse-181717?style=flat&logo=github)](https://github.com/victorhasse)
[![GitHub](https://img.shields.io/badge/BernardoSVieira-181717?style=flat&logo=github)](https://github.com/BernardoSVieira)
[![GitHub](https://img.shields.io/badge/lmitsuol-181717?style=flat&logo=github)](https://github.com/lmitsuol)
[![GitHub](https://img.shields.io/badge/IgorMirandolli-181717?style=flat&logo=github)](https://github.com/IgorMirandolli))

Projeto acadêmico e de portfólio — 2026

---

## 📄 Licença

Este projeto está sob a licença MIT.