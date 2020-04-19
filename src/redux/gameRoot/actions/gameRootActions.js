import { SET_CURRENT_CHARACTER, START_GAME_TIMER, INCREMENT_GAME_MONTH, SET_CURRENT_PAGE, SET_CURRENT_VIEW } from "../types/gameRootTypes";
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

export const startGameTimer = () => ({
    type: START_GAME_TIMER,
    payload: INITIAL_GAME_TIME
});

export const incrementGameTime = () => ({
  type: INCREMENT_GAME_MONTH
});

export const setCurrentPage = (pageId) => ({
  type: SET_CURRENT_PAGE,
  payload: pageId
});

export const setCurrentView = (view) => ({
  type: SET_CURRENT_VIEW,
  payload: view
})