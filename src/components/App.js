import React from 'react';
import './reset.css';
import './App.css';
import Intro from '../pages/Intro/Intro';
import FamilySetup from '../pages/FamilySetup/FamilySetup';
import City from '../pages/City/City';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 0,
      currentMessageIndex: 0,
      waitingForKey: false
    }
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
        this.setState({...this.state, currentPage: this.state.currentPage + 1});
      }
    }
  }

  showPage = () => {
    let {currentPage} = this.state;
    if (currentPage === 0) {
      return <Intro currentMessageIndex={this.state.currentMessageIndex} />
    }
    else if (currentPage === 1) {
      return <FamilySetup changePage={() => this.setState({currentPage: 2})} />
    }
    else if (currentPage === 2) {
      return <City />
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

export default App;