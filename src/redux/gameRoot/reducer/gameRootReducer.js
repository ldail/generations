import { SET_CURRENT_CHARACTER } from "../types/gameRootTypes"

const INITIAL_STATE = {}

const gameRootReducer = (state=INITIAL_STATE,action) => {
  switch (action.type) {
    case SET_CURRENT_CHARACTER:
      return {
        ...state,
        currentCharacters: action.payload
      }
    default:
      return state;
  }
};

export default gameRootReducer;

/* 
game:
  lastCompleted: [appConstants.familySetup, 3, 5]
  currentCharacters:  [charId, charId]*/