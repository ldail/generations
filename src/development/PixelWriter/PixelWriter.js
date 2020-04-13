import React, { useEffect, useRef } from 'react';
import './PixelWriter.css';

const PixelWriter = ({active, city, cityTop, cityLeft}) => {

  const pixelWriterRef = useRef(null);

  useEffect(() => {
    pixelWriterRef.current.style['height'] = city.current.style['height'];
    pixelWriterRef.current.style['width'] = city.current.style['width'];
    pixelWriterRef.current.style['top'] = `${cityTop}px`;
    pixelWriterRef.current.style['left'] = `${cityLeft}px`;
  }, [])

  useEffect(() => {
    console.log('Pixel Writer Active!')
    pixelWriterRef.current.style['top'] = `${cityTop}px`;
    pixelWriterRef.current.style['left'] = `${cityLeft}px`;
  }, [cityTop, cityLeft]);

  const writePixel = (event) => {
    console.log('x',event.pageX - event.target.offsetLeft)
    console.log('y', event.pageY - event.target.offsetTop)
  }

  return (
    <>
      {active
        ? <div id="PixelWriter" onClick={(e) => {writePixel(e)}} ref={pixelWriterRef}>
          </div>
        : ''
      }
    </>
  );
};

export default PixelWriter;