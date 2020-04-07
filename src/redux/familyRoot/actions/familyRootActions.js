import familyRootTypes from "../types/familyRootTypes";

export const setFamilyName = (familyName) => ({
  type: familyRootTypes.SET_FAMILY_NAME,
  payload: familyName
});

export const setBoyName = (boyname) => ({
  type: familyRootTypes.SET_BOY_NAME,
  payload: boyname
})

export const setPrimaryAttribute = (primaryAttribute) => ({
  type: familyRootTypes.SET_PRIMARY_ATTRIBUTE,
  payload: primaryAttribute
})

export const setStarterPetChoice = (starterPetChoice) => ({
  type: familyRootTypes.SET_STARTER_PET,
  payload: starterPetChoice
})

export const setPetName = (petName) => ({
  type: familyRootTypes.SET_PET_NAME,
  payload: petName
})

export const setPetType = (petType) => ({
  type: familyRootTypes.SET_PET_TYPE,
  payload: petType
})