import React from 'react';
import './PersonInfo.css';
import { setCurrentView } from '../../../../redux/gameRoot/actions/gameRootActions';
import { connect } from 'react-redux';
import { VIEW } from '../../../../assets/pages';

const PersonInfo = ({characterName, characterAge, characterPetName, characterPetTypeIcon, setCurrentView}) => {
  return (
        <li 
          className="personInfo"
          onClick={() => setCurrentView(VIEW.CHARACTER_INFO)}
          >
          <div className="characterHeaderInfo">
            <span>{characterName}</span>
            <span>Age: {characterAge}</span>
          </div>
          <div className="petHeaderInfo">
            <span>{characterPetName}</span>
            <span><img src={characterPetTypeIcon} alt="pet icon" /></span>
          </div>
        </li>
  );
};

const mapDispatchToProps = dispatch => ({
  setCurrentView: (newView) => dispatch(setCurrentView(newView))
})

export default connect(null,mapDispatchToProps)(PersonInfo);