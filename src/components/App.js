import React from 'react';
import './reset.css';
import './App.css';
import Intro from '../pages/Intro/Intro';
import FamilySetup from '../pages/FamilySetup/FamilySetup';
import City from '../pages/City/City';
import { connect } from 'react-redux';
import { startGameTimer, incrementGameTime, setCurrentPage, devOnlySetSeededGameInfo } from '../redux/gameRoot/actions/gameRootActions';
import { pages, VIEW } from '../assets/pages';
import Map from '../views/Map/Map';
import Tree from '../views/Tree/Tree';
import CharacterDetails from '../views/CharacterDetails/CharacterDetails';
import {devOnlySetSeededFamilyInfo} from '../redux/familyRoot/actions/familyRootActions';
import {devOnlySetSeededPetInfo} from '../redux/petRoot/actions/petRootActions';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 0,
      devMode: false
    }
    this.gameTimer = null;
    this.devStartButton = React.createRef();
  }

  componentDidMount() {
    setTimeout(() => {
      this.devStartButton.current.style.display = 'none';
    },10000);
  }

  startDevMode = async () => {
    if (!this.state.devMode) {
      const {devOnlySetSeededFamilyInfo, devOnlySetSeededGameInfo, devOnlySetSeededPetInfo} = this.props;
      await devOnlySetSeededPetInfo();
      await devOnlySetSeededFamilyInfo();
      await devOnlySetSeededGameInfo();
      this.startGameTimer();
      this.setState({devMode: true})
    }
  }

  startGameTimer = () => {
    this.props.startGameTimerDispatch();
    this.gameTimer = setInterval(() => {
      this.props.incrementGameTimerDispatch();
    },60000);
  }

  showPage = () => {
    let {currentPage, currentView} = this.props;
    if (currentView === VIEW.HOME) {
      if (currentPage === pages.PAGE_INTRO) {
        return <Intro currentMessageIndex={this.state.currentMessageIndex} />
      }
      else if (currentPage === pages.PAGE_FAMILY_SETUP) {
        return <FamilySetup 
                    startGameTimer={this.startGameTimer}
                  />
      }
      else if (currentPage === pages.PAGE_CITY_ONE) {
        return <City />
      }
    }
    else if (currentView === VIEW.MAP) {
      return <Map />
    }
    else if (currentView === VIEW.TREE) {
      return <Tree />
    }
    else if (currentView === VIEW.CHARACTER_INFO) {
      return <CharacterDetails />
    }
  }

  render() {
    return (
      <div id="App">
        <button style={{position: 'fixed', top: 0, left: 0, zIndex: 3, display: this.state.devMode ? 'none' : 'block'}} disabled={this.state.deveMode} ref={this.devStartButton} onClick={() => this.startDevMode()}>Start test mode</button>
        {this.showPage()}
      </div>
    );
    }
};

const mapStateToProps = state => ({
  gameTime: state.game.gameTime,
  currentPage: state.game.currentPage,
  currentView: state.game.currentView
})

const mapDispatchToProps = (dispatch) => ({
  startGameTimerDispatch: () => dispatch(startGameTimer()),
  incrementGameTimerDispatch: () => dispatch(incrementGameTime()),
  setCurrentPageDispatch: (newPageId) => dispatch(setCurrentPage(newPageId)),
  devOnlySetSeededFamilyInfo: () => dispatch(devOnlySetSeededFamilyInfo()),
  devOnlySetSeededGameInfo: () => dispatch(devOnlySetSeededGameInfo()),
  devOnlySetSeededPetInfo: () => dispatch(devOnlySetSeededPetInfo())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);