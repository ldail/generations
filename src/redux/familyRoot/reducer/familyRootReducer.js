import familyRootTypes from "../types/familyRootTypes";

const INITIAL_STATE = {};

const familyRootReducer = (state=INITIAL_STATE, action) => {
  switch (action.type) {
    case familyRootTypes.SET_FAMILY_NAME:
      return {
        ...state,
        familyName: action.payload
      }
    case familyRootTypes.SET_BOY_NAME:
      return {
        ...state,
        boyName: action.payload
      }
    case familyRootTypes.SET_PRIMARY_ATTRIBUTE:
      return {
        ...state,
        primaryAttribute: action.payload
      }
    case familyRootTypes.SET_STARTER_PET:
      return {
        ...state,
        starterPet: action.payload
      }
    case familyRootTypes.SET_PET_NAME:
      return {
        ...state,
        petName: action.payload
      }
    default:
      return state;
  }
}

export default familyRootReducer;