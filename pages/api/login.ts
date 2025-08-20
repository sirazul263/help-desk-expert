import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/mongoose";
import User from "../../models/User.cjs";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

type Data = { message: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") return res.status(405).end();

  const { email, password } = req.body;
  await dbConnect();

  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: "Invalid email" });
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid)
    return res.status(401).json({ message: "Invalid email or password" });

  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET!,
    { expiresIn: "1h" }
  );
  res.setHeader(
    "Set-Cookie",
    serialize("token", token, { httpOnly: true, path: "/", maxAge: 3600 })
  );

  res.status(200).json({ message: "Logged in successfully" });
}
