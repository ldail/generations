import React from 'react';
import './ContinueMessage.css';

const ContinueMessage = ({message}) => {
  console.log(message);
  return (
    <>
    {message !== `` ? 
      <div className="ContinueMessage">
        <p>{message}</p>
      </div> : ``}
    </>
  );
};

export default ContinueMessage;