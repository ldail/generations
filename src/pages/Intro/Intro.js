import React, { PureComponent } from 'react';
import ContinueMessage from '../../components/ContinueMessage/ContinueMessage';
import {promptMessages} from '../../assets/constants';
import WhiteCircle from '../../components/WhiteCircle/WhiteCircle';
import cloud from '../../assets/cloud.png';
import boy from '../../assets/smallboy.jpg';

const Intro = ({currentMessageIndex}) => {
  const {introPage: {messages}} = promptMessages;
  return (
    <>
      <h1 className="intro-title">Generations</h1>
      <ContinueMessage message={messages[currentMessageIndex]} />
      <WhiteCircle />
      <img src={cloud} className="cloud" alt="generation spirit" />
      <img src={boy} className="boy" alt="small boy" />
    </>
  );
};

export default Intro;