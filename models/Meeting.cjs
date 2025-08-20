const mongoose = require("mongoose");
const getCurrentTimeZone = () =>
  Intl.DateTimeFormat().resolvedOptions().timeZone;

const MeetingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    companyName: [{ type: String, required: true }],
    date: { type: String, required: true }, // YYYY-MM-DD
    time: { type: String, required: true }, // HH:MM
    timeZone: { type: String, default: getCurrentTimeZone },
    services: [{ type: String, required: true }],
    phone: { type: String, required: true },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status: {
      type: String,
      enum: ["scheduled", "completed", "cancelled"],
      default: "scheduled",
    },
  },
  { timestamps: true }
);

// Optional: you can also update the timezone if it’s empty before saving
MeetingSchema.pre("save", function (next) {
  if (!this.timeZone) {
    this.timeZone = getCurrentTimeZone();
  }
  next();
});

const Meeting =
  mongoose.models.Meeting || mongoose.model("Meeting", MeetingSchema);

module.exports = Meeting;
