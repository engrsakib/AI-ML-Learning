import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { sendResponse } from "../../util/sendResponse";
import { AuthService } from "./auth.service";


const credentialsLogin = async (req: Request, res: Response) => {

  const loginInfo = await AuthService.credentialsLogin(req.body);
  res.cookie("refreshToken", loginInfo.refreshToken, {
    httpOnly: true,
  });
  sendResponse(res, {
    success: true,
    message: "Login successful",
    status: httpStatus.OK,
    data: loginInfo ,
  });
};
const getNewAccessToken = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;
 
  const tokenInfo = await AuthService.getNewAccessToken(refreshToken);
  sendResponse(res, {
    success: true,
    message: "New access token generated successfully",
    status: httpStatus.OK,
    data: tokenInfo ,
  });
};

export const AuthController = {
  credentialsLogin,
  getNewAccessToken,
};
