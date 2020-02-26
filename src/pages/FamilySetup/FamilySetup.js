import React, { useState } from 'react';
import './FamilySetup.css';
import { connect } from 'react-redux';
import { setFamilyName } from '../../redux/familyRoot/actions/familyRootActions';
import xss from 'xss';

const FamilySetup = ({setFamilyName}) => {
  const [familyNameValue, setFamilyNameValue] = useState();
  const [setupPageIndex, setSetupPageIndex] = useState(0);

  const handleSubmit = e => {
    e.preventDefault();
    if (familyNameValue) {
      let safe = xss(familyNameValue);
      setFamilyName(safe);
    }


  }
  return (
    <div id="FamilySetup">
      <p className="familyQuestion">What is your family's name?</p>
      <div className="familyName">
        <span>The</span>
        <form id="familyName" onSubmit={(e) => handleSubmit(e)}>
          <input type="text" value={familyNameValue} onChange={(e) => setFamilyNameValue(e.target.value)} />
        </form>
        <span>Family</span>
      </div>
      <div className="continueButtons">
        <button type="button">Back</button>
        <button type="forward" onClick={() => handleSubmit()}>Forward</button>
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  setFamilyname: (familyName) => dispatch(setFamilyName(familyName))
})

export default connect(null,mapDispatchToProps)(FamilySetup);