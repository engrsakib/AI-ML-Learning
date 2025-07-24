import { IDivision } from "./division.interface";
import { Division } from "./division.model";

const createDivisons = async (payload: IDivision) => {
  const existingDivision = await Division.findOne({
    where: { name: payload.name },
  });
  if (existingDivision) {
    throw new Error("Division already exists");
  }
  const newDivision = Division.create(payload);
  return newDivision;
};

export const divisionsService = {
  createDivisons,
};
