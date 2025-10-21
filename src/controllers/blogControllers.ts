import { TryCatch } from "@/middlewares/error";
import { db } from "@/app";
import { Request, Response } from "express";

export const getAllBlogs = TryCatch(async (req: Request, res: Response) => {
  const blogs = await db.blog.findMany();
  res.status(200).json({
    success: true,
    blogs,
  });
});

export const getBlog = TryCatch(async (req: Request, res: Response) => {
  const blog = await db.blog.findUnique({
    where: {
      id: parseInt(req.params.id),
    },
  });
  res.status(200).json({
    success: true,
    blog,
  });
});

export const createBlog = TryCatch(async (req: Request, res: Response) => {
  const { title, content, userId, categoryIds } = req.body;

  const blog = await db.blog.create({
    data: {
      title,
      content,
      User: {
        connect: {
          id: Number(userId),
        },
      },
      category: {
        connect: categoryIds.map((id: number) => ({ id })),
      },
    },
  });

  res.status(201).json({
    success: true,
    blog,
  });
});

export const deleteBlog = TryCatch(async (req: Request, res: Response) => {
  const deletedBlog = await db.user.delete({
    where: {
      id: parseInt(req.params.id),
    },
  });
  res.status(200).json({
    success: true,
    deletedBlog,
  });
});

export const updateBlog = TryCatch(async (req: Request, res: Response) => {
  const { title, content, userId, categoryIds } = req.body;
  const updatedBlog = await db.blog.update({
    where: {
      id: Number(req.params.id),
    },
    data: {
      title,
      content,
      User: {
        connect: {
          id: userId,
        },
      },
      category: {
        connect: categoryIds.map((id: number) => ({ id: Number(id) })),
      },
    },
  });

  res.status(200).json({
    success: true,
    updatedBlog,
  });
});
