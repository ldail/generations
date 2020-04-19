import petRootTypes from "../types/petRootTypes";
import { seededPetData } from "../../../assets/constants";

export const addNewPet = (newPet) => ({
  type: petRootTypes.ADD_NEW_PET,
  payload: newPet
})


//Dev only

export const devOnlySetSeededPetInfo = () => {

  const payload = {};
  payload.pets = seededPetData;
  return ({
    type: petRootTypes.DEV_ONLY_SET_PET_SEEDED_INFO,
    payload
  })
}