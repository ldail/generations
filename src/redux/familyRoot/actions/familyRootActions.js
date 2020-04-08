import familyRootTypes from "../types/familyRootTypes";
import { getAllFamilyData } from "../../helpers/helpers";

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