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

// export const generateFamilyTree = () => {
//   const {characters} = getAllFamilyData();
//   const charactersSortedById = characters.sort((a,b) => {
//     a = a.id;
//     b = b.id;
//     return b - a;
//   })
//   let familyTree = [];

//   for (let i=0;i<charactersSortedById.length - 1;i++) {
//     let currentCharacter = charactersSortedById[i];
//     if (currentCharacter.partnerLeader) {
//       if (currentCharacter.parentId) {
        
//       }
//       else { //The root character
//         familyTree.push({id: i, children: []})
//       }
//     }
//   }

// }