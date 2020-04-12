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
    const cityPosition = {top: 0, left:0};
    const outsideCityPosition = {top: 0, left: 0};
    const character = {x:0, y:0};
  
    //background
    const cityBackgroundTop = this.city.current.style['top'];
    const cityBackgroundLeft = this.city.current.style['left'];
    cityPosition.top = parseInt(cityBackgroundTop.slice(0,cityBackgroundTop.length-1));
    cityPosition.left = parseInt(cityBackgroundLeft.slice(0,cityBackgroundLeft.length-1));
    const outsideCityPositionTop = this.city.current.style['top'];
    const outsideCityPositionLeft = this.city.current.style['left'];
    cityPosition.top = parseInt(outsideCityPositionTop.slice(0,outsideCityPositionTop.length-1));
    cityPosition.left = parseInt(outsideCityPositionLeft.slice(0,outsideCityPositionLeft.length-1));
  
    //character
    const characterPositionX = this.character.current.style['backgroundPositionX'];
    const characterPositionY = this.character.current.style['backgroundPositionY'];
    character.x = parseInt(characterPositionX.slice(0,characterPositionX.length-1));
    character.y = parseInt(characterPositionY.slice(0,characterPositionY.length-1));
  
    return {cityPosition, outsideCityPosition, character};
  }
  
  checkKey(e) {
    const {character, cityPosition, outsideCityPosition} = this.findCurrentPositions();

  
    //defaults - character
    const characterYDown = 0;
    const characterYUp = -89;
    const characterYLeft = -178;
    const characterYRight = -267;  
    const characterHeight = parseInt(this.character.current.style['height'].slice(0,this.character.current.style['height'].length - 1));
    const characterWidth = parseInt(this.character.current.style['width'].slice(0,this.character.current.style['height'].length - 1));
  
    const stepPixels = 14;
  
    //defaults - map
    const mapHeight = parseInt(this.city.current.style['height'].slice(0,this.city.current.style['height'].length - 1));
    const mapWidth = parseInt(this.city.current.style['width'].slice(0, this.city.current.style['width'].length - 1));

    const leftmostXPx = (0 - characterWidth) + (window.screen.width / 2);
    const rightmostXPx = -1 * (mapWidth - (window.screen.width / 2));
    const topmostYPx = 0 - characterHeight + (window.screen.height / 2);
    const bottommostYPx = -1 * (mapHeight - (window.screen.height / 2));

    console.log(mapHeight);
    console.log(bottommostYPx);

    const newCityPosition = {top: cityPosition.top, left: cityPosition.left};
    const newOutsideCityPosition = {top: outsideCityPosition.top, left: outsideCityPosition.left};
    
    //up = +stepPixels
    if (e.keyCode === 38) {
      if (character.y !== characterYUp) {
        this.character.current.style.backgroundPosition = `${character.x}px ${characterYUp}px`;
      }

      if (cityPosition.top + stepPixels <= topmostYPx) {
        newCityPosition.top = cityPosition.top + stepPixels;
        newOutsideCityPosition.top = outsideCityPosition.top + stepPixels
      }
    }
  
    //down = -stepPixels
    else if (e.keyCode === 40) {
      if (character.y !== characterYDown) {
        this.character.current.style.backgroundPosition = `${character.x}px ${characterYDown}px`;
      }

      if (cityPosition.top - stepPixels >= bottommostYPx) {
        newCityPosition.top = cityPosition.top - stepPixels;
        newOutsideCityPosition.top = outsideCityPosition.top - stepPixels
      }
    }
  
    //left = +stepPixels
    else if (e.keyCode === 37) {
      if (character.y !== characterYLeft) {
        this.character.current.style.backgroundPosition = `${character.x}px ${characterYLeft}px`;
      }
  
      if (cityPosition.left + stepPixels <= leftmostXPx) {
        newCityPosition.left = cityPosition.left + stepPixels;
        outsideCityPosition.left = outsideCityPosition.left + stepPixels;

      }
    }
  
    //right = -stepPixels
    else if (e.keyCode === 39) {
      if (character.y !== characterYRight) {
        this.character.current.style.backgroundPosition = `${character.x}px ${characterYRight}px`;
      }
  
      if (cityPosition.left - stepPixels >= rightmostXPx) {
        newCityPosition.left = cityPosition.left -  stepPixels;
        outsideCityPosition.left = outsideCityPosition.left -  stepPixels;

      }
    }

    this.city.current.style['top'] = `${newCityPosition['top']}px`;
    this.city.current.style['left'] = `${newCityPosition['left']}px`;
    this.outsideCity.current.style['top'] = `${newOutsideCityPosition['top']}px`;
    this.outsideCity.current.style['left'] = `${newOutsideCityPosition['left']}px`;


  
  }

  calculateCityVsOutsideCityPixels = () => {
    return 0;
  }
  
  componentDidMount() {
    const cityCurrentTop = 0;
    const cityCurrentLeft = 0;
    const mapHeight = 4500;
    const mapWidth = 6000;

    this.character.current.style['backgroundPositionX'] = '0px';
    this.character.current.style['backgroundPositionY'] = '0px';
    this.character.current.style['width'] = '60px';
    this.character.current.style['height'] = '89px';
    this.character.current.style['top'] = `${(window.screen.height / 2) - 89}px`
    this.character.current.style['left'] = `${(window.screen.width / 2) - 60}px`
    
    this.city.current.style['width'] = `${mapWidth}px`;
    this.city.current.style['height'] = `${mapHeight}px`;
    this.city.current.style['top'] = `${cityCurrentTop}px`;
    this.city.current.style['left'] = `${cityCurrentLeft}px`;
    this.outsideCity.current.style['top'] = `-${window.screen.height / 2}px`;
    this.outsideCity.current.style['left'] = `-${window.screen.width / 2}px`;
    this.outsideCity.current.style['width'] = `${mapWidth + window.screen.width}px`;
    this.outsideCity.current.style['height'] = `${mapHeight + window.screen.height}px`;
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