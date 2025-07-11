import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { UserService } from "./user.service";
import AppError from "../../errorHelpers/appError";

const createUser = async (req: Request, res: Response) => {
  try {
    const newUser = await UserService.createUser(req.body);
    res.status(httpStatus.CREATED).json({
      message: "User created successfully",
      user: newUser,
    });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  } catch (error) {
    throw new AppError("Failed to create user", httpStatus.INTERNAL_SERVER_ERROR);
  }
};

export const UserController = {
  createUser,
};
