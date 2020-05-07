import React from 'react';
import { connect } from 'react-redux';
import './NavInfoFooter.css';
import { convertUnixToFriendlyTime } from '../../../utils/formatter';
import { setCurrentView } from '../../../redux/gameRoot/actions/gameRootActions';
import { pages, VIEW } from '../../../assets/pages';

const NavInfoFooter = ({characters, currentCharacters, gameTime, familyName, setCurrentView}) => {
  const currentCharacterInfo = characters.find(character => character.id === currentCharacters[0]);
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
        <li onClick={() => setCurrentView(currentCharacterInfo.currentView)}>(Map)</li>
      </ul>
    </div>
  );
};

const mapStateToProps = state => ({
  gameTime: state.game.gameTime,
  currentCharacters: state.game.currentCharacters,
  familyName: state.family.familyName,
  characters: state.family.characters
})

const mapDispatchToProps = dispatch => ({
  setCurrentView: (page) => dispatch(setCurrentView(page))
})
export default connect(mapStateToProps,mapDispatchToProps)(NavInfoFooter);