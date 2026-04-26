# 🏋️‍♂️ Patrique Fitness — Gym App

<p align="center">
  <img src="https://github.com/user-attachments/assets/872c4423-6739-4926-8d9a-dbbb9f42105e" width="300"/>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Flutter-3.41.7-blue?logo=flutter" />
  <img src="https://img.shields.io/badge/Dart-3.x-blue?logo=dart" />
  <img src="https://img.shields.io/badge/Platform-iOS-lightgrey?logo=apple" />
  <img src="https://img.shields.io/badge/Status-In%20Development-yellow" />
</p>

<p align="center">
  🇺🇸 English | <a href="docs/README_PT.md">🇧🇷 Português</a>
</p>

---

## 📱 About the project

**Patrique Fitness** is a mobile gym application built with Flutter, developed as both a portfolio project and academic work. The app delivers a gamified experience for workout management, nutrition tracking, and social interaction between users — inspired by Duolingo's engagement mechanics applied to the fitness world.

---

## ✨ Features

### 🔐 Authentication
- Animated splash screen with dynamic theme support (light/dark)
- Interactive onboarding for new users
- Login and sign-up with field validation

### 🏠 Home
- Personalized user greeting
- Streak card showing consecutive training days
- Weekly workout overview
- Shimmer loading effect
- Clickable next workout cards with direct navigation

### 💪 Workouts
- Workout list organized by muscle group (A, B, C)
- Detail screen showing exercises, sets, weights, and rest intervals
- Workout execution with real-time total timer
- Integrated YouTube video player for each exercise
- Rest timer between sets with skip option
- Completion screen with star rating and streak update
- Custom workout creation with drag-to-reorder

### 📅 Calendar
- Monthly view of completed workout days — Duolingo style
- Automatically calculated streak
- Stats: current streak, monthly workouts, and total count

### 🤖 Chatbot
- PratiqueBot with a full decision tree
- Answers questions about training, nutrition, and recovery
- Conversation history with interactive quick replies

### 👥 Friends
- Friends list with real-time online status
- Full friend profile with stats
- Gamified weekly ranking with podium (🥇🥈🥉)
- Weekly and monthly challenges with points system

### 🥗 Nutrition
- Daily calorie tracking with progress bar
- Macronutrient tracking (protein, carbs, fat)
- Expandable meals with checklist (breakfast, lunch, snack, dinner)
- Weekly diet history with streak
- Schedule a consultation with a nutritionist via WhatsApp

### 💳 Plans
- Monthly and annual plans with price comparison
- Subscription confirmation screen

### 👤 Profile
- Editable personal and physical data (name, weight, height)
- Customizable fitness goal and experience level
- Workout stats (streak, monthly workouts, total)
- Plan management
- Configurable daily reminder notifications
- Persistent light/dark theme toggle

---

## 🎨 Brand Identity

| Color | Hex | Usage |
|-------|-----|-------|
| Primary pink | `#FF3E7D` | Primary color, buttons, highlights |
| Dark pink | `#D61A5E` | Gradients |
| Light pink | `#F8A9D5` | Text on dark backgrounds |
| Dark background | `#111217` | Dark mode background |
| Dark surface | `#1C1D21` | Dark mode cards |

---

## 🛠️ Tech stack

| Package | Version | Usage |
|---------|---------|-------|
| `flutter` | 3.41.7 | Main framework |
| `youtube_player_flutter` | 9.x | In-app video player |
| `shared_preferences` | — | Local persistence |
| `flutter_local_notifications` | 17.x | Workout reminders |
| `shimmer` | — | Loading skeleton effect |
| `flutter_launcher_icons` | — | App icon generation |

---

## 📁 Project structure

```
lib/
├── core/
│   ├── theme/
│   │   ├── app_theme.dart          # Light and dark themes
│   │   ├── app_transitions.dart    # Navigation animations
│   │   └── theme_utils.dart        # Context extensions
│   ├── notification_service.dart   # Notification service
│   └── theme_controller.dart       # Theme controller
├── features/
│   ├── auth/
│   ├── home/
│   ├── treino/
│   ├── chatbot/
│   ├── amigos/
│   ├── nutricao/
│   └── perfil/
├── shared/
│   └── widgets/
└── main.dart
```

---

## 🚀 Getting started

### Prerequisites
- Flutter 3.41.7 or higher
- Xcode 16+ (for iOS)
- CocoaPods installed

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/patrique_app.git

# Navigate to the project folder
cd patrique_app

# Install dependencies
flutter pub get

# Run the app on simulator
flutter run
```

---

## 📸 Screenshots

> Coming soon

---

## 🗺️ Roadmap

- [ ] Firebase integration (real authentication and database)
- [ ] Illustrated characters on screens (Patrique Estrela and Chad Esponja)
- [ ] Real payment integration via RevenueCat
- [ ] Android version
- [ ] Automated tests (unit and widget tests)

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
## 👤 Créditos

Desenvolvido por **Victor Hasse**, **Bernardo Santos Vieira**, **Guilherme Mitsuo Honda**, **Igor Vinicius Sotili Mirandolli**

[![GitHub](https://img.shields.io/badge/victorhasse-181717?style=flat&logo=github)](https://github.com/victorhasse)
[![GitHub](https://img.shields.io/badge/BernardoSVieira-181717?style=flat&logo=github)](https://github.com/BernardoSVieira)
[![GitHub](https://img.shields.io/badge/lmitsuol-181717?style=flat&logo=github)](https://github.com/lmitsuol)
[![GitHub](https://img.shields.io/badge/IgorMirandolli-181717?style=flat&logo=github)](https://github.com/IgorMirandolli)


---
<div id="english-version">

## 🇺🇸 About the Project
**Patrique Fitness** is a complete ecosystem for those seeking health and high performance. More than just a workout tracker, the app uses gamification and AI to keep users motivated and well-guided.

We feature exclusive characters and a mascot that follows your journey, making the training experience light and friendly.


## ⚙️ Key Features

- **Workout Management:** Organize your sets and exercises intuitively.

- **Streak System:** Inspired by Duolingo, track your consistency with a visual calendar and keep up your streak.

- **Smart Chatbot:** An optimized decision tree to answer quick questions about exercises, form, and basic nutrition.

- **Plans & Payments:** Integrated monthly and annual subscription management.

- **Gamification:** Interactive characters that assist and encourage the user.


## 🎨 Visual Identity

We use a modern and energetic palette to reflect workout intensity:

- #ff3e7d (Primary Pink)

- #f8a9d5 (Soft Accent)

- #1c1d21 (Secondary Dark)


## 🗺️ App Navigation

- **Home:** Dashboard with activity summary and streaks.

- **Workout:** List of the day's exercises.

- **Chatbot:** Your virtual personal trainer, always available.

- **Profile:** Personal data, progress, and plan settings.


## 🛠️ Technologies

- **Frontend:** Flutter

- **Backend:** 

- **Database:** 


## 💡 Ideas for the Future (Roadmap)
- **Custom Notifications:** The mascot "reminding" you to complete your workout if you're about to lose your streak.

- **Friends Ranking:** See who has the longest streak at the gym.

- **Integration with ***HealthKit / Google Fit***:** To automatically import steps and calories.


## 👤 Credits

Developed by **Victor Hasse**, **Bernardo Santos Vieira**, **Guilherme Mitsuo Honda**, **Igor Vinicius Sotili Mirandolli**

[![GitHub](https://img.shields.io/badge/victorhasse-181717?style=flat&logo=github)](https://github.com/victorhasse)
[![GitHub](https://img.shields.io/badge/BernardoSVieira-181717?style=flat&logo=github)](https://github.com/BernardoSVieira)
[![GitHub](https://img.shields.io/badge/lmitsuol-181717?style=flat&logo=github)](https://github.com/lmitsuol)
[![GitHub](https://img.shields.io/badge/IgorMirandolli-181717?style=flat&logo=github)](https://github.com/IgorMirandolli)
