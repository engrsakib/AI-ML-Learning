import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { sendResponse } from "../../util/sendResponse";
import { AuthService } from "./auth.service";

const credentialsLogin = async (req: Request, res: Response) => {

  const loginInfo = await AuthService.credentialsLogin(req.body);
  sendResponse(res, {
    success: true,
    message: "Login successful",
    status: httpStatus.OK,
    data: { user: loginInfo },
  });
};

export const AuthController = {
  credentialsLogin,
};
