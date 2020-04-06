import React, { useState } from 'react';
import './FamilySetup.css';
import { connect } from 'react-redux';
import { setFamilyName, setBoyName } from '../../redux/familyRoot/actions/familyRootActions';
import xss from 'xss';

const FamilySetup = ({setFamilyName, setBoyName}) => {
  const [familyNameValue, setFamilyNameValue] = useState('_____');
  const [setupPageIndex, setSetupPageIndex] = useState(0);
  const [boyNameValue, setBoyNameValue] = useState('');

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
  }

    const familySetupModal = () => {
      if (setupPageIndex === 0) {
        return (
          <>
            <p className="familyQuestion">What is your family's name?</p>
            <div className="familyName">
              <span>The</span>
              <form id="familyName" onSubmit={(e) => handleSubmit(e)}>
                <input type="text" value={familyNameValue} onChange={(e) => setFamilyNameValue(e.target.value)} onFocus={() => setFamilyNameValue('')} />
              </form>
              <span>Family</span>
            </div>
          </>
        );
      }
      if (setupPageIndex === 1) {
        return (
          <>
            <p className="familyQuestion">And what was that boy's name? The one you held so tightly?</p>
            <div className="familyName">
              <form id="familyName" onSubmit={(e) => handleSubmit(e)}>
                <input type="text" value={boyNameValue} onChange={(e) => setBoyNameValue(e.target.value)} onFocus={() => setBoyNameValue('')} />
              </form>
            </div>
          </>
        )
      }
    }
  return (
    <div id="FamilySetup">
      <div className="familyBar">The <span className="bold">{familyNameValue}</span> Family</div>
      {familySetupModal()}
      <div className="continueButtons">
        <button type="button">Back</button>
        <button type="forward" onClick={() => handleSubmit()}>Forward</button>
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  setFamilyName: (familyName) => dispatch(setFamilyName(familyName)),
  setBoyName: (boyName) => dispatch(setBoyName(boyName))
})

export default connect(null,mapDispatchToProps)(FamilySetup);