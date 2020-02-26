import familyRootTypes from "../types/familyRootTypes";

export const setFamilyName = (familyName) => ({
  action: familyRootTypes.SET_FAMILY_NAME,
  payload: familyName
});

