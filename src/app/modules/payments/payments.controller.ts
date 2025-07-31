import { Request, Response } from "express";
import { paymentsService } from "./payments.service";

const successPayment = async (req: Request, res: Response) => {
  const { query } = req;

  try {
    const result = await paymentsService.successPayment(query as Record<string, string>);

    if (!result.success) {
      return res.status(404).json({ message: "Payment or booking not found." });
    }

    // ✅ শুধু redirect করুন, frontend নিজে জানবে success
    return res.redirect(`${process.env.SSL_COMMERZ_SUCCESS_FRONTEND_URL}?transactionId=${query.transactionId}`);
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const paymentsController = {
  successPayment,
};
