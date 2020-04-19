import React, { useState } from 'react';
import './FamilySetup.css';
import { connect } from 'react-redux';
import {promptMessages, primaryAttributes, gender, characterColors} from '../../assets/constants';
import animalStats from '../../assets/animalStats';
import xss from 'xss';
import smallBoy from '../../assets/smallboy.jpg';
import RotatingChoice from '../../components/rotatingChoice/rotatingChoice';
import { addNewCharacter, setFamilyName, setPrimaryAttribute } from '../../redux/familyRoot/actions/familyRootActions';
import { addNewPet } from '../../redux/petRoot/actions/petRootActions';
import {setCurrentCharacter, setCurrentPage} from '../../redux/gameRoot/actions/gameRootActions';
import { pages } from '../../assets/pages';

//TODO: Add prompt for color

const FamilySetup = ({addNewCharacterDispatch, addNewPetDispatch, setPrimaryAttributeDispatch, setFamilyNameDispatch, setCurrentPageDispatch, setCurrentCharacterDispatch, startGameTimer, currentPage}) => {

  const [currentPrompt, setCurrentPrompt] = useState(0);
  const [currentRotateChoice, setCurrentRotateChoice] = useState(0);

  const [familyName, setFamilyName] = useState('');
  const [boyName, setBoyName] = useState('');
  const [petTypeId, setPetTypeId] = useState(0);
  const [petName, setPetName] = useState('');
  const [primaryAttribute, setPrimaryAttribute] = useState(0);

  const handleBack = e => {
    if (e) {
      e.preventDefault();
    }
    if (currentPrompt > 0) {
      setCurrentPrompt(currentPrompt - 1);
      setCurrentRotateChoice(0);
    }
    else {
      //TODO: Add modal for `can't go back farther` or bring them back to intro page
      return;
    }
  }

  const handleSubmit = e => {
    if (e) {
      e.preventDefault();
    }
    if (currentPrompt === 0) {
      if (familyName === null || familyName === undefined || familyName === '') {
        return;
      }
    }
    if (currentPrompt === 1) {
      if (boyName === null || boyName === undefined || boyName === '') {
        return;
      }
    }
    if (currentPrompt === 4) {
      if (petName === null || petName === undefined || petName === '') {
        return;
      }
    }
    setCurrentPrompt(currentPrompt + 1);
    setCurrentRotateChoice(0);
    if (currentPrompt === 5) {
      setFamilyNameDispatch(familyName);
      setPrimaryAttributeDispatch(primaryAttribute);
      addNewPetDispatch({name: petName, id: 0, type: petTypeId, ownerId: 0})
      addNewCharacterDispatch({name: boyName, gender: gender.male, id: 0, parentId: null, partnerId: null, petId: 0, age: 10, color: characterColors.RED })
    }
    else if (currentPrompt === 6) {
      setCurrentCharacterDispatch(0);
      startGameTimer();
      setCurrentPageDispatch(pages.PAGE_CITY_ONE);
    }
  }
  
  const rotateChoice = (dataSetLength, value) => {
    let stateAlter = () => {};
    if (currentPrompt === 2) {
      stateAlter = setPrimaryAttribute;
    }
    else if (currentPrompt === 3) {
      stateAlter = setPetTypeId;
    }
    //If they move through past the last item
    if (currentRotateChoice === dataSetLength - 1 && value === 1) {
      setCurrentRotateChoice(0);
      stateAlter(0);
    }
    //If they go backwards before the first item
    else if (currentRotateChoice === 0 && value === -1) {
      setCurrentRotateChoice(dataSetLength - 1)
      stateAlter(dataSetLength - 1);
    }
    else {
      setCurrentRotateChoice(currentRotateChoice + value);
      stateAlter(currentRotateChoice + value)
    }
  }

  const displayStartingPetStatsChart = () => {
  let stats = getPetDataObjectByProperty('id',petTypeId).stats;
  let mapped = Object.entries(stats).map(([key, value], index) => {
    let backgroundColor = '';
    let growthRate = value.abbreviation;
    if (growthRate === 'H') {
      backgroundColor = 'greenBox';
    }
    else if (growthRate === 'M') {
      backgroundColor = 'yellowBox';
    }
    else if (growthRate === 'L') {
      backgroundColor = 'orangeBox'
    }
    return (
    <li className={`statInfo ${backgroundColor}`} key={key}>
      <div className="statInfoData">
        <span className="statTitle">{key}: </span>
        <span className="statValue">{value.initialValue}</span>
      </div>
      <span className="growthRate">{value.abbreviation}</span>
    </li>
    )
  })
  return mapped;
  }

  const displayPromptAnswer = () => {
    if (currentPrompt === 0) {
      return(
        <>
          <p>The</p>
          <input type="text" value={familyName} onChange={(e) => setFamilyName(xss(e.target.value))} autoFocus required />
          <p>Family</p>
        </>
      );
    }
    else if (currentPrompt === 1) {
      return (
        <input type="text" value={boyName} onChange={(e) => setBoyName(xss(e.target.value))} required autoFocus/>
      );
    }
    else if (currentPrompt === 2) {
      const choice = (
        <>
          <p className="attributeDescription">{primaryAttributes[currentRotateChoice].description}</p>
          <p className="statIncrease">+ {primaryAttributes[currentRotateChoice].stat}</p> 
        </>
      );
      return (
        <RotatingChoice
          rotateChoice={rotateChoice}
          dataSetLength={primaryAttributes.length}
          title={primaryAttributes[currentRotateChoice].name}
          icon={primaryAttributes[currentRotateChoice].icon}
          choice={choice}
          />
      );
    }
    else if (currentPrompt === 3) {
      const choice = (
        <>
          <h5>Level 10</h5>
          <div className="tableCategories">
            <span>Stat</span>
            <span>Growth Rate</span>
          </div>
          <ul>
            {displayStartingPetStatsChart()}
          </ul>
        </>
      )
      return (
        <RotatingChoice
          rotateChoice={rotateChoice}
          dataSetLength={Object.keys(animalStats.starterTypeChoices).length}
          title={getPetDataObjectByProperty('id',currentRotateChoice).name}
          icon={getPetDataObjectByProperty('id', currentRotateChoice).icon}
          choice={choice}
          />
      );
    }
    else if (currentPrompt === 4) {
      return (
        <input type="text" value={petName} onChange={(e) => setPetName(xss(e.target.value))} required autoFocus/>
      );
    }
    else if (currentPrompt === 5) {
      return (
        <>
          <div className="selectionInfo">
            <img src={smallBoy} alt="boy" />
            <div className="familyInfo">
              <h4>{boyName}</h4>
              <h4>{familyName}</h4>
              <div className="finalAttribute">
                <img src={primaryAttributes[primaryAttribute].icon} alt={primaryAttributes[primaryAttribute].name} />
                <span>{primaryAttributes[primaryAttribute].name}</span>
              </div>
            </div>
          </div>
          <div className="selectionInfo">
          <img src={getPetDataObjectByProperty('id', petTypeId).icon} alt={getPetDataObjectByProperty('id',petTypeId).name}/>
            <div className="familyInfo">
              <h4>{petName}</h4>
              <span>{getPetDataObjectByProperty('id', petTypeId).name}</span>
              <span>Level 10</span>
            </div>
          </div>
        </>
      );
    }
    else if (currentPrompt === 6) {
      return <p>{promptMessages.familySetup.messages[currentPrompt + 1]} {boyName}!</p>
    }
  }


  const renderFamilySetup = () => {
    return (
      <form className="familyPrompt" onSubmit={(e) => handleSubmit(e)}>
        <h2 className="promptHeader">{promptMessages.familySetup.messages[currentPrompt]}</h2>
        <div className="promptAnswer">
          {displayPromptAnswer()}
        </div>
      </form>
    );
  };

  const getPetDataObjectByProperty = (property, value) => {
    for (let [animalType,animalValues] of Object.entries(animalStats.types)) {
      if (animalStats.types[animalType][property] === value) {
        return animalValues;
      }
    }
  }


  return (
    <div id="FamilySetup">
      <div className="topBar" id="familyBar">
        <span>The <span className="bold">{familyName}</span> Family</span>
          {currentPrompt > 2 
            ? <img src={primaryAttributes[primaryAttribute].icon} alt={primaryAttributes[primaryAttribute].name} /> 
            : ''
          }
      </div>
      {currentPrompt > 0 
        ? <div className="topBar" id="characterBar">{boyName} {familyName}</div> 
        : ''
      }
      {currentPrompt > 3 
      ? <div className="topBar" id="petBar">
          {petName} - Level 10 - 
            <img src={getPetDataObjectByProperty('id', petTypeId).icon} alt={getPetDataObjectByProperty('id',petTypeId).name}/>
        </div> 
        : ''
      }
      {renderFamilySetup()}
      <div className="continueButtons">
        <button type="button" onClick={(e) => handleBack(e)} id="backButton">Back</button>
        <button type="button" onClick={(e) => handleSubmit(e)} id="forwardButton">Forward</button>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  family: state.family,
  pet: state.pet,
  currentPage: state.game.currentPage
});

const mapDispatchToProps = dispatch => ({

  setFamilyNameDispatch: (familyName) => dispatch(setFamilyName (familyName)),
  setPrimaryAttributeDispatch: (primaryAttribute) => dispatch(setPrimaryAttribute(primaryAttribute)),
  addNewCharacterDispatch: (newCharacter) => dispatch(addNewCharacter(newCharacter)),
  addNewPetDispatch: (newPet) => dispatch(addNewPet(newPet)),
  setCurrentCharacterDispatch: (characterId) => dispatch(setCurrentCharacter(characterId)),
  setCurrentPageDispatch: (newPageId) => dispatch(setCurrentPage(newPageId))
})

export default connect(mapStateToProps,mapDispatchToProps)(FamilySetup);