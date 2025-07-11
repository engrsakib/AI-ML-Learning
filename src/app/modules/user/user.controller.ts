/* eslint-disable no-console */
import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { UserService } from "./user.service";
import AppError from "../../errorHelpers/appError";
import { sendResponse } from "../../util/sendResponse";


/**
 * UserController handles user-related requests.
 * It contains methods for creating a user.
 */
const createUser = async (req: Request, res: Response) => {
  try {
    const newUser = await UserService.createUser(req.body);
    res.status(httpStatus.CREATED).json({
      message: "User created successfully",
      user: newUser,
    });
  
  } catch (error) {
    console.log(error);
    throw new AppError("Failed to create user", httpStatus.INTERNAL_SERVER_ERROR);
  }
};


const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserService.getAllUsers();
    sendResponse(res, {
      success: true,
      message: "Users retrieved successfully",
      status: httpStatus.OK,
      data: users,
      metadata: {
        totalCount: users.length,
      },
    });
  } catch (error) {
    console.log(error);
    throw new AppError("Failed to retrieve users", httpStatus.INTERNAL_SERVER_ERROR);
  }
};

/**
 * UserController exports the methods to be used in routes.
 */

export const UserController = {
  createUser,
  getAllUsers,
};
