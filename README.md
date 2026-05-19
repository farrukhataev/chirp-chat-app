# 💬 Chirp Chat - Real-time Messaging Application

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![GitHub Repository](https://img.shields.io/badge/GitHub-chirp--chat--app-blue?logo=github)](https://github.com/farrukhataev/chirp-chat-app)

**Chirp Chat** — это современное веб-приложение для обмена сообщениями в реальном времени с поддержкой отправки изображений, управлением профилем и отслеживанием статуса пользователей.

## 🚀 Ключевые Возможности

- ✅ **Аутентификация и авторизация** - Регистрация, вход с JWT-токенами
- ✅ **Обмен сообщениями в реальном времени** - WebSocket через Socket.io
- ✅ **Отправка изображений** - Загрузка на облачное хранилище Cloudinary
- ✅ **Управление профилем** - Загрузка аватара, смена статуса
- ✅ **Отслеживание статуса** - Real-time уведомления о подключении/отключении пользователей
- ✅ **Темная/светлая тема** - Переключение тем оформления
- ✅ **Адаптивный дизайн** - Работает на всех устройствах

## 🛠️ Технологический Стек

### Backend

| Технология     | Описание                       | Версия  |
| -------------- | ------------------------------ | ------- |
| **Node.js**    | JavaScript runtime             | LTS     |
| **Express.js** | Web framework                  | ^5.2.1  |
| **MongoDB**    | NoSQL database                 | -       |
| **Mongoose**   | ODM для MongoDB                | ^9.3.3  |
| **Socket.io**  | Real-time communication        | ^4.8.3  |
| **JWT**        | JSON Web Tokens (jsonwebtoken) | ^9.0.3  |
| **bcryptjs**   | Password hashing               | ^3.0.3  |
| **Cloudinary** | Cloud storage for images       | ^2.9.0  |
| **CORS**       | Cross-Origin Resource Sharing  | ^2.8.6  |
| **Dotenv**     | Environment variables          | ^17.3.1 |
| **Nodemon**    | Development server auto-reload | ^3.1.14 |

### Frontend

| Технология           | Описание                       | Версия   |
| -------------------- | ------------------------------ | -------- |
| **React**            | UI library                     | ^19.2.4  |
| **Vite**             | Build tool & dev server        | ^8.0.1   |
| **React Router**     | Client-side routing            | ^7.13.2  |
| **Zustand**          | State management               | ^5.0.12  |
| **Socket.io-client** | WebSocket client               | ^4.8.3   |
| **Axios**            | HTTP client                    | ^1.14.0  |
| **Tailwind CSS**     | Utility-first CSS              | ^3.4.19  |
| **DaisyUI**          | Tailwind CSS component library | ^4.12.24 |
| **Lucide React**     | Icon library                   | ^1.7.0   |
| **React Hot Toast**  | Notifications                  | ^2.6.0   |
| **ESLint**           | Code linting                   | ^9.39.4  |

## 📁 Структура Проекта

```
chirp-chat/
├── backend/                      # Node.js Express сервер
│   ├── src/
│   │   ├── index.js             # Точка входа
│   │   ├── controllers/         # Бизнес-логика
│   │   │   ├── auth.controller.js
│   │   │   └── message.controller.js
│   │   ├── routes/              # API маршруты
│   │   │   ├── auth.route.js
│   │   │   └── message.route.js
│   │   ├── models/              # Mongoose схемы
│   │   │   ├── user.model.js
│   │   │   └── message.models.js
│   │   ├── middleware/          # Express middleware
│   │   │   └── auth.middleware.js
│   │   ├── lib/                 # Утилиты и конфигурация
│   │   │   ├── db.js           # MongoDB подключение
│   │   │   ├── socket.js       # Socket.io события
│   │   │   ├── cloudinary.js   # Cloudinary интеграция
│   │   │   └── utils.js        # Вспомогательные функции
│   │   └── seeds/              # Seed скрипты
│   │       └── user.seed.js
│   └── package.json
│
├── frontend/                    # React приложение
│   ├── src/
│   │   ├── main.jsx            # Entry point
│   │   ├── App.jsx             # Root компонент
│   │   ├── index.css           # Глобальные стили
│   │   ├── components/         # React компоненты
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── ChatContainer.jsx
│   │   │   ├── ChatHeader.jsx
│   │   │   ├── MessageInput.jsx
│   │   │   ├── NoChatSelected.jsx
│   │   │   ├── AuthImagePattern.jsx
│   │   │   └── skeletons/      # Loading скелеты
│   │   ├── pages/              # Страницы приложения
│   │   │   ├── HomePage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── SignUpPage.jsx
│   │   │   ├── ProfilePage.jsx
│   │   │   └── SettingsPage.jsx
│   │   ├── store/              # Zustand store
│   │   │   ├── useAuthStore.js
│   │   │   ├── useChatStore.js
│   │   │   └── useThemeStore.js
│   │   ├── lib/                # Утилиты
│   │   │   ├── axios.js       # Axios конфигурация
│   │   │   └── utils.js
│   │   ├── constants/          # Константы
│   │   │   └── index.js
│   │   └── assets/             # Статические файлы
│   ├── public/
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── eslint.config.js
│   └── package.json
│
├── scripts/                     # Утилиты и скрипты
│   └── test-socket.mjs
│
├── package.json               # Root package.json
└── README.md
```

## 📋 Требования

Перед установкой убедитесь, что у вас установлены:

- **Node.js** (версия 16 или выше)
- **npm** или **yarn**
- **MongoDB** (локальное или облачное подключение)
- **Аккаунт Cloudinary** (для загрузки изображений)

## ⚙️ Установка и Запуск

### 1️⃣ Клонирование репозитория

```bash
git clone https://github.com/farrukhataev/chirp-chat-app.git
cd chirp-chat
```

### 2️⃣ Установка зависимостей

```bash
# Установить зависимости для всего проекта
npm run build
```

Или установить отдельно:

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 3️⃣ Настройка переменных окружения

**Backend** - создайте файл `.env` в папке `backend/`:

```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/chirp-chat
# или для MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/chirp-chat

# JWT
JWT_SECRET=your_jwt_secret_key_here

# Cloudinary
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Server
PORT=5001
NODE_ENV=development
```

**Frontend** - создайте файл `.env` в папке `frontend/`:

```env
VITE_API_URL=http://localhost:5001
```

### 4️⃣ Запуск приложения

**Режим разработки:**

```bash
# Backend (отдельное окно терминала)
cd backend
npm run dev

# Frontend (отдельное окно терминала)
cd frontend
npm run dev
```

**Production режим:**

```bash
# Вся сборка
npm run build

# Запуск
npm start
```

### 5️⃣ Открыть приложение

После запуска откройте браузер и перейдите на:

```
http://localhost:5173  # Фронтенд (Vite dev server)
```

Backend API будет доступен на:

```
http://localhost:5001
```

## 🔐 Аутентификация

Приложение использует **JWT (JSON Web Tokens)** для аутентификации:

1. Пользователь регистрируется/входит
2. Backend генерирует JWT токен
3. Токен сохраняется в cookies (HttpOnly)
4. Токен передается в каждом запросе через middleware
5. Сервер проверяет токен перед обработкой запроса

## 📡 Real-time Функциональность

Приложение использует **Socket.io** для real-time взаимодействия:

### Основные события:

```javascript
// Отправка сообщения
socket.emit("sendMessage", messageData);

// Получение нового сообщения
socket.on("newMessage", (message) => {});

// Отслеживание статуса пользователя
socket.on("userStatusChanged", (userData) => {});
socket.on("userOffline", (userId) => {});

// Получение списка онлайн пользователей
socket.on("onlineUsers", (users) => {});
```

## 🎨 Дизайн и Стили

- **Tailwind CSS** - современный utility-first framework
- **DaisyUI** - готовые компоненты для быстрой разработки
- **Lucide React** - красивые SVG иконки
- **Динамическая тема** - переключение между светлой и темной темой

## 🔄 State Management

Приложение использует **Zustand** для управления состоянием:

- `useAuthStore` - аутентификация и данные пользователя
- `useChatStore` - список чатов и текущий чат
- `useThemeStore` - управление темой оформления

## 📝 API Endpoints

### Аутентификация

- `POST /api/auth/signup` - Регистрация
- `POST /api/auth/login` - Вход
- `POST /api/auth/logout` - Выход
- `GET /api/auth/me` - Получить текущего пользователя
- `PUT /api/auth/update-profile` - Обновить профиль

### Сообщения

- `GET /api/messages/:userId` - Получить сообщения с пользователем
- `POST /api/messages/send/:userId` - Отправить сообщение
- `GET /api/messages/users` - Получить список пользователей

## 🐛 Исправления и Улучшения

- ✅ Полная система аутентификации с JWT
- ✅ Real-time обмен сообщениями через Socket.io
- ✅ Загрузка и сохранение изображений через Cloudinary
- ✅ Отслеживание статуса пользователей в реальном времени
- ✅ Управление профилем с аватаром
- ✅ Адаптивный UI с Tailwind CSS и DaisyUI
- ✅ Error handling и валидация данных
- ✅ Loading skeletons для лучшего UX

## 🚀 Для будущего развития

- [ ] Приватные группы чатов
- [ ] Поиск сообщений
- [ ] Удаление/редактирование сообщений
- [ ] Голосовые и видео-звонки
- [ ] Реакции на сообщения (emoji reactions)
- [ ] Архивирование чатов
- [ ] Двухфакторная аутентификация
- [ ] Мобильное приложение (React Native)

## 📄 Лицензия

Этот проект лицензирован под ISC License - см. файл LICENSE для деталей.

## 👨‍💻 Автор

**Farrukhataev**

- GitHub: [@farrukhataev](https://github.com/farrukhataev)
- Repository: [chirp-chat-app](https://github.com/farrukhataev/chirp-chat-app)

## 🤝 Участие в проекте

Вклады, issues и feature requests приветствуются!

1. Fork репозиторий
2. Создайте ветку для вашей функции (`git checkout -b feature/AmazingFeature`)
3. Коммитьте изменения (`git commit -m 'Add some AmazingFeature'`)
4. Пушьте в ветку (`git push origin feature/AmazingFeature`)
5. Откройте Pull Request

## ❓ Часто Задаваемые Вопросы

**Q: Как подключить MongoDB Atlas?**
A: Используйте строку подключения в формате `mongodb+srv://username:password@cluster.mongodb.net/chirp-chat`

**Q: Как получить Cloudinary API ключи?**
A: Зарегистрируйтесь на [cloudinary.com](https://cloudinary.com) и найдите ключи в Dashboard

**Q: На каком порту работает приложение?**
A: Frontend: 5173 (Vite), Backend: 5001 (Express)

**Q: Как запустить тесты?**
A: Команда `npm test` (в разработке)

---

**⭐ Если проект вам нравится, поставьте звезду!**
