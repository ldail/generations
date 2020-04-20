import { SET_CURRENT_CHARACTER, START_GAME_TIMER, INCREMENT_GAME_MONTH, SET_CURRENT_PAGE, SET_CURRENT_VIEW, DEV_ONLY_SET_GAME_SEEDED_INFO, SET_CURRENT_CHARACTER_FOR_DETAIL_VIEW } from "../types/gameRootTypes";
import { getAllFamilyData } from "../../helpers/helpers";
import { INITIAL_GAME_TIME } from "../../../assets/constants";
import { pages, VIEW } from "../../../assets/pages";

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

export const setCurrentCharacterForDetailView = (characterId) => ({
  type: SET_CURRENT_CHARACTER_FOR_DETAIL_VIEW,
  payload: characterId
})



//Only to be used for development
export const devOnlySetSeededGameInfo = () => {
  const payload = {};
  payload.currentCharacters = [8,10];
  payload.gameTime = INITIAL_GAME_TIME;
  payload.currentView = VIEW.HOME;
  payload.currentPage = pages.PAGE_CITY_ONE;
  return( {
    type: DEV_ONLY_SET_GAME_SEEDED_INFO,
    payload
  })
}