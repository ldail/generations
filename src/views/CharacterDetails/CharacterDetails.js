import React from 'react';
import PersonInfoHeader from '../../components/View/PersonInfoHeader/PersonInfoHeader';
import NavInfoFooter from '../../components/View/NavInfoFooter/NavInfoFooter';
import './CharacterDetails.css';
import { connect } from 'react-redux';
import animalStats from '../../assets/animalStats';
import { setCurrentCharacter } from '../../redux/gameRoot/actions/gameRootActions';

const CharacterDetails = ({currentCharacters,characters, pets, switchToCharacter}) => {
  const currentCharacterInfo = characters.find(character => character.id === currentCharacters[0]);
  const currentPetInfo = pets.find(pet => pet.id === currentCharacterInfo.petId);
  let currentPetSprite = null;
  let currentPetTypeText = null;
  for (let animalType in animalStats.types) {
    console.log(animalType);
    if (animalStats.types[animalType].id === currentPetInfo.type) {
      currentPetSprite = animalStats.types[animalType].icon
      currentPetTypeText = animalStats.types[animalType].name
    }
  }
  let spouseCharacterInfo = null;
  let spousePetInfo = null;
  let spousePetSprite = null;
  let spousePetTypeText = null;
  if (currentCharacters[1]) {
    spouseCharacterInfo = characters.find(character => character.id === currentCharacters[1])
    spousePetInfo = pets.find(pet => pet.id === spouseCharacterInfo.petId);
    for (let animalType in animalStats.types) {
      if (animalStats.types[animalType].id === spousePetInfo.type) {
        spousePetSprite = animalStats.types[animalType].icon
        spousePetTypeText = animalStats.types[animalType].name
      }
    }
  }

  return (
    <div className="characterDetails">
      <PersonInfoHeader />
      
      <div className="parentBar">
        <ul>
          <li>
            <span className="parentColor">{`{y}`}</span>
          </li>
          <li>
            <span className="parentName">Jeff</span>
          </li>
          <li>
            {`&`}
          </li>
          <li>
            <span className="parentName">Laurie</span>
          </li>
        </ul>
        <span className="seeParentArrow">
          »
        </span>
      </div>

      <div className="currentCharacterInfo">
        <div className="currentCharacter">
          <div className="icons">
              <div className="characterColor">
                {currentCharacterInfo.color}
              </div>
              <div className="smallDivider">
                -----
              </div>
              <div className="seeCharOnMap">
                {`{seeOnMap}`}
              </div>
              <div className="switchToChar" onClick={() => switchToCharacter(currentCharacterInfo.id)}>
                {`{switchToChar}`}
              </div>
          </div>
          <div className="characterDetails">
            <span className="currentCharacterName">
              {currentCharacterInfo.name}
            </span>
            <span className="currentCharacterAge">
              {currentCharacterInfo.age}
            </span>
            {spouseCharacterInfo 
            ? <>
                <span className="currentCharacterName">
                    {spouseCharacterInfo.name}
                </span>
                <span className="currentCharacterAge">
                  {spouseCharacterInfo.age}
                </span>
              </>
            : null }
          </div>
        </div>
        <div className="divider">
          ------{`&`}-----
        </div>
        <div className="currentPet">
          <div className="petInfo">
            <div className="petSprite">
              <img src={currentPetSprite} alt="pet" />
            </div>
            <div className="petStats">
              {`{stats}`}
            </div>
            <div className="petDetails">
              <span className="PetName">
                {currentPetInfo.name}
              </span>
              <span className="petType">
                {currentPetTypeText}
              </span>
            </div>
          </div>
          {spousePetInfo
          ? <div className="petInfo">
              <div className="petSprite">
                <img src={spousePetSprite} alt="pet" />
              </div>
              <div className="petStats">
                {`{stats}`}
              </div>
              <div className="petDetails">
                <span className="PetName">
                  {spousePetInfo.name}
                </span>
                <span className="petType">
                  {spousePetTypeText}
                </span>
              </div>
            </div>
          : null }
        </div>
      </div>

      <div className="childrenInfo">
        <ul>
          <li className="childInfo">
            <span className="childName">
              {`{childName}`}
            </span>
            <span className="childColor">
              {`{childColor}`}
            </span>
            <span className="seeChildArrows">
              »
            </span>
          </li>
          <li className="childInfo">
            <span className="childName">
              {`{childName}`}
            </span>
            <span className="childColor">
              {`{childColor}`}
            </span>
            <span className="seeChildArrows">
              »
            </span>
          </li>
          <li className="childInfo">
            <span className="childName">
              {`{childName}`}
            </span>
            <span className="childColor">
              {`{childColor}`}
            </span>
            <span className="seeChildArrows">
              »
            </span>
          </li>
        </ul>
      </div>

      <div className="turnToTree">
        {`<<`}
      </div>

      <NavInfoFooter />
    </div>
  );
};

const mapStateToProps = state => ({
  currentCharacters: state.game.currentCharacters,
  characters: state.family.characters,
  pets: state.pet.pets
})

const mapDispatchToProps = dispatch => ({
  switchToCharacter: (characterId) => dispatch(setCurrentCharacter(characterId))
})
export default connect(mapStateToProps,mapDispatchToProps)(CharacterDetails);