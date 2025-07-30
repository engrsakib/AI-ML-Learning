import getTransactionId from "../../util/getTransctionId";
import { User } from "../user/user.model";
import { IBooking } from "./booking.interface";

const createBooking = async (payload: Partial<IBooking>, userId: string) => {
  const transactionId = getTransactionId();
  const user = User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }

};

export const bookingService = { createBooking };
