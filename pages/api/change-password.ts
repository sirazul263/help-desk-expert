import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/mongoose";
import User from "../../models/User.cjs";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

type Data = { message: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") return res.status(405).end();

  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Not authenticated" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
    };

    const { newPassword } = req.body;
    if (!newPassword)
      return res.status(400).json({ message: "New password is required" });

    await dbConnect();
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.findByIdAndUpdate(decoded.id, { password: hashedPassword });

    res.status(200).json({ message: "Password changed successfully" });
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
}
