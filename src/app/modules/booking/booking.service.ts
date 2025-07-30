import AppError from "../../errorHelpers/appError";
import getTransactionId from "../../util/getTransctionId";
import { User } from "../user/user.model";
import { BookingStatus, IBooking } from "./booking.interface";
import httpStatus from "http-status-codes";
import { Booking } from "./booking.model";

const createBooking = async (payload: Partial<IBooking>, userId: string) => {
  const transactionId = getTransactionId();
  try {
    
    const user = await User.findById(userId);
    if (!user || !user.phone || !user.address) {
      throw new AppError(
        "User must have a phone number and address to create a booking.",
        httpStatus.BAD_REQUEST,
      );
    }

    const booking = await Booking.create({
      ...payload,
      user: userId,
      status: BookingStatus.PENDING,
    });

    if (!booking) {
      throw new AppError("Booking creation failed.", httpStatus.INTERNAL_SERVER_ERROR);
    }
    

  } catch (error) {
    throw new AppError(`Error creating booking. ${error}`, httpStatus.INTERNAL_SERVER_ERROR);
  }
};

export const bookingService = { createBooking };
