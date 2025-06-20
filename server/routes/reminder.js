import express from "express";
import {
  addReminder,
  deleteReminder,
  getAllReminders,
} from "../controllers/reminder.js";

const reminderRoute = express.Router();

reminderRoute.post("/add", addReminder);
reminderRoute.get("/", getAllReminders);
reminderRoute.delete("/:id", deleteReminder);

export default reminderRoute;
