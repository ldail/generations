import React from 'react';
import './PersonInfo.css';

const PersonInfo = ({characterName, characterAge, characterPetName, characterPetTypeIcon}) => {
  return (
        <li className="personInfo">
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

export default PersonInfo;