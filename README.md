# Patrique Fitness — Backend API

<p align="center">
  <img src="https://raw.githubusercontent.com/victorhasse/patrique_app/main/assets/images/marca_fundo_preto.png" width="280"/>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-20.x-green?logo=node.js" />
  <img src="https://img.shields.io/badge/JavaScript-ES2022-yellow?logo=javascript" />
  <img src="https://img.shields.io/badge/Express-5.x-lightgrey?logo=express" />
  <img src="https://img.shields.io/badge/MySQL-8.x-blue?logo=mysql" />
  <img src="https://img.shields.io/badge/Status-In%20Development-yellow" />
</p>

<p align="center">
  🇺🇸 English | <a href="docs/README_PT.md">🇧🇷 Português</a>
</p>

---

## 📡 About

This is the **REST API backend** for the Patrique Fitness mobile app, built with Node.js, Express and MySQL. It handles authentication, user profiles, and an intelligent chatbot with personalized responses based on user data.

**Frontend repository:** [victorhasse/patrique_app](https://github.com/victorhasse/patrique_app)

---

## 🛠️ Tech stack

| Technology | Version | Usage |
|------------|---------|-------|
| `Node.js` | 20.x | Runtime |
| `JavaScript` | ES2022 | Language |
| `Express` | 5.x | HTTP framework |
| `MySQL` | 8.x | Relational database |
| `mysql2` | 3.x | MySQL driver with promise support |
| `jwt-simple` | 0.5.x | JWT token generation and validation |
| `crypto` | Node built-in | Password hashing with scrypt |
| `dotenv` | 17.x | Environment variables |
| `cors` | 2.x | Cross-origin resource sharing |

---

## 📁 Project structure

```
backend_patriquefitness/
├── api/
│   ├── auth/
│   │   ├── auth.js            # Register and login routes
│   │   ├── authMiddleware.js  # JWT authentication middleware
│   │   ├── adminMiddleware.js # Admin-only middleware
│   │   └── shared.js          # Token, password and sanitize utils
│   ├── user/
│   │   ├── profile.js         # GET and PUT profile routes
│   │   ├── user.js            # findUserByEmail helper
│   │   └── createUser.js      # User creation logic
│   └── chatbot/
│       └── chatbot.js         # Decision tree chatbot with personalization
├── config/
│   ├── db.js                  # MySQL connection pool
│   └── routes.js              # Route registration
├── docs/
│   └── README_PT.md           # Portuguese documentation
├── .env.example               # Environment variables template
├── .gitignore
├── environment.js             # Auth secret and token config
├── index.js                   # App entry point
└── package.json
```

---

## 🔌 API Endpoints

### 🔐 Authentication
| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| POST | `/auth/register` | ❌ | Register new user |
| POST | `/auth/login` | ❌ | Login and receive JWT token |

### 👤 User Profile
| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| GET | `/user/profile` | ✅ | Get authenticated user profile |
| PUT | `/user/profile` | ✅ | Update user profile |

### 🤖 Chatbot
| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| POST | `/chatbot/reply` | ✅ | Get chatbot response for a given option |

### 🩺 Health Check
| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| GET | `/health` | ❌ | Server health check |
| GET | `/db-test` | ❌ | Database connection test |

---

## 🤖 Chatbot

The chatbot uses a **decision tree** with personalized responses based on the authenticated user's profile data (weight, experience level).

**Available topics:**
- 🏋️ Workout tips (sets, frequency, progression)
- 🥗 Nutrition (pre/post workout meals, protein intake)
- 📊 Caloric deficit macros — calculated from user's weight
- 💪 Bulking macros — calculated from user's weight
- 😴 Recovery (sleep, overtraining, muscle soreness)
- 📈 Progress tracking (streak, weekly workouts)

**Request body:**
```json
{
  "option": "Déficit calórico para emagrecer"
}
```

**Response:**
```json
{
  "mensagem": "Peso cadastrado: 75kg\nMeta calórica (déficit): 2100 kcal/dia\n\nMacros diários sugeridos:\n- Proteína: 165g\n- Carboidratos: 210g\n- Gorduras: 60g",
  "opcoes": ["Voltar ao início", "Bulking para ganho de massa"]
}
```

---

## 🔒 Authentication

All protected routes require a JWT token in the `Authorization` header:

```
Authorization: Bearer <your_token>
```

The token is returned on `/auth/login` and `/auth/register`.

---

## 🚀 Getting started

### Prerequisites
- Node.js 20.x or higher
- MySQL 8.x
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/IgorMirandolli/backend_patriquefitness.git

# Navigate to the project folder
cd backend_patriquefitness

# Install dependencies
npm install

# Copy the environment variables template
cp .env.example .env

# Edit .env with your credentials
nano .env
```

### Database setup

```bash
# Access MySQL and create the database
mysql -u root -p
CREATE DATABASE patriquefitness;
EXIT;
```

### Run the server

```bash
# Production mode
npm start
```

Server will be running at `http://localhost:3000`

---

## 🔒 Environment variables

Copy `.env.example` to `.env` and fill in your values:

```env
PORT=3000

DB_HOST=localhost
DB_PORT=3306
DB_NAME=patriquefitness
DB_USER=your_user
DB_PASSWORD=your_password

AUTH_SECRET=a_long_random_secret_string
AUTH_EXPIRES_IN_SECONDS=86400
```

> ⚠️ **Never commit your `.env` file to the repository!**
> ⚠️ **Always set a strong `AUTH_SECRET` in production — never use the default value!**

---

## 🗺️ Roadmap

- [ ] Workout management endpoints (CRUD)
- [ ] Streak and calendar endpoints
- [ ] Nutrition tracking endpoints
- [ ] Friends and ranking endpoints
- [ ] Subscription plans endpoints
- [ ] `nodemon` for development auto-reload
- [ ] Unit and integration tests
- [ ] API documentation with Swagger
- [ ] Rate limiting and security hardening
- [ ] Deploy to production (Railway / Render)

---

## 👨‍💻 Credits

Developed by **Victor Hasse**, **Bernardo Santos Vieira**, **Guilherme Mitsuo Honda**, **Igor Vinicius Sotili Mirandolli**

[![GitHub](https://img.shields.io/badge/victorhasse-181717?style=flat&logo=github)](https://github.com/victorhasse)
[![GitHub](https://img.shields.io/badge/BernardoSVieira-181717?style=flat&logo=github)](https://github.com/BernardoSVieira)
[![GitHub](https://img.shields.io/badge/lmitsuol-181717?style=flat&logo=github)](https://github.com/lmitsuol)
[![GitHub](https://img.shields.io/badge/IgorMirandolli-181717?style=flat&logo=github)](https://github.com/IgorMirandolli)

Academic and portfolio project — 2026

---

## 📄 License

This project is licensed under the MIT License.