import React from 'react';
import { connect } from 'react-redux';
import './NavInfoFooter.css';
import { convertUnixToFriendlyTime } from '../../../utils/formatter';

const NavInfoFooter = ({gameTime, familyName}) => {
  return (
    <div id="NavInfoFooter">
      <span className="familyNameInfo">
        {familyName}
      </span>
      <span className="gameTimeInfo">
        {convertUnixToFriendlyTime(gameTime)}
      </span>
      <ul>
        <li>Icon 1</li>
        <li>Icon 2</li>
        <li>Icon 3</li>
      </ul>
    </div>
  );
};

const mapStateToProps = state => ({
  gameTime: state.game.gameTime,
  familyName: state.family.familyName
})
export default connect(mapStateToProps,null)(NavInfoFooter);