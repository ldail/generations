import petRootTypes from "../types/petRootTypes";

const INITIAL_STATE = {};

const petRootReducer = (state=INITIAL_STATE, action) => {
  switch (action.type) {
    case petRootTypes.ADD_NEW_PET:
      return {
        ...state,
        pets: [...state.pets, action.payload]
      }
    default:
      return state;
  }
}

export default petRootReducer;



/*

Example Redux State:


family: 
  familyName: 'xxx',
  attribute: 0,
  characters: [{name: 'john', gender: appConstants.m, partnerId: null, petId: 0, id: 0, level: 0}]
pet:
  pets: [{name: 'whipper', type: appConstants.petType, ownerId: 0, }]
game:
  lastCompleted: [appConstants.familySetup, 3, 5]

  */