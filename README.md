Учебный full-stack проект с авторизацией пользователя через JWT.

Проект состоит из frontend-приложения на React и backend API на Express. Реализована авторизация, хранение состояния пользователя через Zustand, автоматическая передача JWT в запросах и защита приватных маршрутов.

   Возможности

- Авторизация пользователя через email и пароль
- Получение JWT-токена после успешного входа
- Хранение токена в `localStorage`
- Управление авторизацией через Zustand
- Защищённый маршрут `/profile`
- Получение данных профиля с backend API
- Автоматическое добавление JWT в HTTP-запросы через Axios interceptor
- Обработка ошибки `401 Unauthorized`
- Автоматический выход при недействительном JWT
- Logout с удалением токена
- Сохранение авторизации после обновления страницы

   Используемые технологии

  Frontend

- React
- TypeScript
- Vite
- Axios
- Zustand
- React Router

  Backend

- Node.js
- Express
- TypeScript
- JSON Web Token (JWT)
- CORS
- dotenv
