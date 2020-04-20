import React, { useEffect, useState } from 'react';
import PersonInfoHeader from '../../components/View/PersonInfoHeader/PersonInfoHeader';
import NavInfoFooter from '../../components/View/NavInfoFooter/NavInfoFooter';
import './CharacterDetails.css';
import { connect } from 'react-redux';
import animalStats from '../../assets/animalStats';
import { setCurrentCharacter, setCurrentView, setCurrentCharacterForDetailView } from '../../redux/gameRoot/actions/gameRootActions';
import { VIEW } from '../../assets/pages';
import styled from 'styled-components';

const StyledCircle = styled.div`
  display: block;
  border-radius: 50%;
  width: ${({circleSize}) => circleSize};
  height: ${({circleSize}) => circleSize};
  background-color: ${({hexCode}) => hexCode};
`;

const CharacterDetails = ({currentCharacterForDetailView, currentCharacters,characters, pets, switchToCharacter, setCurrentView, setCurrentCharacterForDetailView}) => {

  useEffect(() => {
    return () => {
      setCurrentCharacterForDetailView(null);
    }
  },[]);

  const [viewCharacter, setViewCharacter] = useState(characters.find(character => character.id === (currentCharacterForDetailView ? currentCharacterForDetailView : currentCharacters[0])));

  const currentPetInfo = pets.find(pet => pet.id === viewCharacter.petId);
  let currentPetSprite = null;
  let currentPetTypeText = null;
  for (let animalType in animalStats.types) {
    if (animalStats.types[animalType].id === currentPetInfo.type) {
      currentPetSprite = animalStats.types[animalType].icon
      currentPetTypeText = animalStats.types[animalType].name
    }
  }
  let spouseCharacterInfo = null;
  let spousePetInfo = null;
  let spousePetSprite = null;
  let spousePetTypeText = null;
  if (viewCharacter.partnerId) {
    spouseCharacterInfo = characters.find(character => character.id === viewCharacter.partnerId)
    spousePetInfo = pets.find(pet => pet.id === spouseCharacterInfo.petId);
    for (let animalType in animalStats.types) {
      if (animalStats.types[animalType].id === spousePetInfo.type) {
        spousePetSprite = animalStats.types[animalType].icon
        spousePetTypeText = animalStats.types[animalType].name
      }
    }
  }

  let parentCharacterInfo = characters.find(character => character.id === viewCharacter.parentId) || 'ROOT';
  let parentSpouseCharacterInfo = characters.find(character => character.id === parentCharacterInfo.partnerId) || null;

  let childrenCharactersInfo = characters.filter(character => character.parentId === viewCharacter.id) || null;


  return (
    <div className="characterDetails">
      <PersonInfoHeader />
      
      {parentCharacterInfo !== 'ROOT' 
        ? <div className="parentBar" onClick={() => setViewCharacter(characters.find(character => character.id === parentCharacterInfo.id))}>
            <ul>
              <li>
                <StyledCircle 
                  className="parentColor"
                  circleSize={'25px'}
                  hexCode={parentCharacterInfo.color.hexCode}
                />
              </li>
              <li>
                <span className="parentName">{parentCharacterInfo.name}</span>
              </li>
              <li>
                {`&`}
              </li>
              <li>
                <span className="parentName">{parentSpouseCharacterInfo.name}</span>
              </li>
            </ul>
            <span className="seeParentArrow">
              »
            </span>
          </div>
        : null
      }

      <div className="currentCharacterInfo">
        <div className="currentCharacter">
          <div className="icons">
              <StyledCircle 
                className="characterColor"
                circleSize={'50px'}
                hexCode={viewCharacter.color.hexCode}
              />
              <div className="smallDivider">
                -----
              </div>
              <div className="seeCharOnMap">
                {`{seeOnMap}`}
              </div>
              <div className="switchToChar" onClick={() => switchToCharacter(viewCharacter.id)}>
                {`{switchToChar}`}
              </div>
          </div>
          <div className="characterDetails">
            <span className="currentCharacterName">
              {viewCharacter.name}
            </span>
            <span className="currentCharacterAge">
              {viewCharacter.age}
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
          {childrenCharactersInfo 
          ? childrenCharactersInfo.map(childInfo => (
            <li className="childInfo" onClick={() => setViewCharacter(characters.find(character => character.id === childInfo.id))}>
              <span className="childName">
                {childInfo.name}
              </span>
              <StyledCircle 
                className="childColor"
                circleSize={'25px'}
                hexCode={childInfo.color.hexCode}
              />
              <span className="seeChildArrows">
                »
              </span>
            </li>))
          : <li>No children</li>
          }
        </ul>
      </div>

      <div className="turnToTree" onClick={() => setCurrentView(VIEW.TREE)}>
        {`<<`}
      </div>

      <NavInfoFooter />
    </div>
  );
};

const mapStateToProps = state => ({
  currentCharacters: state.game.currentCharacters,
  characters: state.family.characters,
  pets: state.pet.pets,
  currentCharacterForDetailView: state.game.currentCharacterForDetailView
})

const mapDispatchToProps = dispatch => ({
  switchToCharacter: (characterId) => dispatch(setCurrentCharacter(characterId)),
  setCurrentView: (newView) => dispatch(setCurrentView(newView)),
  setCurrentCharacterForDetailView: (characterId) => dispatch(setCurrentCharacterForDetailView(characterId))
})
export default connect(mapStateToProps,mapDispatchToProps)(CharacterDetails);