import { model, Schema } from "mongoose";
import { Iparcels, IparcelsType, status } from "./percel.interface";

// TourType Schema
const tourTypeSchema = new Schema<IparcelsType>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const TourType = model<IparcelsType>("TourType", tourTypeSchema);

// Parcel Schema (percelSchema) - updated as per your interface
const percelSchema = new Schema<Iparcels>(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      default: [],
    },
    thumbnail: {
      type: String,
      default: null,
    },
    senderName: {
      type: String,
      required: true,
    },
    senderPhone: {
      type: String,
      required: true,
    },
    senderAddress: {
      type: String,
      required: true,
    },
    reciverName: {
      type: String,
      required: true,
    },
    reciverPhone: {
      type: String,
      required: true,
    },
    reciverAddress: {
      type: String,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    pickupDate: {
      type: Date,
      required: true,
    },
    expectedDeliveryDate: {
      type: Date,
      required: true,
    },
    division: {
      type: Schema.Types.ObjectId,
      ref: "Division",
      required: true,
    },
    tourType: {
      type: Schema.Types.ObjectId,
      ref: "TourType",
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(status),
      required: true,
      default: status.PENDING,
    },
    description: {
      type: String,
      default: null,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Percel = model<Iparcels>("Percel", percelSchema);
export { TourType, tourTypeSchema };