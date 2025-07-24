import { Request, Response } from "express";
import AppError from "../../errorHelpers/appError";
import { divisionsService } from "./divisions.service";

const createDivisions = async (req: Request, res: Response) => {
  try {
    const newDivision = await divisionsService.createDivisons(req.body);
    res.status(201).json({
      message: "Division created successfully",
      division: newDivision,
    });
  } catch (error) {
    throw new AppError(`Failed to create division: ${error}`, 500);
  }
};




export const divisionsController = {
  createDivisions,
};
