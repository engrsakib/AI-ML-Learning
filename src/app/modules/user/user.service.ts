import { IUser } from "./user.interface";
import { User } from "./user.model";
import bcrypt from "bcryptjs";

const createUser = async (payload: Partial<IUser>) => {

  const { password, ...userData } = payload;

  if (!payload.email || !payload.password) {
    throw new Error("Email and password are required to create a user");
  }
  const existingUser = await User.findOne({ email: payload.email });
  if (existingUser) {
    throw new Error("User with this email already exists");
  }

  const hashedPassword = await bcrypt.hash(password as string, 10);

  const user = new User({ ...userData, password: hashedPassword });
  const newUser = await User.create(user);
  return newUser;
};

const getAllUsers = async () => {
  const users = await User.find();
  if (!users || users.length === 0) {
    throw new Error("No users found");
  }
  const userCount = await User.countDocuments();
  return { users, userCount };
};

export const UserService = {
  createUser,
  getAllUsers,
};
