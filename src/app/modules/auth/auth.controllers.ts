import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { sendResponse } from "../../util/sendResponse";

const credentialsLogin = async (req: Request, res: Response) => {
  sendResponse(res, {
    success: true,
    message: "Login successful",
    status: httpStatus.OK,
    data: { user, token },
  });
};

export const AuthController = {
  credentialsLogin,
};
