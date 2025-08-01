import { User } from "../user/user.model";
import { Iparcels } from "./percel.interface";
import { Percel } from "./percel.mode";


const createPercel = async (payload: Iparcels, email: string) => {

  const user = await User.findOne({ email });

  if(!user){
    throw new Error("User not found");
  }

  const BaseSlug = payload.name.toLowerCase().split(" ").join("-");
  let slug = `${BaseSlug}-division`;
  const existingPercel = await Percel.findOne({ where: { name: payload.name } });
  if (existingPercel) {
    throw new Error("Percel with this slug already exists");
  }
  let count = 0;
  while (await Percel.exists({ slug })) {
    count++;
    slug = `${BaseSlug}-tour-${count}`;
  }
  payload.senderName = user?.name ?? "";
  payload.senderPhone = user?.phone ?? "";
  payload.senderAddress = user?.address ?? "";
  payload.senderEmail = user?.email ?? "";

  payload.slug = slug;
  payload.isActive = true;
  const percel = Percel.create(payload);
  return percel;
};

const getAllPercel = async () => {
  const percel = await Percel.find();
  return percel;
};

const getSingleParcel = async (email: string) => {
  const percel = await Percel.findOne({ senderEmail: email });
  if (!percel) {
    throw new Error("Parcel not found");
  }
  const totalParcels = await Percel.countDocuments({ senderEmail: email });
  if (totalParcels === 0) {
    throw new Error("No parcels found for this user");
  }

  return { percel, totalParcels };
};

// const createTourTypes = async (payload: IparcelsType) => {
//   const existingTourType = await TourType.findOne({
//     where: { name: payload.name },
//   });
//   if (existingTourType) {
//     throw new Error("Tour type with this name already exists");
//   }
//   const tourType = TourType.create(payload);
//   return tourType;
// };

export const PercelService = {
  createPercel,
  getAllPercel,
  getSingleParcel,
  // createTourTypes,
};
