import { SET_CURRENT_CHARACTER } from "../types/gameRootTypes";

export const setCurrentCharacter = characterId => ({
  type: SET_CURRENT_CHARACTER,
  payload: characterId
});