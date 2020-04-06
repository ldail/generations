import React, { useState } from 'react';
import './FamilySetup.css';
import { connect } from 'react-redux';
import { setFamilyName, setBoyName, setPrimaryAttribute } from '../../redux/familyRoot/actions/familyRootActions';
import {primaryAttributes} from '../../assets/messages';
import xss from 'xss';

const FamilySetup = ({setFamilyName, setBoyName, setPrimaryAttribute}) => {
  const [familyNameValue, setFamilyNameValue] = useState('_____');
  const [setupPageIndex, setSetupPageIndex] = useState(0);
  const [boyNameValue, setBoyNameValue] = useState('_____');
  const [attributeView, setAttributeView] = useState(0);

  const handleBack = e => {
    if (e) {
      e.preventDefault();
    }
    if (setupPageIndex > 0) {
      setSetupPageIndex(setupPageIndex - 1);
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
    if (setupPageIndex === 0) {
      if (familyNameValue) {
        let safe = xss(familyNameValue);
        setFamilyName(safe);
        setSetupPageIndex(setupPageIndex + 1);
      }
    }
    else if (setupPageIndex === 1) {
      if (boyNameValue) {
        let safe = xss(boyNameValue);
        setBoyName(safe);
        setSetupPageIndex(setupPageIndex + 1);
      }
    }
    else if (setupPageIndex === 2) {
      setPrimaryAttribute(attributeView);
      setSetupPageIndex(setupPageIndex + 1);
    }
  }
  
  const changeAttributeView = (value) => {
    if (attributeView === 3 && value === 1) {
      setAttributeView(0);
    }
    else if (attributeView === 0 && value === -1) {
      setAttributeView(3)
    }
    else {
      setAttributeView(attributeView + value);
    }
  }


    const familySetupModal = () => {
      if (setupPageIndex === 0) {
        return (
          <>
            <p className="familyQuestion">What is your family's name?</p>
            <div className="familyName">
              <span>The</span>
              <form id="familyName" onSubmit={(e) => handleSubmit(e)}>
                <input type="text" required value={familyNameValue} onChange={(e) => setFamilyNameValue(e.target.value)} onFocus={() => setFamilyNameValue('')} />
              </form>
              <span>Family</span>
            </div>
          </>
        );
      }
      else if (setupPageIndex === 1) {
        return (
          <>
            <p className="familyQuestion">And what was that boy's name? The one you held so tightly?</p>
            <div className="familyName">
              <form id="familyName" onSubmit={(e) => handleSubmit(e)}>
                <input type="text" required value={boyNameValue} onChange={(e) => setBoyNameValue(e.target.value)} onFocus={() => setBoyNameValue('')} />
              </form>
            </div>
          </>
        )
      }
      else if (setupPageIndex === 2) {
        return (
          <>
            <p className="familyQuestion">What is your family's primary attribute?</p>
            <div className="primaryAttributeValue">
              <form id="primaryAttributeValue" onSubmit={(e) => handleSubmit(e)}>
                <ul>

                  <li className="primaryAttributeChoice" id="primaryAttribute0">
                    <div className="attributeTitle">
                      <img src="#" alt="left" className="arrowIcon" onClick={() => changeAttributeView(-1)} />
                      <img src={primaryAttributes[attributeView].icon} alt="jewel icon" />
                      <h4>{primaryAttributes[attributeView].name}</h4>
                      <img src="#" alt="right" className="arrowIcon" onClick={() => changeAttributeView(1)}/>
                    </div>
                    <p>{primaryAttributes[attributeView].description}</p>
                    <span className="statIncrease">{primaryAttributes[attributeView].stat}</span>  
                  </li>
                </ul>
              </form>
            </div>
          </>
        )
      }
    }
  return (
    <div id="FamilySetup">
      <div className="familyBar">The <span className="bold">{familyNameValue}</span> Family</div>
      <div className="nameBar">{boyNameValue} {familyNameValue}</div>
      {familySetupModal()}
      <div className="continueButtons">
        <button type="button" onClick={(e) => handleBack(e)}>Back</button>
        <button type="forward" onClick={(e) => handleSubmit(e)}>Forward</button>
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  setFamilyName: (familyName) => dispatch(setFamilyName(familyName)),
  setBoyName: (boyName) => dispatch(setBoyName(boyName)),
  setPrimaryAttribute: (primaryAttribute) => dispatch(setPrimaryAttribute(primaryAttribute))
})

export default connect(null,mapDispatchToProps)(FamilySetup);