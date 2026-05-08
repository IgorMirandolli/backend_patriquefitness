# Patrique Fitness — Backend API

<p align="center">
  <img src="https://raw.githubusercontent.com/victorhasse/patrique_app/main/assets/images/marca_fundo_preto.png" width="280"/>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-20.x-green?logo=node.js" />
  <img src="https://img.shields.io/badge/JavaScript-ES2022-yellow?logo=javascript" />
  <img src="https://img.shields.io/badge/MySQL-8.x-blue?logo=mysql" />
  <img src="https://img.shields.io/badge/Status-In%20Development-yellow" />
</p>

<p align="center">
  🇺🇸 English | <a href="docs/README_PT.md">🇧🇷 Português</a>
</p>

---

## 📡 About

This is the **REST API backend** for the Patrique Fitness mobile app, built with Node.js and MySQL. It handles authentication, user data, workout management, nutrition tracking, friends, and subscription plans.

**Frontend repository:** [victorhasse/patrique_app](https://github.com/victorhasse/patrique_app)

---

## 🛠️ Tech stack

| Technology | Version | Usage |
|------------|---------|-------|
| `Node.js` | 20.x | Runtime |
| `JavaScript` | ES2022 | Language |
| `Express` | 4.x | HTTP framework |
| `MySQL` | 8.x | Relational database |
| `JWT` | — | Authentication tokens |
| `bcrypt` | — | Password hashing |
| `dotenv` | — | Environment variables |

---

## 📁 Project structure

```
backend_patriquefitness/
├── api/
│   ├── routes/          # API route definitions
│   ├── controllers/     # Request handlers
│   ├── models/          # Database models
│   └── middlewares/     # Auth and validation middlewares
├── config/
│   └── database.js      # MySQL connection setup
├── docs/
│   └── README_PT.md     # Portuguese documentation
├── .env.example         # Environment variables template
├── .gitignore
├── index.js             # App entry point
├── environment.js       # Environment configuration
└── package.json
```

---

## 🔌 API Endpoints

### 🔐 Authentication
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login and get token |
| POST | `/api/auth/logout` | Logout user |

### 👤 Users
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/users/profile` | Get user profile |
| PUT | `/api/users/profile` | Update user profile |
| PUT | `/api/users/password` | Change password |

### 💪 Workouts
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/workouts` | List all workouts |
| POST | `/api/workouts` | Create new workout |
| GET | `/api/workouts/:id` | Get workout by ID |
| PUT | `/api/workouts/:id` | Update workout |
| DELETE | `/api/workouts/:id` | Delete workout |
| POST | `/api/workouts/:id/complete` | Mark workout as completed |

### 📅 Streak & Calendar
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/streak` | Get current streak |
| GET | `/api/calendar` | Get workout calendar |
| POST | `/api/calendar/checkin` | Check in for today |

### 🥗 Nutrition
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/nutrition/today` | Get today's nutrition |
| POST | `/api/nutrition/meal` | Log a meal |
| PUT | `/api/nutrition/meal/:id` | Update a meal |
| DELETE | `/api/nutrition/meal/:id` | Delete a meal |
| GET | `/api/nutrition/history` | Get nutrition history |

### 👥 Friends
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/friends` | List friends |
| POST | `/api/friends/add` | Send friend request |
| GET | `/api/friends/ranking` | Get weekly ranking |
| GET | `/api/friends/:id/profile` | Get friend profile |

### 💳 Plans
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/plans` | List available plans |
| POST | `/api/plans/subscribe` | Subscribe to a plan |
| GET | `/api/plans/current` | Get current subscription |

---

## 🚀 Getting started

### Prerequisites
- Node.js 20.x or higher
- MySQL 8.x
- npm or yarn

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
# Create the database in MySQL
mysql -u root -p
CREATE DATABASE patrique_fitness;
EXIT;
```

### Run the server

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

Server will be running at `http://localhost:3000`

---

## 🔒 Environment variables

Copy `.env.example` to `.env` and fill in your values:

```env
PORT=3000
NODE_ENV=development

DB_HOST=localhost
DB_PORT=3306
DB_NAME=patrique_fitness
DB_USER=your_user
DB_PASSWORD=your_password

JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d
```

> ⚠️ **Never commit your `.env` file to the repository!**

---

## 🗺️ Roadmap

- [ ] Unit and integration tests
- [ ] API documentation with Swagger
- [ ] Firebase Auth integration
- [ ] Payment integration via Stripe / RevenueCat
- [ ] Deploy to production (Railway / Render / AWS)
- [ ] Rate limiting and security hardening

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