import { BookingStatus } from "../booking/booking.interface";
import { Booking } from "../booking/booking.model";
import { PaymentStatus } from "./payment.interface";
import { Payment } from "./payment.model";

const successPayment = async (query: Record<string, string>) => {
  const session = await Booking.startSession();
  session.startTransaction();
  try {
    const UpdatedPayments = await Payment.findOneAndUpdate(
      { transactionId: query.transactionId },
      { status: PaymentStatus.PAID },
      { new: true, session },
    );

    if (!UpdatedPayments) {
      throw new Error("Payment not found or already updated.");
    }
    const updatedBooking = await Booking.findByIdAndUpdate(
      { _id: UpdatedPayments.bookingId },
      { status: BookingStatus.CONFIRMED },
      { new: true, session },
    );

    if (!updatedBooking) {
      throw new Error("Booking not found or already updated.");
    }

    await session.commitTransaction();
    session.endSession();

    return { success: true, message: "Payment and booking updated successfully." };
  } catch (error) {
    throw new Error("Payment success handling failed: " + error);
  }
};






export const paymentsService = {
  successPayment,
};