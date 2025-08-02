import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../util/catchAsync";
import { sendResponse } from "../../util/sendResponse";
import { ParcelServices } from "./percel.service";
import { decodedToken } from "../../util/decodedToken";



const createParcel = catchAsync(
  async (req: Request, res: Response) => {
    const token = req.headers.authorization;
    const decode = decodedToken(token as string);

    

    const senderId = decode.userId;

    const parcel = await ParcelServices.createParcel(req.body, senderId);

    sendResponse(res, {
      success: true,
      status: httpStatus.CREATED,
      message: "Parcel Created Successfully",
      data: parcel,
    });
  },
);

const updateParcelStatus = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!req.user) {
    throw new Error("Unauthorized: User not found in request");
  }
  const adminId = req.user._id;
  const { status, location, note } = req.body;

  const result = await ParcelServices.updateParcelStatus(
    id,
    { status, location, note },
    adminId,
  );

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Parcel status updated successfully",
    data: result,
  });
});

const cancelParcel = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!req.user) {
    throw new Error("Unauthorized: User not found in request");
  }
  const senderId = req.user._id;

  const result = await ParcelServices.cancelParcel(id, senderId);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Parcel cancelled successfully",
    data: result,
  });
});

const getAllParcel = catchAsync(
  async (req: Request, res: Response) => {
    const result = await ParcelServices.getAllParcels();

    sendResponse(res, {
      success: true,
      status: httpStatus.CREATED,
      message: "All Parcel Retrieved Successfully",
      data: result,
    });
  },
);

const getSingleParcel = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!req.user) {
    throw new Error("Unauthorized: User not found in request");
  }
  const user = req.user;

  const result = await ParcelServices.getSingleParcel(id, user);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Single Parcel Retrieved Successfully",
    data: result,
  });
});

const getMyParcels = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new Error("Unauthorized: User not found in request");
  }
  const senderId = req.user._id;

  const result = await ParcelServices.getMyParcels(senderId);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Sender's parcels retrieved successfully",
    data: result,
  });
});

/**
 * Controller for retrieving parcels intended for the authenticated receiver.
 */
const getIncomingParcels = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new Error("Unauthorized: User not found in request");
  }
  const receiverId = req.user._id;
  const result = await ParcelServices.getIncomingParcels(receiverId);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Receiver's incoming parcels retrieved successfully",
    data: result,
  });
});



export const ParcelControllers = {
  createParcel,
  getAllParcel,
  updateParcelStatus,
  cancelParcel,
  getSingleParcel,
  getMyParcels,
  getIncomingParcels,
};
