# Patrique Fitness — Backend API

<p align="center">
  <img src="https://raw.githubusercontent.com/victorhasse/patrique_app/main/assets/images/marca_fundo_preto.png" width="280"/>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-20.x-green?logo=node.js" />
  <img src="https://img.shields.io/badge/JavaScript-ES2022-yellow?logo=javascript" />
  <img src="https://img.shields.io/badge/MySQL-8.x-blue?logo=mysql" />
  <img src="https://img.shields.io/badge/Status-Em%20desenvolvimento-yellow" />
</p>

<p align="center">
  <a href="../README.md">🇺🇸 English</a> | 🇧🇷 Português
</p>

---

## 📡 Sobre o projeto

Esta é a **API REST backend** do aplicativo mobile Patrique Fitness, desenvolvida com Node.js e MySQL. Responsável por autenticação, dados de usuários, gerenciamento de treinos, nutrição, amigos e planos de assinatura.

**Repositório frontend:** [victorhasse/patrique_app](https://github.com/victorhasse/patrique_app)

---

## 🛠️ Tecnologias

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| `Node.js` | 20.x | Runtime |
| `JavaScript` | ES2022 | Linguagem |
| `Express` | 4.x | Framework HTTP |
| `MySQL` | 8.x | Banco de dados relacional |
| `JWT` | — | Tokens de autenticação |
| `bcrypt` | — | Hash de senhas |
| `dotenv` | — | Variáveis de ambiente |

---

## 📁 Estrutura do projeto

```
backend_patriquefitness/
├── api/
│   ├── routes/          # Definição das rotas da API
│   ├── controllers/     # Handlers das requisições
│   ├── models/          # Modelos do banco de dados
│   └── middlewares/     # Middlewares de auth e validação
├── config/
│   └── database.js      # Configuração da conexão MySQL
├── docs/
│   └── README_PT.md     # Documentação em português
├── .env.example         # Template de variáveis de ambiente
├── .gitignore
├── index.js             # Ponto de entrada da aplicação
├── environment.js       # Configuração de ambiente
└── package.json
```

---

## 🔌 Endpoints da API

### 🔐 Autenticação
| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/api/auth/register` | Cadastrar novo usuário |
| POST | `/api/auth/login` | Login e obtenção do token |
| POST | `/api/auth/logout` | Logout do usuário |

### 👤 Usuários
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/users/profile` | Buscar perfil do usuário |
| PUT | `/api/users/profile` | Atualizar perfil |
| PUT | `/api/users/password` | Alterar senha |

### 💪 Treinos
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/workouts` | Listar todos os treinos |
| POST | `/api/workouts` | Criar novo treino |
| GET | `/api/workouts/:id` | Buscar treino por ID |
| PUT | `/api/workouts/:id` | Atualizar treino |
| DELETE | `/api/workouts/:id` | Deletar treino |
| POST | `/api/workouts/:id/complete` | Marcar treino como concluído |

### 📅 Streak e Calendário
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/streak` | Buscar streak atual |
| GET | `/api/calendar` | Buscar calendário de treinos |
| POST | `/api/calendar/checkin` | Registrar treino do dia |

### 🥗 Nutrição
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/nutrition/today` | Nutrição do dia atual |
| POST | `/api/nutrition/meal` | Registrar refeição |
| PUT | `/api/nutrition/meal/:id` | Atualizar refeição |
| DELETE | `/api/nutrition/meal/:id` | Deletar refeição |
| GET | `/api/nutrition/history` | Histórico de nutrição |

### 👥 Amigos
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/friends` | Listar amigos |
| POST | `/api/friends/add` | Enviar solicitação de amizade |
| GET | `/api/friends/ranking` | Ranking semanal |
| GET | `/api/friends/:id/profile` | Perfil de um amigo |

### 💳 Planos
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/plans` | Listar planos disponíveis |
| POST | `/api/plans/subscribe` | Assinar um plano |
| GET | `/api/plans/current` | Buscar assinatura atual |

---

## 🚀 Como rodar o projeto

### Pré-requisitos
- Node.js 20.x ou superior
- MySQL 8.x
- npm ou yarn

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
# Crie o banco no MySQL
mysql -u root -p
CREATE DATABASE patrique_fitness;
EXIT;
```

### Rodar o servidor

```bash
# Modo desenvolvimento (com auto-reload)
npm run dev

# Modo produção
npm start
```

O servidor estará rodando em `http://localhost:3000`

---

## 🔒 Variáveis de ambiente

Copie o `.env.example` para `.env` e preencha com seus valores:

```env
PORT=3000
NODE_ENV=development

DB_HOST=localhost
DB_PORT=3306
DB_NAME=patrique_fitness
DB_USER=seu_usuario
DB_PASSWORD=sua_senha

JWT_SECRET=sua_chave_secreta
JWT_EXPIRES_IN=7d
```

> ⚠️ **Nunca commite o arquivo `.env` no repositório!**

---

## 🗺️ Próximos passos

- [ ] Testes unitários e de integração
- [ ] Documentação da API com Swagger
- [ ] Integração com Firebase Auth
- [ ] Integração com pagamento via Stripe / RevenueCat
- [ ] Deploy em produção (Railway / Render / AWS)
- [ ] Rate limiting e hardening de segurança

---

## 👨‍💻 Créditos

Desenvolvido por **Victor Hasse**, **Bernardo Santos Vieira**, **Guilherme Mitsuo Honda**, **Igor Vinicius Sotili Mirandolli**

[![GitHub](https://img.shields.io/badge/victorhasse-181717?style=flat&logo=github)](https://github.com/victorhasse)
[![GitHub](https://img.shields.io/badge/BernardoSVieira-181717?style=flat&logo=github)](https://github.com/BernardoSVieira)
[![GitHub](https://img.shields.io/badge/lmitsuol-181717?style=flat&logo=github)](https://github.com/lmitsuol)
[![GitHub](https://img.shields.io/badge/IgorMirandolli-181717?style=flat&logo=github)](https://github.com/IgorMirandolli)

Projeto acadêmico e de portfólio — 2026

---

## 📄 Licença

Este projeto está sob a licença MIT.