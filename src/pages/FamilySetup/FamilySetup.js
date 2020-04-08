import React, { useState } from 'react';
import './FamilySetup.css';
import { connect } from 'react-redux';
import {promptMessages, primaryAttributes, petData} from '../../assets/constants';
import xss from 'xss';
import smallBoy from '../../assets/smallboy.jpg';
import RotatingChoice from '../../components/rotatingChoice/rotatingChoice';

const FamilySetup = () => {

  const [currentPrompt, setCurrentPrompt] = useState(0);
  const [currentRotateChoice, setCurrentRotateChoice] = useState(0);

  const [familyName, setFamilyName] = useState('');
  const [boyName, setBoyName] = useState('');
  const [petName, setPetName] = useState('');
  const [petType, setPetType] = useState('');
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
    setCurrentPrompt(currentPrompt + 1);
    setCurrentRotateChoice(0);
  }
  
  const rotateChoice = (dataSetLength, value) => {
    //If they move through past the last item
    if (currentRotateChoice === dataSetLength - 1 && value === 1) {
      setCurrentRotateChoice(0);
    }
    //If they go backwards before the first item
    else if (currentRotateChoice === 0 && value === -1) {
      setCurrentRotateChoice(dataSetLength - 1)
    }
    else {
      setCurrentRotateChoice(currentRotateChoice + value);
    }
  }

  const displayStartingPetStatsChart = () => {
  let stats = Object.entries(petData.stats)
  let mapped = stats.map((stat, index) => {
    let backgroundColor = '';
    let growthRate = stat.abbreviation;
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
    <li className={`statInfo ${backgroundColor}`} key={Object.keys(stats)[index]}>
      <div className="statInfoData">
        <span className="statTitle">{Object.keys(stats)[index]}: </span>
        <span className="statValue">{stat.value}</span>
      </div>
      <span className="growthRate">{growthRate}</span>
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
          <input type="text" value={familyName} onChange={(e) => setFamilyName(xss(e.target.value))} autofocus required />
          <p>Family</p>
        </>
      );
    }
    else if (currentPrompt === 1) {
      return (
        <input type="text" value={boyName} onChange={(e) => setBoyName(xss(e.target.value))} required autofocus/>
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
          dataSetLength={petData.length}
          title={petData[currentRotateChoice].name}
          icon={petData[currentRotateChoice].icon}
          choice={choice}
          />
      );
    }
    else if (currentPrompt === 4) {
      return (
        <input type="text" value={petName} onChange={(e) => setPetName(xss(e.target.value))} required autofocus/>
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
          <img src={petData[petType].icon} alt={petType}/>
            <div className="familyInfo">
              <h4>{petName}</h4>
              <span>{petType}</span>
              <span>Level 10</span>
            </div>
          </div>
        </>
      );
    }
    else if (currentPrompt === 6) {
      return <p>{promptMessages[currentPrompt + 1]}</p>
    }
  }


  const renderFamilySetup = () => {
    return (
      <form className="familyPrompt" onSubmit={(e) => handleSubmit(e)}>
        <h2 className="promptHeader">{promptMessages[currentPrompt]}</h2>
        <div className="promptAnswer">
          {displayPromptAnswer()}
        </div>
      </form>
    );
  };


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
            <img src={petData[petType].icon} alt={petType}/>
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
  family: state.family
});

const mapDispatchToProps = dispatch => ({
  // setFamilyName: (familyName) => dispatch(setFamilyName(familyName)),
  // setBoyName: (boyName) => dispatch(setBoyName(boyName)),
  // setPrimaryAttribute: (primaryAttribute) => dispatch(setPrimaryAttribute(primaryAttribute)),
  // setStarterPetChoice: (starterPet) => dispatch(setStarterPetChoice(starterPet)),
  // setPetName: (petName) => dispatch(setPetName(petName)),
  // setStarterPetChoiceType: (starterPetType) => dispatch(setPetType(starterPetType))
})

export default connect(mapStateToProps,mapDispatchToProps)(FamilySetup);