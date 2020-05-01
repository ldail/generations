import { SET_CURRENT_CHARACTER, START_GAME_TIMER, INCREMENT_GAME_MONTH, SET_CURRENT_PAGE, SET_CURRENT_VIEW, DEV_ONLY_SET_GAME_SEEDED_INFO, SET_CURRENT_CHARACTER_FOR_DETAIL_VIEW, VIEW_CHARACTER_ON_MAP, SET_MAP_POSITION } from "../types/gameRootTypes"
import { INCREMENT_GAME_TIME_AMOUNT } from "../../../assets/constants";
import { pages, VIEW } from "../../../assets/pages";

const INITIAL_STATE = {
  currentPage: pages.PAGE_INTRO,
  currentView: VIEW.HOME,
  mapPositionToView: {}
}

const gameRootReducer = (state=INITIAL_STATE,action) => {
  switch (action.type) {
    case SET_CURRENT_CHARACTER:
      return {
        ...state,
        currentCharacters: action.payload.currentCharacters,
        currentView: action.payload.currentView
      }
      case START_GAME_TIMER:
        return {
          ...state,
          gameTime: action.payload
        }
      case INCREMENT_GAME_MONTH:
        return {
          ...state,
          gameTime: state.gameTime + INCREMENT_GAME_TIME_AMOUNT
        }
      case SET_CURRENT_PAGE:
        return {
          ...state,
          currentPage: action.payload
        }
      case SET_CURRENT_VIEW:
        return {
          ...state,
          currentView: action.payload
        }
      case SET_CURRENT_CHARACTER_FOR_DETAIL_VIEW:
        return {
          ...state,
          currentCharacterForDetailView: action.payload
        }
      case VIEW_CHARACTER_ON_MAP:
        return {
          ...state,
          currentView: VIEW.MAP,
          mapPositionToView: action.payload
        }
      case SET_MAP_POSITION:
        return {
          ...state,
          mapPositionToView: action.payload
        }
      case DEV_ONLY_SET_GAME_SEEDED_INFO:
        return {...action.payload}
    default:
      return state;
  }
};

export default gameRootReducer;

/* 
game:
  lastCompleted: [appConstants.familySetup, 3, 5]
  currentCharacters:  [charId, charId]
  gameTime: 95617584000
  currentPage: pages.PAGE_INTRO,
  currentView: VIEWS.HOME
  mapPositionToView: {coordinates: [x,y], zoom: 1}
  */