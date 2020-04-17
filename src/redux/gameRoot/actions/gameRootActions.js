import { SET_CURRENT_CHARACTER } from "../types/gameRootTypes";

export const setCurrentCharacter = payload => ({
  type: SET_CURRENT_CHARACTER,
  payload: [0]
});

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