import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { User } from "./user.model";

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const newUser = await User.create(user);
    res.status(httpStatus.CREATED).json({
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Error creating user", error });
  }
};

export const UserController = {
  createUser,
};
