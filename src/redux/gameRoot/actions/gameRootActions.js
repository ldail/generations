import { SET_CURRENT_CHARACTER, START_GAME_TIMER, INCREMENT_GAME_MONTH } from "../types/gameRootTypes";
import { getAllFamilyData } from "../../helpers/helpers";
import { INITIAL_GAME_TIME } from "../../../assets/constants";

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

export const startGameTimer = () => ({
    type: START_GAME_TIMER,
    payload: INITIAL_GAME_TIME
});

export const incrementGameTime = () => ({
  type: INCREMENT_GAME_MONTH
})