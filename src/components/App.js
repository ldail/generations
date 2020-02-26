import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import messages from '../assets/messages';
import ContinueMessage from './ContinueMessage/ContinueMessage';
import WhiteCircle from './WhiteCircle/WhiteCircle';
import cloud from '../assets/cloud.png';
import boy from '../assets/smallboy.jpg';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMessageIndex: 0,
      waitingForKey: false
    }
  }

  componentDidMount() {
    document.querySelector('.intro-title').classList.add('animation-expand')
    document.querySelector('.ContinueMessage').classList.add('animation-delay')
    setTimeout(() => {
      window.addEventListener('keydown', this.handleKeyDown);
      this.setState({...this.state, waitingForKey: true})
    }, 3200);
  }

  handleKeyDown = () => {
    let {waitingForKey, currentMessageIndex} = this.state;
    console.log('in function');
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
        },3000);
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
    }
  }

  render() {
  let {currentMessageIndex} = this.state;

  return (
    <div id="App">
      <h1 className="intro-title">Generations</h1>
      <ContinueMessage message={messages[currentMessageIndex]} />
      <WhiteCircle />
      <img src={cloud} className="cloud" alt="generation spirit" />
      <img src={boy} className="boy" alt="small boy" />
    </div>
  );
  }
};

export default App;