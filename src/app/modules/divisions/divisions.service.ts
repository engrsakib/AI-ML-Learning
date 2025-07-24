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

export const divisionsService = {
  createDivisons,
};
