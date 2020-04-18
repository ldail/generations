import React from 'react';
import './reset.css';
import './App.css';
import Intro from '../pages/Intro/Intro';
import FamilySetup from '../pages/FamilySetup/FamilySetup';
import City from '../pages/City/City';
import { connect } from 'react-redux';
import { startGameTimer, incrementGameTime, setCurrentPage } from '../redux/gameRoot/actions/gameRootActions';
import { pages, VIEW } from '../assets/pages';
import Map from '../views/Map/Map';
import Tree from '../views/Tree/Tree';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 0,
      currentMessageIndex: 0,
      waitingForKey: false
    }
    this.gameTimer = null;
  }

  componentDidMount() {
    document.querySelector('.intro-title').classList.add('animation-expand')
    document.querySelector('.ContinueMessage').classList.add('animation-delay')
    setTimeout(() => {
      window.addEventListener('keydown', this.handleKeyDown);
      window.addEventListener('touchstart', this.handleKeyDown);
      this.setState({...this.state, waitingForKey: true})
    }, 3200);
  }

  startGameTimer = () => {
    this.props.startGameTimerDispatch();
    this.gameTimer = setInterval(() => {
      this.props.incrementGameTimerDispatch();
    },60000)
  }

  handleKeyDown = () => {
    let {waitingForKey, currentMessageIndex} = this.state;
    if (waitingForKey) {
      this.setState({...this.state, waitingForKey: false});
      let nextIndex = currentMessageIndex + 1;
      if (nextIndex === 1) {
        document.querySelector('.intro-title').classList.add('animation-reverseExpand');
        document.querySelector('.ContinueMessage').classList.add('animation-reverseDelay');
        document.querySelector('.WhiteCircle').classList.add('smallOne');
        document.querySelector('.cloud').classList.add('animation-cloudToPosition');
        setTimeout(() => {
          document.querySelector('.ContinueMessage').classList.add('animation-normalFadeIn');
          document.querySelector('.ContinueMessage').classList.add('talking-cloud-message');
          document.querySelector('.cloud').classList.add('animation-slowBob');
          this.setState({...this.state, currentMessageIndex: currentMessageIndex + 1, waitingForKey: true});
        },1000);
      }
      else if (nextIndex === 2 || nextIndex === 3 || nextIndex === 4) {
        // document.querySelector('.ContinueMessage').classList.add('animation-quickFadeOutThenIn');
        // setTimeout(() => {
        //   document.querySelector('.ContinueMessage').classList.remove('animation-quickFadeOutThenIn')
        //   this.setState({...this.state, waitingForKey: true})
        // }, 1000)
        this.setState({...this.state, currentMessageIndex: currentMessageIndex + 1, waitingForKey: true});
      }
      else if (nextIndex === 5) {
        document.querySelector('.WhiteCircle').classList.add('mediumOne');
        document.querySelector('.WhiteCircle').classList.remove('smallOne');
        document.querySelector('.boy').classList.add('animation-zeroToHundredOpacity');
        this.setState({...this.state, currentMessageIndex: currentMessageIndex + 1, waitingForKey: true});
      }
      else if (nextIndex >= 6 && nextIndex < 12) {
        this.setState({...this.state, currentMessageIndex: currentMessageIndex + 1, waitingForKey: true});
      }
      else if (nextIndex === 12) {
        this.props.setCurrentPageDispatch(pages.PAGE_FAMILY_SETUP)
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
  }

  render() {
    return (
      <div id="App">
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
  setCurrentPageDispatch: (newPageId) => dispatch(setCurrentPage(newPageId))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);