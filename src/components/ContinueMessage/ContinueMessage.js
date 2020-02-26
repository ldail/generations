import React from 'react';
import './ContinueMessage.css';

const ContinueMessage = ({message}) => {
  return (
    <div className="ContinueMessage">
      <p>{message}</p>
    </div>
  );
};

export default ContinueMessage;