import React, { useEffect, useRef, useState } from 'react';
import {promptMessages} from '../../assets/constants';
import cloud from '../../assets/cloud.png';
import boy from '../../assets/smallboy.jpg';
import { pages } from '../../assets/pages';
import './Intro.css';
import { connect } from 'react-redux';
import { setCurrentPage } from '../../redux/gameRoot/actions/gameRootActions';

const Intro = ({setCurrentPageDispatch}) => {
  const {introPage: {messages}} = promptMessages;
  const introTitleRef = useRef(null);
  const continueMessageRef = useRef(null);
  const whiteCircleRef = useRef(null);
  const cloudRef = useRef(null);
  const boyRef = useRef(null);
  const [acceptingInput, setAcceptingInput] = useState(false);
  const [readyToInitialize, setReadyToInitialize] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    introTitleRef.current.classList.add('animation-expand');
    continueMessageRef.current.classList.add('animation-delay');
    setTimeout(() => {
      setReadyToInitialize(true);
    },3000)
  },[]);

  const handleKeyDown = () => {
    let nextIndex = currentMessageIndex + 1;
    if (currentMessageIndex + 1 === 1) {
      introTitleRef.current.classList.add('animation-reverseExpand');
      continueMessageRef.current.classList.add('animation-reverseDelay');
      whiteCircleRef.current.classList.add('smallOne');
      cloudRef.current.classList.add('animation-cloudToPosition');
      setTimeout(() => {
        continueMessageRef.current.classList.add('animation-normalFadeIn');
        continueMessageRef.current.classList.add('talking-cloud-message');
        cloudRef.current.classList.add('animation-slowBob');
        setCurrentMessageIndex(currentMessageIndex + 1);
      },1000);
    }
    else if (currentMessageIndex + 1 === 2 || currentMessageIndex + 1 === 3 || currentMessageIndex + 1 === 4) {
      // continueMessageRef.current.classList.add('animation-quickFadeOutThenIn');
      // setTimeout(() => {
      //   continueMessageRef.current.classList.remove('animation-quickFadeOutThenIn')
      //   this.setState({...this.state, waitingForKey: true})
      // }, 1000)
      setCurrentMessageIndex(currentMessageIndex + 1);
    }
    else if (currentMessageIndex + 1 === 5) {
      whiteCircleRef.current.classList.add('mediumOne');
      whiteCircleRef.current.classList.remove('smallOne');
      boyRef.current.classList.add('animation-zeroToHundredOpacity');
      setCurrentMessageIndex(currentMessageIndex + 1);
    }
    else if (currentMessageIndex + 1 >= 6 && currentMessageIndex + 1 < 12) {
      setCurrentMessageIndex(currentMessageIndex + 1);
    }
    else if (currentMessageIndex + 1 === 12) {
      setCurrentPageDispatch(pages.PAGE_FAMILY_SETUP)
    }
  }

  const checkInput = () => {
    if (!acceptingInput) {
      if (readyToInitialize) {
        handleKeyDown();
        setReadyToInitialize(false);
        setTimeout(() => {
          setAcceptingInput(true);
        },2200);
      }
    }
    else {
      handleKeyDown();
    }
  }
  
  return (
    <>
      <div 
        className="clickPanel" 
        tabIndex="0"
        onClick={() => checkInput()}
        onKeyDown={() => checkInput()}
        onTouchStart={() => checkInput()}
      />
      <h1 className="intro-title" ref={introTitleRef}>Generations</h1>
      <div className="ContinueMessage" ref={continueMessageRef}>
        {messages[currentMessageIndex]}
      </div>
      <div className="WhiteCircle" ref={whiteCircleRef} />
      <img src={cloud} className="cloud" alt="generation spirit" ref={cloudRef} />
      <img src={boy} className="boy" alt="small boy" ref={boyRef} />
    </>
  );
};

const mapDispatchToProps = dispatch => ({
  setCurrentPageDispatch: (newPage) => dispatch(setCurrentPage(newPage))
})

export default connect(null,mapDispatchToProps)(Intro);