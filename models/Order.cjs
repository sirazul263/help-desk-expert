const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    companyName: { type: String, required: true },

    services: [{ type: String, required: true }],

    ticketPerDay: { type: String, required: true },

    marketings: [{ type: String, required: true }],

    firstName: { type: String, required: true },
    lastName: { type: String, required: true },

    email: { type: String, required: true },

    domain: { type: String, required: true },

    phone: { type: String, required: true },

    referrer: { type: String, required: false },

    agree: { type: Boolean, default: false },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"], // adjust as per your logic
      default: "pending",
    },

    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true } // ✅ createdAt & updatedAt auto-added
);

const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);

module.exports = Order;
