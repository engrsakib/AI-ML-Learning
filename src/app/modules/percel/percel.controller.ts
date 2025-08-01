import { Request, Response } from "express";
import AppError from "../../errorHelpers/appError";
import { PercelService } from "./percel.service";

const createPercel = async (req: Request, res: Response) => {
  try {
    const newParcel = await PercelService.createPercel(req.body);
    res.status(201).json({
      message: "Parcel created successfully",
      parcel: newParcel,
    });
  } catch (error) {
    throw new AppError(`Failed to create parcel: ${error}`, 500);
  }
};

const getAllParcels = async (req: Request, res: Response) => {
  try {
    const parcels = await PercelService.getAllPercel();
    res.status(200).json({
      message: "Parcels retrieved successfully",
      data: parcels,
    });
  } catch (error) {
    throw new AppError(`Failed to retrieve parcels: ${error}`, 500);
  }
};

const getSingleParcel = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const parcel = await ParcelService.getSingleParcel(slug);
    res.status(200).json({
      message: "Parcel retrieved successfully",
      data: parcel,
    });
  } catch (error) {
    throw new AppError(`Failed to retrieve parcel: ${error}`, 500);
  }
};

const createParcelTypes = async (req: Request, res: Response) => {
  try {
    const newParcelType = await ParcelService.createParcelTypes(req.body);
    res.status(201).json({
      message: "Parcel type created successfully",
      parcelType: newParcelType,
    });
  } catch (error) {
    throw new AppError(`Failed to create parcel type: ${error}`, 500);
  }
};

export const ParcelController = {
  createPercel,
  getAllParcels,
  getSingleParcel,
  createParcelTypes,
};
