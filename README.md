# 🤖 Tizita - Real-Time AI Chat & Community Hub

> *A feature-rich, real-time AI and community chat application built with Node.js, Express, Socket.io, and client-side persistence.*

[![GitHub Repo](https://img.shields.io/badge/GitHub-Eazybel%2Ftizita-blue?style=flat&logo=github)](https://github.com/Eazybel/tizita.git)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## 🌟 Key Features

*   **🤖 INSA Summer Camp Informatics Web app and Telegram Bot:** An integrated AI chatbot that delivers up-to-date information, answers queries, and guides users regarding the INSA Summer Camp program across web and Telegram interfaces.
*   **💬 Real-Time Active Users Chat:** Connect and chat live with other users currently online using high-performance Socket.io websockets with personalized display names.
*   **📜 Chat History Persistence (`localStorage`):** Never lose your conversations upon page refresh. All chat sessions are saved locally on your device.
*   **❓ Frequently Asked Questions (FAQ):** Built-in guide answering common queries and navigation instructions directly within the platform.
*   **🛡️ Express Rate Limiter:** Built-in backend rate limiting to ensure API stability, prevent spamming, and optimize server resource usage.
*   **📚 Open API & Webhook Access:** Fully exposed endpoints allowing developers to consume our AI service and integrate it into custom projects, bots, or frontends.

---

## 🚀 Quickstart & Complete Setup

Prerequisites: Node.js (v16+) and npm (v8+). Run all commands in your terminal:

```bash
# 1. Clone the repository and enter the directory
git clone [https://github.com/Eazybel/tizita.git](https://github.com/Eazybel/tizita.git)
cd tizita

# 2. Install all dependencies
npm install

# 3. Create environment configuration (.env)
echo "PORT=5000" > .env
echo "CORS_ORIGIN=*" >> .env

# 4. Start the server (development mode with hot-reload or production mode)
npm run dev    # for development
# OR
npm start      # for production

---

## 🔌 API Usage

The platform exposes the AI webhook endpoint at:

https://insachatbot.onrender.com/webhook/4b84d270-681b-421d-a729-3331ef424e7e

Use a POST request with a JSON body containing a `QUESTION` field. For example:

```javascript
fetch('https://insachatbot.onrender.com/webhook/4b84d270-681b-421d-a729-3331ef424e7e', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ QUESTION: 'Your question here' })
})
  .then(r => r.text())
  .then(console.log)
  .catch(console.error)
```

### How to use this endpoint

1. Send your question in the `QUESTION` field.
2. The webhook returns the answer as plain text.
3. You can use this endpoint in any project, such as a website, bot, or mobile app.
4. If you want to reuse it, copy the fetch example and replace the question text with your own.

> Error handling tip: always add a `.catch(...)` to handle network failures, and show a friendly message if the request fails.

> Rate limiting note: this endpoint is protected by backend limits, so avoid sending repeated requests too quickly. If you see `Too many requests`, wait a moment and try again.

Keep the URL private for official users and avoid sharing it publicly if you do not want it to be used by others.