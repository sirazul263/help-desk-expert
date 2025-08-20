import dbConnect from "@/lib/mongoose";
import { z } from "zod";
import type { NextApiRequest, NextApiResponse } from "next";
import Meeting from "../../../models/Meeting.cjs";

// Define Zod schema
const meetingSchema = z.object({
  name: z.string("Name is required").min(1, "Name is required"),
  email: z
    .string("Please enter a valid email")
    .email("Please enter a valid  email"),
  companyName: z
    .string("Company Name Domain is required")
    .min(1, "Company Name Domain is required"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .refine((val) => /^(\+)?\d{7,15}$/.test(val), {
      message: "Please enter a valid phone number with country code",
    }),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  services: z.array(z.string()).min(1, "Please select at least one service"),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ status: 0, message: "Method not allowed" });
  }
  try {
    await dbConnect();
    // Parse & validate request body
    const data = meetingSchema.parse(req.body);
    const meeting = new Meeting(data);
    await meeting.save();
    return res.status(201).json({ status: 1, meeting });
  } catch (error) {
    console.error("Error creating meeting:", error);
    return res.status(500).json({ status: 0, message: "Server error" });
  }
}
