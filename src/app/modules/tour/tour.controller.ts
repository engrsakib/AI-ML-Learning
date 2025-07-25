import { Request, Response } from "express";
import AppError from "../../errorHelpers/appError";
import { TourService } from "./tour.service";


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

const getAllTours = async (req: Request, res: Response) => {
  try {
    const tours = await TourService.getAllTours();
    res.status(200).json({
      message: "Tours retrieved successfully",
      tours,
    });
  } catch (error) {
    throw new AppError(`Failed to retrieve tours: ${error}`, 500);
  }
};

export const TourController = {
  createTour,
  getAllTours,
};