import type { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";

type Data = { message: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // Clear the cookie
  res.setHeader(
    "Set-Cookie",
    serialize("token", "", {
      httpOnly: true,
      path: "/",
      expires: new Date(0), // Expire immediately
    })
  );

  res.status(200).json({ message: "Logged out successfully" });
}
