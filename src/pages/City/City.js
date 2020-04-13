import React, { Component } from 'react';
import './City.css';
import {cityOne} from '../../assets/pages';
import PixelWriter from '../../development/PixelWriter/PixelWriter';

class City extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cityTop: 0,
      cityLeft: 0
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
    const cityPositionTop = this.city.current.style['top'];
    const cityPositionLeft = this.city.current.style['left'];
    cityPosition.top = parseInt(cityPositionTop.slice(0,cityPositionTop.length-1));
    cityPosition.left = parseInt(cityPositionLeft.slice(0,cityPositionLeft.length-1));
    const outsideCityPositionTop = this.outsideCity.current.style['top'];
    const outsideCityPositionLeft = this.outsideCity.current.style['left'];
    outsideCityPosition.top = parseInt(outsideCityPositionTop.slice(0,outsideCityPositionTop.length-1));
    outsideCityPosition.left = parseInt(outsideCityPositionLeft.slice(0,outsideCityPositionLeft.length-1));
  
    //character
    const characterPositionX = this.character.current.style['backgroundPositionX'];
    const characterPositionY = this.character.current.style['backgroundPositionY'];
    character.x = parseInt(characterPositionX.slice(0,characterPositionX.length-1));
    character.y = parseInt(characterPositionY.slice(0,characterPositionY.length-1));
  
    return {cityPosition, outsideCityPosition, character};
  }

  convertMapPixelToScreenPixelPosition = (points,direction) => {
    const {x,y} = points;
    const characterHeight = parseInt(this.character.current.style['height'].slice(0,this.character.current.style['height'].length - 1));
    const characterWidth = parseInt(this.character.current.style['width'].slice(0,this.character.current.style['height'].length - 1));
    let characterVariable = 0;
    if (direction === 'left') {
      characterVariable = characterWidth;
    }
    else if (direction === 'up') {
      characterVariable = characterHeight
    }
    else if (direction === 'none' || direction === 'down' || direction === 'right') {
      characterVariable = 0;
    }
    const leftmostXPx = 0 - characterVariable + (window.screen.width / 2);
    const topmostYPx = 0 - characterVariable + (window.screen.height / 2);

    return {x: leftmostXPx - x, y: topmostYPx - y};


  }

  checkIfBlocked = (pointSet, direction) => {
    const convertedSet = this.convertMapPixelToScreenPixelPosition(pointSet, direction)
    const {x,y} = convertedSet;
    const blockedOffPixels = cityOne.blockedOffPixels.areasBlockedCalculation;
    const isBlocked = blockedOffPixels.find(set => {
      if (x > set[0].x && x < set[1].x 
            && y > set[0].y && y < set[1].y) {
              return true;
            }
    })
    return !!isBlocked;
  }
  
  checkKey = e => {
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

    const newCityPosition = {top: cityPosition.top, left: cityPosition.left};
    const newOutsideCityPosition = {top: outsideCityPosition.top, left: outsideCityPosition.left};
    
    //up = +stepPixels
    if (e.keyCode === 38) {
      if (character.y !== characterYUp) {
        this.character.current.style.backgroundPosition = `${character.x}px ${characterYUp}px`;
      }

      const potentialNewCityPosition = cityPosition.top + stepPixels
      const potentialNewOutsideCityPosition = outsideCityPosition.top + stepPixels;
      if (potentialNewCityPosition <= topmostYPx && !this.checkIfBlocked({x: cityPosition.left, y: potentialNewCityPosition}, 'up')) {
        newCityPosition.top = potentialNewCityPosition;
        newOutsideCityPosition.top = potentialNewOutsideCityPosition
      }
    }
  
    //down = -stepPixels
    else if (e.keyCode === 40) {
      if (character.y !== characterYDown) {
        this.character.current.style.backgroundPosition = `${character.x}px ${characterYDown}px`;
      }

      const potentialNewCityPosition = cityPosition.top - stepPixels
      const potentialNewOutsideCityPosition = outsideCityPosition.top - stepPixels;
      if (potentialNewCityPosition >= bottommostYPx && !this.checkIfBlocked({x: cityPosition.left, y: potentialNewCityPosition},'down')) {
        newCityPosition.top = potentialNewCityPosition;
        newOutsideCityPosition.top = potentialNewOutsideCityPosition;
      }
    }
  
    //left = +stepPixels
    else if (e.keyCode === 37) {
      if (character.y !== characterYLeft) {
        this.character.current.style.backgroundPosition = `${character.x}px ${characterYLeft}px`;
      }
  
      const potentialNewCityPosition = cityPosition.left + stepPixels
      const potentialNewOutsideCityPosition = outsideCityPosition.left + stepPixels;
      if (potentialNewCityPosition <= leftmostXPx && !this.checkIfBlocked({x: potentialNewCityPosition, y: cityPosition.top},'left')) {
        newCityPosition.left = potentialNewCityPosition;
        newOutsideCityPosition.left = potentialNewOutsideCityPosition;

      }
    }
  
    //right = -stepPixels
    else if (e.keyCode === 39) {
      if (character.y !== characterYRight) {
        this.character.current.style.backgroundPosition = `${character.x}px ${characterYRight}px`;
      }
  
      const potentialNewCityPosition = cityPosition.left - stepPixels
      const potentialNewOutsideCityPosition = outsideCityPosition.left - stepPixels;
      if (potentialNewCityPosition >= rightmostXPx && !this.checkIfBlocked({x: potentialNewCityPosition, y: cityPosition.top},'right')) {
        newCityPosition.left = potentialNewCityPosition;
        newOutsideCityPosition.left = potentialNewOutsideCityPosition;

      }
    }

    this.city.current.style['top'] = `${newCityPosition['top']}px`;
    this.city.current.style['left'] = `${newCityPosition['left']}px`;
    this.setState({cityTop: newCityPosition['top'], cityLeft: newCityPosition['left']});
    this.outsideCity.current.style['top'] = `${newOutsideCityPosition['top']}px`;
    this.outsideCity.current.style['left'] = `${newOutsideCityPosition['left']}px`;
  }
  
  componentDidMount() {

    //Character
    this.character.current.style['backgroundPositionX'] = '0px';
    this.character.current.style['backgroundPositionY'] = '0px';
    this.character.current.style['width'] = '60px';
    this.character.current.style['height'] = '89px';
    this.character.current.style['top'] = `${(window.screen.height / 2) - 89}px`
    this.character.current.style['left'] = `${(window.screen.width / 2) - 60}px`


    //Map
    const currentMap = cityOne;
    const {x: startingPointX, y: startingPointY} = currentMap.startingPoint
    const convertedStartPoint = this.convertMapPixelToScreenPixelPosition({x: startingPointX, y: startingPointY}, 'none');
    const cityCurrentTop = convertedStartPoint.y;
    const cityCurrentLeft = convertedStartPoint.x;
    this.setState({cityTop: cityCurrentTop, cityLeft: cityCurrentLeft});

    const mapHeight = 4500;
    const mapWidth = 6000;
    
    this.city.current.style['width'] = `${mapWidth}px`;
    this.city.current.style['height'] = `${mapHeight}px`;
    this.city.current.style['top'] = `${cityCurrentTop}px`;
    this.city.current.style['left'] = `${cityCurrentLeft}px`;
    this.outsideCity.current.style['top'] = `${cityCurrentTop - (window.screen.height / 2)}px`;
    this.outsideCity.current.style['left'] = `${cityCurrentLeft - (window.screen.width / 2)}px`;
    this.outsideCity.current.style['width'] = `${mapWidth + window.screen.width}px`;
    this.outsideCity.current.style['height'] = `${mapHeight + window.screen.height}px`;
  }


  render() {
    return (
      <div id="OutsideCity" ref={this.outsideCity} onKeyDown={(e) => this.checkKey(e)} tabIndex="0">
        <div id="City" ref={this.city}>
          {/* <PixelWriter active={true} city={this.city} cityTop={this.state.cityTop} cityLeft={this.state.cityLeft}/> */}
          <div className="character" ref={this.character} tabIndex="0"/>
        </div>
      </div>
    );
  }
}

export default City;