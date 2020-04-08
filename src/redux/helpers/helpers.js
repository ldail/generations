import store from '../store';

export const getAllFamilyData = () => {
  return store.getState().family;
}

export const getAllPetData = () => {
  return store.getState().pet;
}

export const getAllGameData = () => {
  return store.getState().game;
}