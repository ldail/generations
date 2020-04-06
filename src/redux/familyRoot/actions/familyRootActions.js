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