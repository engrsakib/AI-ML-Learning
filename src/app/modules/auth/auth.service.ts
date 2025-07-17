import AppError from "../../errorHelpers/appError";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import  bcrypt  from "bcryptjs";
import jwt from "jsonwebtoken";
const credentialsLogin = async (payload: Partial<IUser>) => {
  const { email, password } = payload;
  // Logic for user authentication goes here
  const isUserExists = await User.findOne({ email });
  if (!isUserExists) {
    throw new AppError("User not found", 404);
  }

  const isPasswordValid = await bcrypt.compare(password as string, isUserExists.password as string);
  if (!isPasswordValid) {
    throw new AppError("Invalid password", 401);
  }

  const acccessToken = jwt.sign({
    id: isUserExists._id,
    email: isUserExists.email,
    role: isUserExists.role,
    name: isUserExists.name,
  }, process.env.JWT_SECRET as string, {
    expiresIn:  Number(process.env.ACCESS_TOKEN_EXPIRES_IN) || 3600, // Default to 1 hour if not specified
  });
  const refreshToken = jwt.sign({
    id: isUserExists._id,
    email: isUserExists.email,
    role: isUserExists.role,
    name: isUserExists.name,
  }, process.env.JWT_REFRESH_TOKEN_SECRET as string, {
    expiresIn: Number(process.env.REFRESH_TOKEN_EXPIRES_IN) || 604800, // Default to 7 days if not specified
  });

  // delete isUserExists.password; // Remove password from the user object before returning
  isUserExists.password = ""; // Ensure password is not returned in the response

  // If authentication is successful, return user information or token
  return {
    user: isUserExists,
    acccessToken,
    refreshToken,
  };
};

export const AuthService = {
  credentialsLogin,
};
