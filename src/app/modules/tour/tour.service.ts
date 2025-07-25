import { Itour } from "./tour.interface";
import { Tour } from "./tour.mode";

const createTour = async (payload: Itour) => {
  const existingTour = await Tour.findOne({ slug: payload.slug });
  if (existingTour) {
    throw new Error("Tour with this slug already exists");
  }
  const tour = Tour.create(payload);
  return tour;
};

export const TourService = {
  createTour,
  // Add other tour-related service functions here
};
