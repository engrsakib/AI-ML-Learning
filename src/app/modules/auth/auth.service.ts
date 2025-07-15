import AppError from "../../errorHelpers/appError";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import  bcrypt  from "bcryptjs";
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

  // If authentication is successful, return user information or token
  return {
    id: isUserExists._id,
    email: isUserExists.email,
    // Include any other user information you want to return
  };
};

export const AuthService = {
  credentialsLogin,
};
