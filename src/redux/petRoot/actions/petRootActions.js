import petRootTypes from "../types/petRootTypes";

export const addNewPet = (newPet) => ({
  type: petRootTypes.ADD_NEW_PET,
  payload: newPet
})