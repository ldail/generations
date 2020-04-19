import familyRootTypes from "../types/familyRootTypes";
import { getAllFamilyData } from "../../helpers/helpers";
import {seedCharacterData } from "../../../assets/constants";
import store from '../../store';


export const setFamilyName = (familyName) => ({
  type: familyRootTypes.SET_FAMILY_NAME,
  payload: familyName
});

export const setPrimaryAttribute = (primaryAttribute) => ({
  type: familyRootTypes.SET_PRIMARY_ATTRIBUTE,
  payload: primaryAttribute
})

export const addNewCharacter = (character) => {
  return {
    type: familyRootTypes.ADD_NEW_CHARACTER,
    payload: character
  }
}

export const setCharacterProperty = (characterId, newPropertyName, newPropertyValue) => {
  const {characters} = getAllFamilyData();
  const newCharacters = characters.slice();
  try {
    const foundCharacterIndex = newCharacters.findIndex(character => character.id === characterId);
    newCharacters[foundCharacterIndex][newPropertyName] = newPropertyValue;
    return {
      type: familyRootTypes.SET_CHARACTER_PROPERTY,
      payload: newCharacters
    }
  }
  catch(err) {
    console.error(err);
    throw new Error(err);
  }
}

export const setLastMapPosition = (mapPosition) => {
  const currentCharacter = store.getState().game.currentCharacters[0];
  const {characters} = getAllFamilyData();
  const currentCharacterInfo = characters.find(character => character.id === currentCharacter);
  const currentCharacterIndex = characters.indexOf(character => character.id === currentCharacter);
  currentCharacterInfo.lastMapPosition = mapPosition;
  characters[currentCharacterIndex] = currentCharacterInfo;
  return {
    type: familyRootTypes.SET_LAST_MAP_POSITION,
    payload: characters
  }
};



//To be used only for development
export const devOnlySetSeededFamilyInfo = () => {
  const payload = {};
  payload.familyName = 'Johnson';
  payload.attribute = 0;
  payload.characters = seedCharacterData;

  return ({
    type: familyRootTypes.DEV_ONLY_SET_FAMILY_SEEDED_INFO,
    payload
  })
}