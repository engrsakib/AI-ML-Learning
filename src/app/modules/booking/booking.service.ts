import AppError from "../../errorHelpers/appError";
import getTransactionId from "../../util/getTransctionId";
import { User } from "../user/user.model";
import { BookingStatus, IBooking } from "./booking.interface";
import httpStatus from "http-status-codes";
import { Booking } from "./booking.model";
import { Payment } from "../payments/payment.model";
import { PaymentStatus } from "../payments/payment.interface";
import { Tour } from "../tour/tour.mode";

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

    const tour = await Tour.findById(payload.tour).select("costFrom");
    if( !tour?.costFrom ) {
      throw new AppError(
        "Tour must have a cost to create a booking.",
        httpStatus.BAD_REQUEST,
      );
    }

   
    const amount = Number(tour.costFrom) * Number(payload.guestCount);


    const booking = await Booking.create({
      ...payload,
      user: userId,
      status: BookingStatus.PENDING,
    });

    if (!booking) {
      throw new AppError(
        "Booking creation failed.",
        httpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    
    const payment = await Payment.create({
      bookingId: booking._id,
      status: PaymentStatus.UNPAID,
      transactionId: transactionId,
      amount: amount,
    });

    if (!payment) {
      throw new AppError(
        "Payment creation failed.",
        httpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
      booking._id,{
        payment: payment._id,
      },{ new: true, runValidators: true }).populate("user", "name email phone address").populate("tour","name maxGests").populate("payment", "amount status");

    if (!updatedBooking) {
      throw new AppError(
        "Booking update failed.",
        httpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return updatedBooking;
  } catch (error) {
    throw new AppError(
      `Error creating booking. ${error}`,
      httpStatus.INTERNAL_SERVER_ERROR,
    );
  }
};

export const bookingService = { createBooking };
