
import AppError from "../../errorHelpers/appError";
import { isActive, IUser } from "../user/user.interface";
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

// refresh token logic
const getNewAccessToken = async (refreshToken: string) => {
  if (!refreshToken) {
    throw new AppError("Refresh token is required", 400);
  }

  try {
    // Verify the refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET as string) as IUser;
    const user = await User.findById(decoded._id).select("-password");
    
    if (!user) {
      throw new AppError("User not found", 404);
    }
    if(user){
      // Check if the user is active or not
      if (user.isActive === isActive.BLOCKED) {
        throw new AppError("User is not active", 403);
      }else if (user.isDeleted) {
        throw new AppError("User is deleted", 403);
      }
    }

    const newAccessToken = jwt.sign({
      id: user._id,
      email: user.email,
      role: user.role,
      name: user.name,
    }, process.env.JWT_SECRET as string, {
      expiresIn: Number(process.env.ACCESS_TOKEN_EXPIRES_IN) || 3600, // Default to 1 hour if not specified
    });

    return { user, newAccessToken };
  } catch (error) {
    throw new AppError(`Invalid refresh token: ${error}`, 401);
  }
};

export const AuthService = {
  credentialsLogin,
  getNewAccessToken,
};
