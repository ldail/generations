import familyRootTypes from "../types/familyRootTypes";

const INITIAL_STATE = {};

const familyRootReducer = (state=INITIAL_STATE, action) => {
  switch (action.type) {
    case familyRootTypes.SET_FAMILY_NAME:
      return {
        ...state,
        familyName: action.payload
      }
    default:
      return state;
  }
}

export default familyRootReducer;