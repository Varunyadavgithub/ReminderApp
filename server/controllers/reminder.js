import Reminder from "../models/reminder.js";

// Add a new reminder
export const addReminder = async (req, res) => {
  try {
    const { reminderMsg, remindAt } = req.body;

    if (!reminderMsg || !remindAt) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newReminder = new Reminder({
      reminderMsg,
      remindAt,
      isReminded: false,
    });

    await newReminder.save();

    res
      .status(201)
      .json({
        success: true,
        message: "Reminder added successfully",
        reminder: newReminder,
      });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

// Get all reminders
export const getAllReminders = async (req, res) => {
  try {
    const reminders = await Reminder.find().sort({ remindAt: 1 }); // Sorted by time
    res.status(200).json({ success: true, reminders });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch reminders",
      error: error.message,
    });
  }
};

// Delete a reminder by ID
export const deleteReminder = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Reminder.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Reminder not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Reminder deleted successfully", id });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete reminder",
      error: error.message,
    });
  }
};
