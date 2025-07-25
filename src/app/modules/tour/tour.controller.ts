import { Request, Response } from "express";
import AppError from "../../errorHelpers/appError";
import { TourService } from "./tour.service";
import { sendResponse } from "../../util/sendResponse";

const createTour = async (req: Request, res: Response) => {
  try {
    const newTour = await TourService.createTour(req.body);
    res.status(201).json({
      message: "Tour created successfully",
      tour: newTour,
    });
  } catch (error) {
    throw new AppError(`Failed to create tour: ${error}`, 500);
  }
};

export const TourController = {
  createTour,
};