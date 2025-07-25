import { Itour } from "./tour.interface";
import { Tour } from "./tour.mode";

const createTour = async (payload: Itour) => {
  const BaseSlug = payload.name.toLowerCase().split(" ").join("-");
  let slug = `${BaseSlug}-division`;
  const existingTour = await Tour.findOne({ where: { name: payload.name } });
  if (existingTour) {
    throw new Error("Tour with this slug already exists");
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

export const TourService = {
  createTour,
  getAllTours,
  
};
