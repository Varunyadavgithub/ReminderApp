import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
dotenv.config();
import ReminderRoute from "./routes/reminder.js";

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

app.use("/api/v1", ReminderRoute);
const port = process.env.PORT || 5000;

app.listen(port, (req, res) => {
  console.log(`Server is Running on port:${port}`);
});
