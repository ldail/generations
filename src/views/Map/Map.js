import React, { useState, useEffect, Suspense } from 'react';
import PersonInfoHeader from '../../components/View/PersonInfoHeader/PersonInfoHeader';
import NavInfoFooter from '../../components/View/NavInfoFooter/NavInfoFooter';
import { ComposableMap, Geographies, Geography, ZoomableGroup, Marker } from "react-simple-maps";
import './Map.css';
import ReactTooltip from "react-tooltip";
import { connect } from 'react-redux';
import { setMapPositionToView } from '../../redux/gameRoot/actions/gameRootActions';
import {ReactComponent as Spinner} from '../../assets/loading.svg';
import styled from 'styled-components';

//Icons
import {ReactComponent as LocationIcon} from '../../assets/location-icon.svg';
import {ReactComponent as EyeIcon} from '../../assets/eye-icon.svg';
import {ReactComponent as SearchIcon} from '../../assets/search-icon.svg';
import {ReactComponent as RadiationIcon} from '../../assets/radiation-icon.svg';
import {ReactComponent as RadiationPetIcon} from '../../assets/radiation-pet-icon.svg';


//Styled Components
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

const StyledToggleButton = styled.button`
  background-color: ${({toggleOn}) => toggleOn ? 'gray' : 'white'};
`;


//Map Data
const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";


const Map = ({characters,mapPositionToView, currentCharacters, setMapPositionToView}) => {

  let characterTooltipTimeout = null;
  let charLevelZoom = 4;

  //State
  const [content, setContent] = useState(""); //Tooltip
  const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 }); //Map position
  const [characterCurrentMapArea, setCharacterCurrentMapArea] = useState(null); //The area where the user currently is at
  const [currentCharacterIdViewing, setCurrentCharacterIdViewing] = useState(currentCharacters[0]); //Currently focused character for location lock.
  const [currentMapAreaFocus, setCurrentMapAreaFocus] = useState(null); //The area to display radiation info
  const [showCharactersList, setShowCharactersList] = useState([currentCharacters[0]]); //The full list of characters to show markers for.

  //Buttons State - toggle on or off
  const [showRadiationInfo, setShowRadiationInfo] = useState(true);
  const [viewAllCharactersButtonToggle, setViewAllCharactersButtonToggle] = useState(false);
  const [lockCharacterLocationButtonToggle, setLockCharacterLocationButtonToggle] = useState(true);

  //Effects
  useEffect(() => {
    const newPosition = {zoom: 1, coordinates: [0,0]}
    if (mapPositionToView && mapPositionToView.zoom) {
        newPosition.zoom = mapPositionToView.zoom;
    }
    else {
      newPosition.zoom = charLevelZoom;
    }
    if (mapPositionToView && mapPositionToView.coordinates) {
        newPosition.coordinates = mapPositionToView.coordinates
    }
    else {
      const lastMapPosition = characters.find(character => character.id === currentCharacters[0]).lastMapPosition
      newPosition.coordinates = [lastMapPosition.x, lastMapPosition.y]
    }
    setPosition(newPosition);

    return () => {
      setMapPositionToView({})
    };
  },[]);

  useEffect(() => {
    if (lockCharacterLocationButtonToggle) {
      const lastMapPosition = characters.find(character => character.id === currentCharacterIdViewing).lastMapPosition;
      const mapPosition = [lastMapPosition.x, lastMapPosition.y]
      setPosition({coordinates: mapPosition, zoom: charLevelZoom});
    }
  },[lockCharacterLocationButtonToggle, characters, currentCharacterIdViewing]);

  //Character current location Name for map info bar
  useEffect(() => {
    //Currently a placeholder.
    setCharacterCurrentMapArea('CurrentCity');
  },[characters])


  //Button and movement actions
  function handleZoomIn() {
    setLockCharacterLocationButtonToggle(false);
    if (position.zoom >= 100) return;
    setPosition(pos => ({ ...pos, zoom: pos.zoom * 2 }));
  }

  function handleZoomOut() {
    setLockCharacterLocationButtonToggle(false);
    if (position.zoom <= 0.75) return;
    setPosition(pos => ({ ...pos, zoom: pos.zoom / 2 }));
  }

  function handleMoveEnd(position) {
    setPosition(position);
  }

  function handleMoveStart() {
    setLockCharacterLocationButtonToggle(false);
  }

  
const handleCharacterSelect = (character) => {
  if (!lockCharacterLocationButtonToggle) {
    const characterPosition = character.lastMapPosition
    setPosition({coordinates: [characterPosition.x, characterPosition.y], zoom: charLevelZoom});
    setCurrentCharacterIdViewing(character.id);
    setLockCharacterLocationButtonToggle(true);
  }
  else {
    setLockCharacterLocationButtonToggle(false);
    setCurrentCharacterIdViewing(currentCharacters[0])
  }
}





  /* Bottom navigation buttons */

  const handleSearchForCharacterButtonClick = (id) => {
      //Bring up tree for finding character id
      //That prompt will call showSingleCharacter(id);
      setViewAllCharactersButtonToggle(false);
  }

  /**
   * When the 'view all characters' button is clicked, toggle:
   * ON: All character icons appear
   * OFF: Only the current character icon appears
   */
  const handleViewCharactersToggleButtonClick = () => {
    if (!viewAllCharactersButtonToggle) {
      setShowCharactersList();
      setViewAllCharactersButtonToggle(true);
    }
    else {
      setShowCharactersList([currentCharacters[0]]);
      setViewAllCharactersButtonToggle(false);
    }
    return;
  }

  /**
   * When the 'current location' button is clicked, toggle:
   * ON: Lock location to the place of the character.
   *  >If there is no character currently selected (after clicking the character), use the currently active character.
   *  >If there is a character selected, lock that character.
   * OFF: Stop tracking any characters
   */
  const handleReturnToCurrentLocationButtonClick = () => {
    if (lockCharacterLocationButtonToggle) {
      setLockCharacterLocationButtonToggle(false);
    }
    else {
      const lastMapPosition = characters.find(character => character.id === currentCharacterIdViewing).lastMapPosition;
      const mapPosition = [lastMapPosition.x, lastMapPosition.y];
      if (mapPosition[0] === position.coordinates[0] && mapPosition[1] === position.coordinates[1]) {
        setLockCharacterLocationButtonToggle(true);
      }
      setPosition({coordinates: mapPosition, zoom: charLevelZoom})
    }
  }

  const clearContent = () => {
    setContent('');
  }


  //Loading spinner
  const spinner = () => {
    return (
      <StyledSpinner className="spinner">
        <Spinner />
      </StyledSpinner>
    )
  }

const showSingleCharacter = (id) => {
  const singleCharacter = characters.find(character => character.id === id);
  setShowCharactersList(id);
  const singleCharacterCoordinates = [singleCharacter.lastMapPosition.x, singleCharacter.lastMapPosition.y];
  setPosition({coordinates: singleCharacterCoordinates, zoom: charLevelZoom});
}




  return (
    <Suspense fallback={spinner()}>
      <div className="Map">
        <PersonInfoHeader />
        <div className="currently-active-info">
          <p>Currently: {characters.find(character => character.id === currentCharacters[0]).currentState}</p>
          <span className="vertical-divider" />
          <RadiationPetIcon className="hoverIcon" />

        </div>
        <ReactTooltip>{content}</ReactTooltip>
        <ComposableMap 
          data-tip="" 
          height={window.innerHeight} 
          width={window.innerWidth}>
          <ZoomableGroup
                      zoom={position.zoom}
                      center={position.coordinates}
                      onMoveStart={handleMoveStart}
                      onMoveEnd={handleMoveEnd}
                      >
            <Geographies geography={geoUrl}>
              {({ geographies }) =>  {
                return (
                geographies.map(geo => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={() => {
                      const { NAME} = geo.properties;
                      setCurrentMapAreaFocus(NAME);
                    }}
                    onTouchStart={() => {
                      const { NAME} = geo.properties;
                      setCurrentMapAreaFocus(NAME);
                      characterTooltipTimeout = setTimeout(() => clearContent(),3000)
                    }}
                    onMouseLeave={() => {
                      setCurrentMapAreaFocus(null);
                    }}
                    style={{
                      default: {
                        fill: geo.properties.ABBREV === "S.Af." ? '#FF0000' : "#D6D6DA",
                        outline: "none"
                      },
                      hover: {
                        fill: "#F53",
                        outline: "none"
                      },
                      pressed: {
                        fill: "#E42",
                        outline: "none"
                      }
                    }}
                  />
                )))
              }}
            </Geographies>
            {characters.map(character => {
              if ((showCharactersList && showCharactersList.includes(character.id)) || (!showCharactersList && viewAllCharactersButtonToggle === true)) {
                if (character.partnerLeader) {
                  return (<Marker 
                            onMouseEnter={() => {
                              setContent(character.name);
                            }}
                            onTouchStart={() => {
                              setContent(character.name);
                              characterTooltipTimeout = setTimeout(() => clearContent(),3000)
                            }}
                            onMouseLeave={() => {
                              if (characterTooltipTimeout) {
                                clearTimeout(characterTooltipTimeout);
                              }
                              setContent('');
                            }}
                            onClick={() => {
                              handleCharacterSelect(character);
                            }}
                            coordinates={[character.lastMapPosition.x,character.lastMapPosition.y]}>
                            <circle r={3} fill={character.color.hexCode} />
                          </Marker>);
                }
                else {
                  return null;
                }
              }
              else {
                return null;
              }
            })}
          </ZoomableGroup>
        </ComposableMap>
        <div className="map-info-bar">
          <div className="map-info">
          {showRadiationInfo 
          ? 
            <>
            <p>Current city: {currentMapAreaFocus ? currentMapAreaFocus : characterCurrentMapArea}</p>
            <p>Deradiation Bar: [-|-|-|-|-|-] - 50%</p>
            <p>240394 / 3099090 Deradiated</p>
            </>
          : null }
          </div>
          <div className="control-buttons">
            <div className="verticalControls">
              <StyledToggleButton toggleOn={showRadiationInfo} onClick={() => setShowRadiationInfo(() => !showRadiationInfo)}>
                <RadiationIcon />
              </StyledToggleButton>
              <StyledToggleButton onClick={() => handleSearchForCharacterButtonClick()}>
                <SearchIcon />
              </StyledToggleButton>
              <StyledToggleButton toggleOn={viewAllCharactersButtonToggle} onClick={() => handleViewCharactersToggleButtonClick()}>
                <EyeIcon />
              </StyledToggleButton>
              <StyledToggleButton toggleOn={lockCharacterLocationButtonToggle} onClick={() => handleReturnToCurrentLocationButtonClick()}>
                <LocationIcon />
              </StyledToggleButton>
            </div>
            <div className="zoom-controls">
              <button onClick={handleZoomIn}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </button>
              <button onClick={handleZoomOut}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </button>
              </div>
          </div>
        </div>
        <NavInfoFooter />
      </div>
    </Suspense>
  );
};

export const mapStateToProps = state => ({
  characters: state.family.characters,
  mapPositionToView: state.game.mapPositionToView,
  currentCharacters: state.game.currentCharacters,
})

export const mapDispatchToProps = dispatch => ({
  setMapPositionToView: (newPosition) => dispatch(setMapPositionToView(newPosition))
})

export default connect(mapStateToProps,mapDispatchToProps)(Map);