import { Types } from "mongoose";

export enum status {
  PENDING = "PENDING",
  IN_TRANSIT = "IN_TRANSIT",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
  PICK_UP = "PICK-UP",
  RETURNED = "RETURNED",
}

export interface Iparcels {
  id?: string;
  name: string;
  slug?: string;
  images?: string[];
  thumbnail?: string;
  senderName: string;
  senderPhone: string;
  senderEmail?: string;
  senderAddress: string;
  reciverName: string;
  reciverPhone: string;
  reciverAddress: string;
  reciverEmail?: string;
  weight: number;
  price: number;
  pickupDate: Date;
  expectedDeliveryDate: Date;
  division: Types.ObjectId;
  status: status;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  isActive?: boolean;
}

export interface IparcelsType {
  name: string;
}
