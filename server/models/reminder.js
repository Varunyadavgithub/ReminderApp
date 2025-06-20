import mongoose from "mongoose";

const reminderSchema = new mongoose.Schema(
  {
    reminderMsg: {
      type: String,
      required: true,
      trim: true,
    },
    remindAt: {
      type: Date,
      required: true,
    },
    isReminded: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

const Reminder = mongoose.model("Reminder", reminderSchema);
export default Reminder;
