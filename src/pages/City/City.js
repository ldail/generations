import React, { Component } from 'react';
import './City.css';

class City extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
    this.outsideCity = React.createRef();
    this.character = React.createRef();
    this.city = React.createRef();
  }

  findCurrentPositions = () => {
    const background = {x: 0, y:0};
    const cityBackground = {x: 1000, y: 1000};
    const character = {x:0, y:0};
  
    //background
    const backgroundPositionX = this.city.current.style['backgroundPositionX'];
    const backgroundPositionY = this.city.current.style['backgroundPositionY'];
    background.x = parseInt(backgroundPositionX.slice(0,backgroundPositionX.length-1));
    background.y = parseInt(backgroundPositionY.slice(0,backgroundPositionY.length-1));
    cityBackground.x = background.x + 1000;
    cityBackground.y = background.x + 1000;
  
    //character
    const characterPositionX = this.character.current.style['backgroundPositionX']
    const characterPositionY = this.character.current.style['backgroundPositionY']
    character.x = parseInt(characterPositionX.slice(0,characterPositionX.length-1));
    character.y = parseInt(characterPositionY.slice(0,characterPositionY.length-1));
  
    return {background, cityBackground, character};
  }
  
  checkKey(e) {
    const {character, cityBackground, background} = this.findCurrentPositions();
  
    //defaults - character
    const characterYDown = 0;
    const characterYUp = -89;
    const characterYLeft = -178;
    const characterYRight = -267;  
    const characterHeight = 89;
    const characterWidth = 75;
  
    const stepPixels = 14;
  
    //defaults - background

    const leftmostX = 1000;
    const rightmostX = -1 * (7000 - (window.screen.width / 2) - (characterWidth / 2) - 1);
    const topmostY = 1000;
    const bottommostY = -1 * (5500 - (window.screen.height / 2) - (characterHeight / 2) - 1);
    
  
    //up
    if (e.keyCode === 38) {
      if (character.y !== characterYUp) {
        this.character.current.style.backgroundPosition = `${character.x}px ${characterYUp}px`;
      }
  
      if (background.y + stepPixels < topmostY) {
        this.city.current.style['backgroundPositionY'] = `${background.y + stepPixels}px`;
        this.outsideCity.current.style['backgroundPositionY'] = `${background.y + stepPixels}px`;
      }
    }
  
    //down
    if (e.keyCode === 40) {
      if (character.y !== characterYDown) {
        this.character.current.style.backgroundPosition = `${character.x}px ${characterYDown}px`;
      }

      if (background.y - stepPixels > bottommostY) {
        this.city.current.style['backgroundPositionY'] = `${background.y - stepPixels}px`;
        this.outsideCity.current.style['backgroundPositionY'] = `${background.y - stepPixels}px`;
      }
    }
  
    //left
    if (e.keyCode === 37) {
      if (character.y !== characterYLeft) {
        this.character.current.style.backgroundPosition = `${character.x}px ${characterYLeft}px`;
      }
  
      if (background.x + stepPixels < leftmostX) {
        this.city.current.style['backgroundPositionX'] = `${background.x + stepPixels}px`;
        this.outsideCity.current.style['backgroundPositionX'] = `${background.x + stepPixels}px`;

      }
    }
  
    //right
    if (e.keyCode === 39) {
      if (character.y !== characterYRight) {
        this.character.current.style.backgroundPosition = `${character.x}px ${characterYRight}px`;
      }
  
      if (background.x - stepPixels > rightmostX) {
        this.city.current.style['backgroundPositionX'] = `${background.x - stepPixels}px`;
        this.outsideCity.current.style['backgroundPositionX'] = `${background.x - stepPixels}px`;

      }
    }
  
  }
  
  componentDidMount() {
    this.city.current.style['backgroundPositionX'] = '0px';
    this.city.current.style['backgroundPositionY'] = '0px';
    this.character.current.style['backgroundPositionX'] = '0px';
    this.character.current.style['backgroundPositionY'] = '0px';
    this.character.current.style['width'] = '60px';
    this.character.current.style['height'] = '89px';
    this.character.current.style['top'] = `${(window.screen.height / 2) - 89}px`
    this.character.current.style['left'] = `${(window.screen.width / 2) - 60}px`
    this.city.current.style['top'] = `1000px`;
    this.city.current.style['left'] = `1000px`;
  }


  render() {
    return (
      <div id="OutsideCity" ref={this.outsideCity} onKeyDown={(e) => this.checkKey(e)} tabIndex="0">
        <div id="City" ref={this.city}>
          <div className="character" ref={this.character} />
        </div>
      </div>
    );
  }
}

export default City;