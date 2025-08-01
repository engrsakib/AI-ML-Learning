import { Iparcels, IparcelsType } from "./percel.interface";
import { Tour, TourType } from "./percel.mode";

const createPercel = async (payload: Iparcels) => {
  const BaseSlug = payload.name.toLowerCase().split(" ").join("-");
  let slug = `${BaseSlug}-division`;
  const existingPercel = await Tour.findOne({ where: { name: payload.name } });
  if (existingPercel) {
    throw new Error("Percel with this slug already exists");
  }
  let count = 0;
  while (await Tour.exists({ slug })) {
    count++;
    slug = `${BaseSlug}-tour-${count}`;
  }
  payload.slug = slug;
  payload.isActive = true;
  const tour = Tour.create(payload);
  return tour;
};

const getAllTours = async () => {
  const tours = await Tour.find();
  return tours;
};

const getSingleTour = async (slug: string) => {
  const tour = await Tour.findOne({ where: { slug } });
  if (!tour) {
    throw new Error("Tour not found");
  }
  return tour;
};

const createTourTypes = async (payload: IparcelsType) => {
  const existingTourType = await TourType.findOne({
    where: { name: payload.name },
  });
  if (existingTourType) {
    throw new Error("Tour type with this name already exists");
  }
  const tourType = TourType.create(payload);
  return tourType;
};

export const PercelService = {
  createPercel,
  getAllTours,
  getSingleTour,
  createTourTypes,
};
