import { Request, Response } from "express";
import  httpStatus  from "http-status-codes";
import bcrypt from "bcryptjs";
import AppError from "../../errorHelpers/appError";
import { UserService } from "../user/user.service";
import { sendResponse } from "../../util/sendResponse";

const credentialsLogin = async(req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new AppError("Email and password are required", httpStatus.BAD_REQUEST);
    }

    const user = await UserService.findUserByEmail(email);
    if (!user) {
      throw new AppError("User not found", httpStatus.NOT_FOUND);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new AppError("Invalid password", httpStatus.UNAUTHORIZED);
    }

    // Assuming generateToken is a function that generates a JWT token
    const token = generateToken(user._id);

    sendResponse(res, {
      success: true,
      message: "Login successful",
      status: httpStatus.OK,
      data: { user, token },
    });
  } catch (error) {
    console.log(error);
    throw new AppError("Failed to login", httpStatus.INTERNAL_SERVER_ERROR);
  }
};

export const AuthController = {
  credentialsLogin,
};