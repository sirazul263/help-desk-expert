import dbConnect from "@/lib/mongoose";
import type { NextApiRequest, NextApiResponse } from "next";
import Order from "../../../models/Order.cjs";

type Data = {
  status: number;
  message: string;
  data?: any[];
  total?: number;
  page?: number;
  limit?: number;
  lastPage?: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "GET")
    return res.status(405).json({ status: 0, message: "Method not allowed" });

  await dbConnect();

  try {
    const { page = 1, limit = 10, status, companyName, email } = req.query;

    const query: any = {};

    // Filters
    if (status) query.status = status;
    if (companyName) query.companyName = { $regex: companyName, $options: "i" };
    if (email) query.email = { $regex: email, $options: "i" };

    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);

    const total = await Order.countDocuments(query);
    const lastPage = Math.ceil(total / limitNum);

    const orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum);

    return res.status(200).json({
      status: 1,
      message: "Orders fetched successfully",
      data: orders,
      total,
      page: pageNum,
      limit: limitNum,
      lastPage: lastPage,
    });
  } catch (err: any) {
    console.error(err);
    return res
      .status(500)
      .json({ status: 0, message: "Failed to fetch orders" });
  }
}
