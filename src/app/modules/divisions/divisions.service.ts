import { IDivision } from "./division.interface";
import { Division } from "./division.model";

const createDivisons = async (payload: IDivision) => {
  const BaseSlug = payload.name.toLowerCase().split(" ").join("-");
  let slug = `${BaseSlug}-division`;
  const existingDivision = await Division.findOne({
    where: { name: payload.name },
  });
  if (existingDivision) {
    throw new Error("Division already exists");
  }
  let count = 0;
  while (await Division.exists({ slug })) {
    count++;
    slug = `${BaseSlug}-division-${count}`;
  }
  payload.slug = slug;
  payload.isActive = true;
  const newDivision = Division.create(payload);
  return newDivision;
};

const getAllDivisions = async () => {
  const divisions = await Division.find({});
  const divisionCount = await Division.countDocuments();
  return{
    data: divisions,
    meta:{
      total: divisionCount,
    },
  };
};

const getSingleDivision = async (slug: string) => {
  const division = await Division.findOne({ slug });
  if (!division) {
    throw new Error("Division not found");
  }
  return division;
};

export const divisionsService = {
  createDivisons,
  getAllDivisions,
  getSingleDivision,
};
