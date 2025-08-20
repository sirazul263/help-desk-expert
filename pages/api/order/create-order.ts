import dbConnect from "@/lib/mongoose";
import type { NextApiRequest, NextApiResponse } from "next";
import Order from "../../../models/Order.cjs";

type Data = {
  status: number;
  message: string;
  order?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST")
    return res.status(405).json({ status: 0, message: "Method not allowed" });

  await dbConnect();

  try {
    const {
      companyName,
      services,
      ticketPerDay,
      marketings,
      firstName,
      lastName,
      email,
      domain,
      phone,
      referrer,
      agree,
    } = req.body;

    const order = await Order.create({
      companyName,
      services,
      ticketPerDay,
      marketings,
      firstName,
      lastName,
      email,
      domain,
      phone,
      referrer,
      agree,
      status: "pending", // default status
    });

    return res.status(201).json({ status: 1, message: "Order created", order });
  } catch (err: any) {
    console.error(err);
    return res
      .status(500)
      .json({ status: 0, message: "Failed to create order" });
  }
}
