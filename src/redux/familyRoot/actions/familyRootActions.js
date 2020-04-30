import familyRootTypes from "../types/familyRootTypes";
import { getAllFamilyData } from "../../helpers/helpers";
import {seedCharacterData, MAP_MOVEMENT_DISTANCE } from "../../../assets/constants";
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

export const setlastCityPosition = (mapPosition) => {
  const currentCharacter = store.getState().game.currentCharacters[0];
  const {characters} = getAllFamilyData();
  const currentCharacterInfo = characters.find(character => character.id === currentCharacter);
  const currentCharacterIndex = characters.indexOf(character => character.id === currentCharacter);
  currentCharacterInfo.lastCityPosition = mapPosition;
  characters[currentCharacterIndex] = currentCharacterInfo;
  return {
    type: familyRootTypes.SET_LAST_CITY_POSITION,
    payload: characters
  }
};

export const setLastMapPosition = () => {
  const newCharacters = [];
  const characters = store.getState().family.characters;
  characters.forEach(character => {
    if (character.partnerLeader) {
      let newCharacter = character;
      if (character.lastMapPosition.nextLocation) {
        const currentPosition = {x: character.lastMapPosition.x, y: character.lastMapPosition.y};
        const {nextLocation} = character.lastMapPosition;
        const upcomingPosition = {x: currentPosition.x, y: currentPosition.y};
        if (currentPosition.x < nextLocation.x) {
          upcomingPosition.x = currentPosition.x + MAP_MOVEMENT_DISTANCE >= nextLocation.x ? nextLocation.x : currentPosition.x + MAP_MOVEMENT_DISTANCE;
        }
        else if (currentPosition.x > nextLocation.x) {
          upcomingPosition.x = currentPosition.x - MAP_MOVEMENT_DISTANCE <= nextLocation.x ? nextLocation.x : currentPosition.x - MAP_MOVEMENT_DISTANCE;
        }
        if (currentPosition.y < nextLocation.y) {
          upcomingPosition.y = currentPosition.y + MAP_MOVEMENT_DISTANCE >= nextLocation.y ? nextLocation.y : currentPosition.y + MAP_MOVEMENT_DISTANCE;
        }
        else if (currentPosition.x > nextLocation.x) {
          upcomingPosition.x = currentPosition.y - MAP_MOVEMENT_DISTANCE <= nextLocation.y ? nextLocation.y : currentPosition.y - MAP_MOVEMENT_DISTANCE;
        }
        newCharacter = {...character, lastMapPosition: {...character.lastMapPosition, ...upcomingPosition}};
        if (currentPosition.x === upcomingPosition.x && currentPosition.y === upcomingPosition.y && character.lastMapPosition.nextLocation) {
          delete newCharacter.lastMapPosition.nextLocation;
        }
      }
      newCharacters.push(newCharacter);
    }
    else {
      newCharacters.push(character)
    }
  });
  return {
    type: familyRootTypes.SET_LAST_MAP_POSITION,
    payload: newCharacters
  }
}

export const setFamilyTree = () => {
  let newFamilyTree = '';
  return {
    type: familyRootTypes.SET_FAMILY_TREE,
    payload: newFamilyTree
  }
}









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