import React from 'react';
import { connect } from 'react-redux';
import PersonInfo from './PersonInfo/PersonInfo';
import animalStats from '../../../assets/animalStats';

const PersonInfoHeader = ({familyCharacters, pets, currentCharacters}) => {

  const renderPersonInfo = characterId => {
    const characterInfo = familyCharacters.find(character => character.id === characterId)
    const characterName = characterInfo.name;
    const characterAge = characterInfo.age;
    const characterPetInfo = pets.find(pet => pet.ownerId === characterId);
    const characterPetName = characterPetInfo.name;
    const characterPetType = characterPetInfo.type;
    const characterPetTypeIcon = animalStats.types[characterPetType].icon

    return (
      <PersonInfo
        characterName={characterName}
        characterAge={characterAge}
        characterPetName={characterPetName}
        characterPetTypeIcon={characterPetTypeIcon}
      />
    );
  }

  return (
    <div id="PersonInfoHeader">
      {renderPersonInfo(currentCharacters[0])}
      {currentCharacters[1]
        ? renderPersonInfo(currentCharacters[1])
        : null
      }
    </div>
  );
};

const mapStateToProps = state => ({
  familyCharacters: state.family.characters,
  pets: state.pets,
  currentCharacters: state.game.currentCharacters
})

export default connect(mapStateToProps,null)(PersonInfoHeader);