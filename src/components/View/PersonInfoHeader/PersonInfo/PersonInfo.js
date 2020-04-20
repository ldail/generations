import React from 'react';
import './PersonInfo.css';
import { setCurrentView } from '../../../../redux/gameRoot/actions/gameRootActions';
import { connect } from 'react-redux';
import { VIEW } from '../../../../assets/pages';
import styled from 'styled-components';

const StyledCircle = styled.div`
  display: inline-block;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  background-color: ${({hexCode}) => hexCode};
`;

const PersonInfo = ({characterName, characterAge, characterPetName, characterPetTypeIcon, setCurrentView, characterColor}) => {
  return (
        <li 
          className="personInfo"
          onClick={() => setCurrentView(VIEW.CHARACTER_INFO)}
          >
          <div className="characterHeaderInfo">
            {characterColor
              ? <StyledCircle
                  hexCode={characterColor.hexCode} 
                />
              : null
            }
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