import React from 'react';

const PersonInfo = ({characterName, characterAge, characterPetName, characterPetTypeIcon}) => {
  return (
    <div className="personInfo">
      <ul className="headerRow">
        <li>
          <div className="characterHeaderInfo">
            <span>{characterName}</span>
            <span>{characterAge}</span>
          </div>
          <div className="petHeaderInfo">
            <span>{characterPetName}</span>
            <span>{characterPetTypeIcon}</span>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default PersonInfo;