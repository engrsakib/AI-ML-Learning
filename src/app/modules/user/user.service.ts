import { IUser } from "./user.interface";
import { User } from "./user.model";

const createUser = async (payload: Partial<IUser>) => {
  if (!payload.email || !payload.password) {
    throw new Error("Email and password are required to create a user");
  }
  const existingUser = await User.findOne({ email: payload.email });
  if (existingUser) {
    throw new Error("User with this email already exists");
  }

  const user = new User(payload);
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
