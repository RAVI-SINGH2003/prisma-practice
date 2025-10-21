import { TryCatch } from "@/middlewares/error";
import { db } from "@/app";
import { Request, Response } from "express";
//Notes:
// 1. we can not use select and include together
// 2. use include when you know you want all the fields
// 3. use select when you know you want selected fields
export const getAllUsers = TryCatch(async (req: Request, res: Response) => {
  // const users = await db.user.findMany({
  //   include: {
  //     notificationMethods: {
  //       select: {
  //         mobile: true,
  //       },
  //     },
  //     blogs : true
  //   },
  // });

  const users = await db.user.findMany({
    select: {
      name: true,
      email: true,
      notificationMethods: {
        select: {
          mobile: true,
        },
      },
      blogs: true,
    },
  });

  res.status(200).json({
    success: true,
    users,
  });
});

export const getUser = TryCatch(async (req: Request, res: Response) => {
  const user = await db.user.findUnique({
    where: {
      id: parseInt(req.params.id),
    },
  });
  res.status(200).json({
    success: true,
    user,
  });
});

export const createUser = TryCatch(async (req: Request, res: Response) => {
  const { name, age, email, notificationMethodId } = req.body;
  const user = await db.user.create({
    data: {
      name,
      age,
      email,
      notificationMethods: {
        connect: {
          id: Number(notificationMethodId),
        },
      },
    },
  });
  res.status(201).json({
    success: true,
    user,
  });
});

export const deleteUser = TryCatch(async (req: Request, res: Response) => {
  const deletedUser = await db.user.delete({
    where: {
      id: parseInt(req.params.id),
    },
  });
  res.status(200).json({
    success: true,
    deletedUser,
  });
});

export const updateUser = TryCatch(async (req: Request, res: Response) => {
  const updatedUser = await db.user.update({
    where: {
      email: req.params.id,
    },
    data: req.body,
  });

  res.status(200).json({
    success: true,
    updatedUser,
  });
});

export const createOrUpdateUser = TryCatch(
  async (req: Request, res: Response) => {
    const { name, age, email } = req.body;
    const user = await db.user.upsert({
      where: {
        id: Number(req.params.id),
      },
      update: {
        name,
        age,
        email,
      },
      create: {
        name,
        age,
        email,
      },
    });

    res.status(200).json({
      success: true,
      user,
    });
  }
);
