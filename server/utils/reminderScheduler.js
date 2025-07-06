import twilio from "twilio";
import Reminder from "../models/reminder.js";

export const startReminderScheduler = () => {
  setInterval(async () => {
    try {
      const reminderList = await Reminder.find({});

      for (const reminder of reminderList) {
        if (!reminder.isReminded) {
          const now = Date.now(); // UTC timestamp
          const remindAt = new Date(reminder.remindAt).getTime(); // UTC timestamp

          if (remindAt <= now) {
            // Mark reminder as sent
            await Reminder.findByIdAndUpdate(reminder._id, {
              isReminded: true,
            });

            // Twilio config
            const accountSid = process.env.TWILIO_ACCOUNT_SID;
            const authToken = process.env.TWILIO_AUTH_TOKEN;
            const client = twilio(accountSid, authToken);

            client.messages
              .create({
                from: "whatsapp:+14155238886",
                to: "whatsapp:+919106547391", // Or: reminder.phoneNumber
                body: `⏰ Reminder: ${
                  reminder.reminderMsg || "You have a task scheduled now."
                }`,
              })
              .then((message) =>
                console.log(`✅ WhatsApp sent: ${message.sid}`)
              )
              .catch((err) => console.error("❌ Twilio send error:", err));
          }
        }
      }
    } catch (err) {
      console.error("Error in reminder scheduler:", err);
    }
  }, 1000); // check every second
};
