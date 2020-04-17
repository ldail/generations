import { SET_CURRENT_CHARACTER } from "../types/gameRootTypes";
import { getAllFamilyData } from "../../helpers/helpers";

export const setCurrentCharacter = characterId => {
  const characters = getAllFamilyData().characters;
  const characterInfo = characters.find(character => character.id === characterId);
  const partnerId = characterInfo.partnerId;
  const payload = [characterId];
  if (partnerId >= 0) {
    payload.push(partnerId)
  }
  return ({
    type: SET_CURRENT_CHARACTER,
    payload
  });
};

export const setCurrentCharacterAsync = characterId => {
  return (dispatch, getState) => {
    const characters = getState().family.characters;
    const characterInfo = characters.find(character => character.id === characterId);
    const partnerId = characterInfo.partnerId;
    const payload = [characterId];
    if (partnerId >= 0) {
      payload.push(partnerId)
    }
    console.log(payload);
    dispatch({
      type: SET_CURRENT_CHARACTER,
      payload
    });
  }
};