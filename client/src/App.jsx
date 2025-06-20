import { useState } from "react";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import Card from "./components/Card";
import { useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const App = () => {
  const [reminderMsg, setReminderMsg] = useState("");
  const [remindeAt, setRemindeAt] = useState();
  const [reminders, setReminders] = useState([]);

  const fetchReminders = async () => {
    try {
      const res = await axios.get(`${baseURL}/api/v1/`);

      if (res?.data.success) {
        setReminders(res.data.reminders);
      }
    } catch (error) {
      console.error("Failed to fetch reminders:", error);
      toast.error("Failed to fetch reminders:");
    }
  };

  const handleAddReminder = async () => {
    if (!reminderMsg || !remindeAt) {
      toast.error("Please enter reminder message and date/time.");
      return;
    }
    try {
      const res = await axios.post(`${baseURL}/api/v1/add`, {
        reminderMsg,
        remindAt: remindeAt,
      });
      if (res?.data.success) {
        setReminderMsg("");
        setRemindeAt(null);
        fetchReminders();
        toast.success("Reminder added successfully.");
      }
    } catch (error) {
      toast.error("Failed to add reminder:");
      console.error("Failed to add reminder:", error);
    }
  };

  const handleDeleteReminder = async (id) => {
    try {
      const res = await axios.delete(`${baseURL}/api/v1/${id}`);
      if (res?.data.success) {
        fetchReminders();
        toast.success("Reminder deleted successfully.");
      }
    } catch (error) {
      toast.error("Failed to delete reminder:");
      console.error("Failed to delete reminder:", error);
    }
  };

  useEffect(() => {
    fetchReminders();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex flex-col items-center py-10 px-4">
      <div className="bg-white shadow-xl rounded-xl p-6 w-full max-w-md space-y-5">
        <h1 className="text-3xl font-bold text-center text-indigo-700">
          Reminder App
        </h1>

        <input
          type="text"
          placeholder="Enter reminder note..."
          value={reminderMsg}
          onChange={(e) => setReminderMsg(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <div className="w-full">
          <DateTimePicker
            value={remindeAt}
            onChange={setRemindeAt}
            minDate={new Date()}
            minutePlaceholder="mm"
            hourPlaceholder="hh"
            dayPlaceholder="DD"
            monthPlaceholder="MM"
            yearPlaceholder="YYYY"
            className="w-full"
          />
        </div>

        <button
          onClick={handleAddReminder}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
        >
          Add Reminder
        </button>
      </div>

      <div className="mt-10 w-full max-w-md space-y-4">
        {reminders.length >= 0 &&
          reminders.map((reminder) => (
            <Card
              key={reminder._id}
              note={reminder.reminderMsg}
              time={new Date(reminder.remindAt).toLocaleString("en-GB", {
                timeZone: "Asia/Kolkata",
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true,
              })}
              onDelete={() => handleDeleteReminder(reminder._id)}
            />
          ))}
      </div>
    </div>
  );
};

export default App;
