import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import ReminderRoute from "./routes/reminder.js";
import { startReminderScheduler } from "./utils/reminderScheduler.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

connectDB();
startReminderScheduler(); // ✅ Start your reminder logic

app.use("/api/v1", ReminderRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is Running on port: ${port}`);
});
