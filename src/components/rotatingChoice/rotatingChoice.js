import React from 'react';

const RotatingChoice = ({title, icon, choice, rotateChoice, dataSetLength}) => {

  return (
    <ul>
      <li className="rotatingChoice">
        <div className="choiceHeader">
          <span className="arrowIcon" onClick={() => rotateChoice(dataSetLength, -1)}>🡄</span>
          <div className="choiceTitle">
            {icon &&
              <img src={icon} alt="icon" />
            }
            <h4>{title}</h4>
          </div>
          <span className="arrowIcon" onClick={() => rotateChoice(dataSetLength, 1)}>🡆</span>
        </div>
        <div className="choiceOption">
          {choice}
        </div>
      </li>
    </ul>
  );
};

export default RotatingChoice;