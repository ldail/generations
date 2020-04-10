import React, { Component } from 'react';
import './City.css';

class City extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
    this.city = React.createRef()
    this.character = React.createRef()
  }

  findCurrentPositions = () => {
    let background = {};
    let character = {};
  
    //background
    let backgroundPositionX = this.city.current.style['background-position-x'] || `-${(6000 - window.screen.width) / 2}px`;
    let backgroundPositionY = this.city.current.style['background-position-y'] || `-${(6000 - window.screen.height) / 2}px`;
    let backgroundX = parseInt(backgroundPositionX.slice(0,backgroundPositionX.length-1));
    let backgroundY = parseInt(backgroundPositionY.slice(0,backgroundPositionY.length-1));
  
    //character
    let characterPositionX = this.character.current.style['background-position-x'] || '0px';
    let characterPositionY = this.character.current.style['background-position-y'] || '0px';
    let characterX = parseInt(characterPositionX.slice(0,characterPositionX.length-1));
    let characterY = parseInt(characterPositionY.slice(0,characterPositionY.length-1));
  
    background['X'] = backgroundX;
    background['Y'] = backgroundY;
    character['X'] = characterX;
    character['Y'] = characterY;
    return {background, character};
  }
  
  checkKey(e) {
    console.log('finding key');
    let {character, background} = this.findCurrentPositions();
    console.log(e.keyCode);
  
    //defaults - character
    let characterYDown = 0;
    let characterYUp = -89;
    let characterYLeft = -178;
    let characterYRight = -267;  
  
    let stepPixels = 7;
  
    //defaults - background
    let leftmostX = 1;
    let rightmostX = 6000 - window.screen.width;
    let topmostY = 1;
    let bottommostY = 6000 - window.screen.height;
    
  
    //up
    if (e.keyCode === 38) {
      if (character.Y !== characterYUp) {
        this.character.current.style.backgroundPosition = `${character.X}px ${characterYUp}px`;
      }
  
      if (background.Y + stepPixels < ~topmostY) {
        this.city.current.style.backgroundPosition = `${background.X}px ${background.Y + stepPixels}px`;
      }
    }
  
    //down
    if (e.keyCode === 40) {
      if (character.Y !== characterYDown) {
        this.character.current.style.backgroundPosition = `${character.X}px ${characterYDown}px`;
      }
  
      if (background.Y + stepPixels > ~bottommostY) {
        this.city.current.style.backgroundPosition = `${background.X}px ${background.Y - stepPixels}px`;
      }
    }
  
    //left
    if (e.keyCode === 37) {
      if (character.Y !== characterYLeft) {
        this.character.current.style.backgroundPosition = `${character.X}px ${characterYLeft}px`;
      }
  
      if (background.X + stepPixels < ~leftmostX) {
        this.city.current.style.backgroundPosition = `${background.X + stepPixels}px ${background.Y}px`;
      }
    }
  
    //right
    if (e.keyCode === 39) {
      if (character.Y !== characterYRight) {
        this.character.current.style.backgroundPosition = `${character.X}px ${characterYRight}px`;
      }
  
      if (background.X - stepPixels > ~rightmostX) {
        this.city.current.style.backgroundPosition = `${background.X - stepPixels}px ${background.Y}px`;
      }
    }
  
  }
  
  componentDidMount() {
    // center
    // this.city.current.style['background-position-x'] = `-${(6000 - window.screen.width) / 2}px`;
    // this.city.current.style['background-position-y'] = `-${(4500 - window.screen.height) / 2}px`;
    this.city.current.style['background-position-x'] = `-3725px`;
    this.city.current.style['background-position-y'] = `-2600px`;
  }


  render() {
    return (
      <div id="City" ref={this.city} onKeyDown={(e) => this.checkKey(e)} tabIndex="0">
        <div className="character" ref={this.character} />
      </div>
    );
  }
}

export default City;