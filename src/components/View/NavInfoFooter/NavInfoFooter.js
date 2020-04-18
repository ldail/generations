import React from 'react';
import { connect } from 'react-redux';
import './NavInfoFooter.css';
import { convertUnixToFriendlyTime } from '../../../utils/formatter';
import { setCurrentView } from '../../../redux/gameRoot/actions/gameRootActions';
import { pages, VIEW } from '../../../assets/pages';

const NavInfoFooter = ({gameTime, familyName, setCurrentView}) => {
  return (
    <div id="NavInfoFooter">
      <span className="familyNameInfo">
        {familyName}
      </span>
      <span className="gameTimeInfo">
        {convertUnixToFriendlyTime(gameTime)}
      </span>
      <ul>
        <li onClick={() => setCurrentView(VIEW.TREE)}>(Tree)</li>
        <li onClick={() => setCurrentView(VIEW.MAP)}>(Map)</li>
        <li onClick={() => setCurrentView(VIEW.HOME)}>(Home)</li>
      </ul>
    </div>
  );
};

const mapStateToProps = state => ({
  gameTime: state.game.gameTime,
  familyName: state.family.familyName
})

const mapDispatchToProps = dispatch => ({
  setCurrentView: (page) => dispatch(setCurrentView(page))
})
export default connect(mapStateToProps,mapDispatchToProps)(NavInfoFooter);