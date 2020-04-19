import React from 'react';
import PersonInfoHeader from '../../components/View/PersonInfoHeader/PersonInfoHeader';
import NavInfoFooter from '../../components/View/NavInfoFooter/NavInfoFooter';
import './CharacterDetails.css';

const CharacterDetails = () => {
  return (
    <div className="characterDetails">
      <PersonInfoHeader />
      
      <div className="parentBar">
        <ul>
          <li>
            <span className="parentColor">{`{y}`}</span>
          </li>
          <li>
            <span className="parentName">Jeff</span>
          </li>
          <li>
            {`&`}
          </li>
          <li>
            <span className="parentName">Laurie</span>
          </li>
        </ul>
        <span className="seeParentArrow">
          »
        </span>
      </div>

      <div className="currentCharacterInfo">
        <div className="currentCharacter">
          <div className="icons">
              <div className="characterColor">
                {`{red}`}
              </div>
              <div className="smallDivider">
                -----
              </div>
              <div className="seeCharOnMap">
                {`{seeOnMap}`}
              </div>
              <div className="switchToChar">
                {`{switchToChar}`}
              </div>
          </div>
          <div className="characterDetails">
            <span className="currentCharacterName">
              {`{CharName}`}
            </span>
            <span className="currentCharacterAge">
              {`{Age 10}`}
            </span>
            <span className="currentCharacterName">
              {`{CharName}`}
            </span>
            <span className="currentCharacterAge">
              {`{Age 10}`}
            </span>
          </div>
        </div>
        <div className="divider">
          ------{`&`}-----
        </div>
        <div className="currentPet">
          <div className="petInfo">
            <div className="petSprite">
              {`{sprite}`}
            </div>
            <div className="petStats">
              {`{stats}`}
            </div>
            <div className="petDetails">
              <span className="PetName">
                {`{petName}`}
              </span>
              <span className="petType">
                {`{petType}`}
              </span>
            </div>
          </div>
          <div className="petInfo">
            <div className="petSprite">
              {`{sprite}`}
            </div>
            <div className="petStats">
              {`{stats}`}
            </div>
            <div className="petDetails">
              <span className="PetName">
                {`{petName}`}
              </span>
              <span className="petType">
                {`{petType}`}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="childrenInfo">
        <ul>
          <li className="childInfo">
            <span className="childName">
              {`{childName}`}
            </span>
            <span className="childColor">
              {`{childColor}`}
            </span>
            <span className="seeChildArrows">
              »
            </span>
          </li>
          <li className="childInfo">
            <span className="childName">
              {`{childName}`}
            </span>
            <span className="childColor">
              {`{childColor}`}
            </span>
            <span className="seeChildArrows">
              »
            </span>
          </li>
          <li className="childInfo">
            <span className="childName">
              {`{childName}`}
            </span>
            <span className="childColor">
              {`{childColor}`}
            </span>
            <span className="seeChildArrows">
              »
            </span>
          </li>
        </ul>
      </div>

      <div className="turnToTree">
        {`<<`}
      </div>

      <NavInfoFooter />
    </div>
  );
};

export default CharacterDetails;