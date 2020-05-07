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

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const rounded = num => {
  if (num > 1000000000) {
    return Math.round(num / 100000000) / 10 + "Bn";
  } else if (num > 1000000) {
    return Math.round(num / 100000) / 10 + "M";
  } else {
    return Math.round(num / 100) / 10 + "K";
  }
};

const Map = ({characters,mapPositionToView, currentCharacters, setMapPositionToView}) => {
  const [content, setContent] = useState("");
  const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });
  let characterTooltipTimeout = null;

  function handleZoomIn() {
    if (position.zoom >= 100) return;
    setPosition(pos => ({ ...pos, zoom: pos.zoom * 2 }));
  }

  function handleZoomOut() {
    if (position.zoom <= 0.75) return;
    setPosition(pos => ({ ...pos, zoom: pos.zoom / 2 }));
  }

  function handleMoveEnd(position) {
    setPosition(position);
  }

  const clearContent = () => {
    setContent('');
  }

  useEffect(() => {
    const newPosition = {zoom: 1, coordinates: [0,0]}
    if (mapPositionToView && mapPositionToView.zoom) {
        newPosition.zoom = mapPositionToView.zoom;
    }
    else {
      newPosition.zoom = 3;
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
  },[])


const spinner = () => {
  return (
    <StyledSpinner className="spinner">
      <Spinner />
    </StyledSpinner>
  )
}


  return (
    <Suspense fallback={spinner()}>
      <div className="Map">
        <PersonInfoHeader />
        <ReactTooltip>{content}</ReactTooltip>
        <ComposableMap 
          data-tip="" 
          height={window.innerHeight} 
          width={window.innerWidth}>
          <ZoomableGroup
                      zoom={position.zoom}
                      center={position.coordinates}
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
                      const { NAME, POP_EST } = geo.properties;
                      setContent(`${NAME} — ${rounded(POP_EST)}`);
                    }}
                    onTouchStart={() => {
                      const { NAME, POP_EST } = geo.properties;
                      setContent(`${NAME} — ${rounded(POP_EST)}`);
                      characterTooltipTimeout = setTimeout(() => clearContent(),3000)
                    }}
                    onMouseLeave={() => {
                      if (characterTooltipTimeout) {
                        clearTimeout(characterTooltipTimeout);
                      }
                      setContent('');
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
                          coordinates={[character.lastMapPosition.x,character.lastMapPosition.y]}>
                          <circle r={3} fill={character.color.hexCode} />
                        </Marker>);
              }
              else {
                return null;
              }
            })}
          </ZoomableGroup>
        </ComposableMap>
        <div className="controls">
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