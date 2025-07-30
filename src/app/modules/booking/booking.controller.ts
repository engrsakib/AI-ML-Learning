import { Request, Response } from "express";
import AppError from "../../errorHelpers/appError";
import httpStatus from "http-status-codes";
import { bookingService } from "./booking.service";


const createBooking = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization;
    const booking = await bookingService.createBooking(req.body, "ss");
    res.status(200).json({
      message: "Booking created successfully",
      data: booking,
    });
  } catch (error) {
    throw new AppError(
      `Error creating booking. ${error}`,
      httpStatus.INTERNAL_SERVER_ERROR
    );
  }
};


export const bookingController = {
  createBooking,
};