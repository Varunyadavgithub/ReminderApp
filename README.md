# 📲 WhatsApp Reminder App

A full-stack application that lets users schedule reminders which are automatically sent via **WhatsApp using Twilio API** at the scheduled time.

---

## 🚀 Features

- 📝 Add custom reminders with messages and reminder time
- 📬 Automatically sends WhatsApp reminders using Twilio
- 🗃️ View and manage all reminders from the frontend
- ❌ Delete reminders
- 📦 Stores reminders in MongoDB
- 💬 Realtime scheduler running in backend using `setInterval`

---

## 🛠 Tech Stack

### 🌐 Frontend
- React 19
- Tailwind CSS 4
- Axios
- React-Datetime-Picker
- React-Hot-Toast
- Vite

### 🔧 Backend
- Node.js
- Express.js
- MongoDB & Mongoose
- Twilio (WhatsApp Messaging API)
- Dotenv
- Nodemon (for development)

---

## 📁 Folder Structure

```

WhatsAppReminder/
│
├── client/               # Frontend (React)
│   └── ...               # Components, Styles, Logic
│
├── server/               # Backend (Express)
│   ├── controllers/      # Reminder logic
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── utils/            # Reminder scheduler
│   ├── server.js         # Entry point
│   └── .env              # Environment variables

````

---

### 🔐 Environment Variables

#### 📦 Backend (`/server/.env`)

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string

TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
```

#### 🌐 Frontend (`/client/.env`)

```env
VITE_API_BASE_URL=http://localhost:3000
```

> 🔁 **Note:** Make sure the backend is running on the same port as `VITE_API_BASE_URL`. If your backend uses `PORT=3000`, the frontend should point to `http://localhost:3000`.

---

## 🛠️ Getting Started

### 📦 Backend Setup

```bash
cd server
npm install
npm run dev
```

### 🌐 Frontend Setup

```bash
cd client
npm install
npm run dev
```

> Frontend will run at `http://localhost:5173`

---

## 🔔 How it Works

1. User schedules a reminder from the frontend.
2. The backend stores the reminder in MongoDB.
3. A scheduler (running every second) checks for due reminders.
4. If the reminder time has passed and it's not already sent, Twilio sends the WhatsApp message.
5. Reminder is marked as "sent" (`isReminded: true`) to avoid duplicate messages.

---

## 📸 Screenshots
![Screenshot 2025-07-06 090606](https://github.com/user-attachments/assets/54814067-2372-4823-9d5b-470eabf022ca)

---

## ✨ Future Enhancements

* User authentication
* Custom phone number input
* Email reminders
* Edit reminder functionality
* Admin dashboard to monitor reminders sent

---

## 👨‍💻 Author

Made with ❤️ by **Varun Yadav**
[LinkedIn](https://www.linkedin.com/in/thecyberdevvarun) • [GitHub](https://github.com/varunyadavgithub) • [X](https://x.com/varun_yadav01)

---

## 📄 License

This project is open-source and free to use under the [MIT License](LICENSE).
