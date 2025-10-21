import { TryCatch } from "@/middlewares/error";
import { db } from "@/app";
import { Request, Response } from "express";

export const createCategory = TryCatch(async (req: Request, res: Response) => {
  const category = await db.category.create({
    data: req.body,
  });
  res.status(201).json({
    success: true,
    category,
  });
});
