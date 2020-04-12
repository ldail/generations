import React from 'react';
import './PixelWriter.css';

const PixelWriter = ({active}) => {
  return (
    <>
      {active
        ? <div id="PixelWriter">
            <p>Test</p>
          </div>
        : ''
      }
    </>
  );
};

export default PixelWriter;