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
import animalStats from '../../assets/animalStats';


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


const Map = ({characters,mapPositionToView, currentCharacters, setMapPositionToView, pets}) => {

  let characterTooltipTimeout = null;
  const charLevelZoom = 4;
  let sortedGeographies = null;
  const worldMap = 'https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json';
  const usaMap = 'https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json';
  let minMaxValuesGeoObject = {};

  //State
  const [content, setContent] = useState(""); //Tooltip
  const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 }); //Map position
  const [characterCurrentMapArea, setCharacterCurrentMapArea] = useState(null); //The area where the user currently is at
  const [currentCharacterIdViewing, setCurrentCharacterIdViewing] = useState(currentCharacters[0]); //Currently focused character for location lock.
  const [currentMapAreaFocus, setCurrentMapAreaFocus] = useState(null); //The area to display radiation info
  const [showCharactersList, setShowCharactersList] = useState([currentCharacters[0]]); //The full list of characters to show markers for.
  const [currentMap, setCurrentMap] = useState(worldMap);

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

  function handleMoveEnd(newPosition) {
    if (position.zoom > newPosition.zoom && currentMap !== worldMap) {
      setCurrentMap(worldMap);
    }
    setPosition(newPosition);
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

  const hoverBoxInfo = (characterId) => {
    const characterInfo = characters.find(character => character.id === characterId);
    const currentAction = characterInfo.currentState;
    const name = characterInfo.name;
    const age = characterInfo.age;
    const petType = pets.find(pet => pet.id === characterInfo.petId).type;
    let partnerName = null;
    let partnerPetType = null;
    let petTypeIconImage = '';
    let partnerPetTypeIconImage = '';
    for (let type in
       animalStats.types) {
      if (petType === animalStats.types[type].id) {
        petTypeIconImage = animalStats.types[type].icon;
      }
    }
    if (characterInfo.partnerId >= 0) {
      const partnerInfo = characters.find(character => characterInfo.partnerId === character.id);
      partnerName = partnerInfo.name;
      partnerPetType = pets.find(pet => pet.id === partnerInfo.petId).type;
      for (let type in
         animalStats.types) {
        if (partnerPetType === animalStats.types[type].id) {
          partnerPetTypeIconImage = animalStats.types[type].icon;
        }
      }
    }
    return (
      <div className="charInfoModal">
        {name} {partnerName ? `& ${partnerName}` : null}
        Age: {age}
        Pet{partnerPetType >= 0 ? 's' : null}: <img src={petTypeIconImage} className="small-pet-icon" alt="pet" /> {partnerPetType >= 0 ? <img src={partnerPetTypeIconImage} className="small-pet-icon" alt="pet" /> : null}
        Currently: {currentAction}
      </div>
    );

  }

  const oneTimeSortedMapCoordinates = (geography) => {
    let sortedMapForXValueCoordinates = {};
    geography.forEach((geo,index) => {
      let coordinates = geo.geometry.coordinates[0].slice();
      coordinates.sort((a,b) => {
        a = a[0];
        b = b[0];
        return a-b;
      });
      sortedMapForXValueCoordinates = {...geography, coordinates}
      sortedMapForXValueCoordinates[index].minXValue = geo.geometry.coordinates[0][0][0];
      sortedMapForXValueCoordinates[index].maxXValue = geo.geometry.coordinates[0][geo.geometry.coordinates[0].length - 1][0];
    });
    let sortedMapForYValueCoordinates = geography.slice();
    geography.forEach((geo,index) => {
      let coordinates = geo.geometry.coordinates[0].slice();
      coordinates.sort((a,b) => {
        a = a[1];
        b = b[1];
        return a-b;
      });
      sortedMapForYValueCoordinates = {...sortedMapForYValueCoordinates, geometry: {...sortedMapForYValueCoordinates.geometry, coordinates: [coordinates]}}
      sortedMapForYValueCoordinates[index].minYValue = geo.geometry.coordinates[0][0][1];
      sortedMapForYValueCoordinates[index].maxYValue = geo.geometry.coordinates[0][geo.geometry.coordinates[0].length - 1][1];
    });
    const sortedMapWithMinAndMaxValues = {
      geography,
      sortedMapForXValueCoordinates,
      sortedMapForYValueCoordinates
    };
    sortedGeographies = sortedMapWithMinAndMaxValues;
    return;
  };


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

const minAndMaxValuesOfGeos = (coordinates, minX = null, minY = null, maxX = null, maxY = null) => {

  coordinates.forEach(coordinatesArr => {
    if (Array.isArray(coordinatesArr[0])) {
      let arrayResults = minAndMaxValuesOfGeos(coordinatesArr);
      minX = arrayResults.minX;
      minY = arrayResults.minY;
      maxX = arrayResults.maxX;
      maxY = arrayResults.maxY;
    }
    else {
      if (coordinatesArr[0] < minX || minX === null) {
        minX = coordinatesArr[0];
      }
      if (coordinatesArr[0] > maxX || maxX === null) {
        maxX = coordinatesArr[0];
      }
      if (coordinatesArr[1] < minY || minY === null) {
        minY = coordinatesArr[1];
      }
      if (coordinatesArr[1] > maxY || maxY === null) {
        maxY = coordinatesArr[1];
      }
    }
  })

  return {minX, minY, maxX, maxY};
}

  return (
    <Suspense fallback={spinner()}>
      <div className="Map" onTouchMove={() => {
        if (content) {
          setContent('')}
        }}>
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

                      onZoomEnd={(newzoom) => {
                        console.log(newzoom);
                      }}
                      >
            <Geographies geography={currentMap}>
              {({ geographies }) =>  {
                // if (!sortedGeographies) { oneTimeSortedMapCoordinates(geographies)}
                return (
                geographies.map(geo => {
                  if (!minMaxValuesGeoObject[geo.properties.NAME]) {
                    minMaxValuesGeoObject[geo.properties.NAME] = minAndMaxValuesOfGeos(geo.geometry.coordinates)
                  }
                  return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={() => {
                      const { NAME} = geo.properties;
                      setCurrentMapAreaFocus(NAME);
                    }}
                    onTouchEnd={() => {
                      const { NAME} = geo.properties;
                      if (NAME === 'United States of America') {
                        setCurrentMap(usaMap);
                      }
                      setContent('')
                      setCurrentMapAreaFocus(NAME);
                    }}
                    onTouchMove={() => setContent('')}
                    onMouseLeave={() => {
                      setCurrentMapAreaFocus(null);
                    }}
                    onClick={() => {
                      const { NAME} = geo.properties;
                      if (NAME === 'United States of America') {
                        setCurrentMap(usaMap);
                      }
                      setContent('')
                      setCurrentMapAreaFocus(NAME);
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
                )}))
              }}
            </Geographies>
            
            {characters.map(character => {
              if ((showCharactersList && showCharactersList.includes(character.id)) || (!showCharactersList && viewAllCharactersButtonToggle === true)) {
                if (character.partnerLeader) {
                  return (<Marker 
                            onClick={(marker) => {
                              setContent(hoverBoxInfo(character.id));
                              handleCharacterSelect(character);
                            }}
                            onMouseEnter={() => {
                              setContent(hoverBoxInfo(character.id));
                            }}
                            onTouchStart={(e) => {
                              setContent(hoverBoxInfo(character.id));
                            }}
                            onTouchMove={() => {
                              setContent('');
                            }}
                            onMouseLeave={() => {
                              setContent('');
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
  pets: state.pet.pets,
  mapPositionToView: state.game.mapPositionToView,
  currentCharacters: state.game.currentCharacters,
})

export const mapDispatchToProps = dispatch => ({
  setMapPositionToView: (newPosition) => dispatch(setMapPositionToView(newPosition))
})

export default connect(mapStateToProps,mapDispatchToProps)(Map);