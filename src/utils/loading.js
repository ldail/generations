import React, {Suspense} from 'react';
import {ReactComponent as Spinner} from '../assets/loading.svg';
import styled from 'styled-components';

const StyledSpinner = styled.div`
  position: fixed;
  top: 0;
  left: 0%;
  width: 100%;
  height: 100%;
  z-index: 10;
  background-color: white;

  svg {
    animation: spinAnimation 3s;
    -webkit-animation: spinAnimation 3s;
    color: blue;
  }

  @keyframes spinAnimation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @-webkit-keyframes spinAnimation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;


const spinner = () => {
  return (
    <StyledSpinner className="spinner">
      <Spinner />
    </StyledSpinner>
  )
}

const loadingHOC = (props) => {
  return (
  <Suspense fallback={spinner()}>
    {props.children}
  </Suspense>
  );
};

export default loadingHOC;