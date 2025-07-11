import { IUser } from "./user.interface";
import { User } from "./user.model";

const createUser = async (payload: Partial<IUser>) => {
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
