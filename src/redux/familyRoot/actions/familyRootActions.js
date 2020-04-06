import familyRootTypes from "../types/familyRootTypes";

export const setFamilyName = (familyName) => ({
  action: familyRootTypes.SET_FAMILY_NAME,
  payload: familyName
});

export const setBoyName = (boyname) => ({
  action: familyRootTypes.SET_BOY_NAME,
  payload: boyname
})