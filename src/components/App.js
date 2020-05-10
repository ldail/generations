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
import {devOnlySetSeededFamilyInfo, setLastMapPosition} from '../redux/familyRoot/actions/familyRootActions';
import {devOnlySetSeededPetInfo} from '../redux/petRoot/actions/petRootActions';
import { MAP_MOVEMENT_TIME_PER_MOVE } from '../assets/constants';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 0,
      gameSecondsCount: 0,
      devMode: false,
      isIdle: false,
      isDebouncedCurrently: false
    }
    this.gameTimer = null;
    this.characterMovement = null;
    this.devStartButton = React.createRef();
    this.idleTimer = null;
    this.gameCounterSeconds = null;
    this.timeUntilStartingGameTimerTimeout = null;
    this.debounceTimer = null;
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
      this.beginGameTimers();
      this.startCharacterActions();
      this.setState({devMode: true})
    }
  }

  startCharacterActions = () => {
    this.characterMovement = setInterval(() => {
      this.props.setLastMapPosition();
    }, MAP_MOVEMENT_TIME_PER_MOVE)
  }

  beginGameTimers = () => {
    //Running game timer
    this.props.startGameTimerDispatch();
    this.startGameTimer();

    //Running idle timer. 
    //After 60 seconds, it catches. Until then, keep increasing the count.
    this.startIdleTimer();
    this.setState({gameSecondsCount: 0});
  }

  //Keeps track of every minute that passes and then dispatches a time increase (interval)
  startGameTimer = () => {
    if (this.gameTimer) {
      clearInterval(this.gameTimer);
    }
    this.setState({gameSecondsCount: 0})
    this.gameTimer = setInterval(() => {
      this.props.incrementGameTimerDispatch();
    },60000);
    this.startGameCounter();
  }

  //Times out at one minute of inactivity.
  startIdleTimer = () => {
    if (this.idleTimer) {
      clearTimeout(this.idleTimer);
    }
    this.idleTimer = setTimeout(() => {
      this.idleTimerReachedEnd();
    }, 60000);
  }

  //Keeps track of how many seconds the game timer has been running after its last dispatch.
  startGameCounter = () => {
    if (this.gameCounterSeconds) {
      clearInterval(this.gameCounterSeconds);
    }
    this.gameCounterSeconds = setInterval(() => {
      this.setState((prevState) => ({gameSecondsCount: prevState.gameSecondsCount + 1}));
    }, 1000)
  }

  idleTimerReachedEnd = () => {
    //Clear current timers.
    //this.idleTimer has already cleared.
    clearInterval(this.gameTimer);
    clearInterval(this.gameCounterSeconds);

    //Reset them all to null.
    this.gameTimer = null;
    this.gameCounterSeconds = null;
    this.idleTimer = null;
    this.setState({isIdle: true})
  }

  nonIdleEvent = () => { 
    console.log('being called');
    if (!this.state.isDebouncedCurrently) {
    //If the user has reached idle state.    
    if (this.state.isIdle) {
      //Restart the idle timer
      this.startIdleTimer();
      //Restart the game timer and increment month in  60 - previous seconds
      this.timeUntilStartingGameTimerTimeout = setTimeout(() => {
        this.startGameTimer();
        this.props.incrementGameTimerDispatch();
      }, 60000 - (this.state.gameSecondsCount * 1000 >= 60000 ? 60000 : this.state.gameSecondsCount * 1000));
      this.setState({isIdle: false});
    }
    else {
      clearTimeout(this.idleTimer);
      this.setState({gameSecondsCount: 0, isDebouncedCurrently: true});
      this.debounceTimer = setTimeout(() => {
        this.setState({isDebouncedCurrently: false})
        this.debounceTimer = null;
      }, 1000)
      this.startIdleTimer();
    }
  }
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

  decideDebounceRender = () => {
    const {isDebouncedCurrently} = this.state;
    if (isDebouncedCurrently) {
      return (
        <div id="App">
          <button style={{position: 'fixed', top: 0, left: 0, zIndex: 3, display: this.state.devMode ? 'none' : 'block'}} disabled={this.state.deveMode} ref={this.devStartButton} onClick={() => this.startDevMode()}>Start test mode</button>
          {this.showPage()}
        </div>
      )
    }
    else {
      return (
      <div 
        id="App"
        onClick={() => this.nonIdleEvent()}
        onMouseMove={() => this.nonIdleEvent()}
        onTouchStart={() => this.nonIdleEvent()}
        onTouchMove={() => this.nonIdleEvent()}
        onWheel={() => this.nonIdleEvent()}
        onKeyPress={() => this.nonIdleEvent()}
        onKeyDown={() => this.nonIdleEvent()}
        onScroll={() => this.nonIdleEvent()}
        onPointerDown={() => this.nonIdleEvent()}
        onPointerMove={() => this.nonIdleEvent()}>
          <button style={{position: 'fixed', top: 0, left: 0, zIndex: 3, display: this.state.devMode ? 'none' : 'block'}} disabled={this.state.deveMode} ref={this.devStartButton} onClick={() => this.startDevMode()}>Start test mode</button>
          {this.showPage()}
        </div>
      );
    }
  }

  render() {
    return this.decideDebounceRender();
    }
};

const mapStateToProps = state => ({
  gameTime: state.game.gameTime,
  currentPage: state.game.currentPage,
  currentView: state.game.currentView,
  characters: state.family.characters
})

const mapDispatchToProps = (dispatch) => ({
  startGameTimerDispatch: () => dispatch(startGameTimer()),
  incrementGameTimerDispatch: () => dispatch(incrementGameTime()),
  setCurrentPageDispatch: (newPageId) => dispatch(setCurrentPage(newPageId)),
  setLastMapPosition: () => dispatch(setLastMapPosition()),
  devOnlySetSeededFamilyInfo: () => dispatch(devOnlySetSeededFamilyInfo()),
  devOnlySetSeededGameInfo: () => dispatch(devOnlySetSeededGameInfo()),
  devOnlySetSeededPetInfo: () => dispatch(devOnlySetSeededPetInfo())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);