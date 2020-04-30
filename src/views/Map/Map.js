import React, { useState, useEffect, useRef } from 'react';
import PersonInfoHeader from '../../components/View/PersonInfoHeader/PersonInfoHeader';
import NavInfoFooter from '../../components/View/NavInfoFooter/NavInfoFooter';
import { ComposableMap, Geographies, Geography, ZoomableGroup, Marker } from "react-simple-maps";
import './Map.css';
import ReactTooltip from "react-tooltip";
import { connect } from 'react-redux';

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

const Map = ({characters}) => {
  const [content, setContent] = useState("");
  const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });
  let characterTooltipTimeout = null;

  function handleZoomIn() {
    if (position.zoom >= 4) return;
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


  return (
    <div className="Map">
      <PersonInfoHeader />
      <ReactTooltip>{content}</ReactTooltip>
      <ComposableMap 
        data-tip="" 
        height={window.screen.height} 
        width={window.screen.width}>
        <ZoomableGroup
                    zoom={position.zoom}
                    center={position.coordinates}
                    onMoveEnd={handleMoveEnd}
                    >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map(geo => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => {
                    const { NAME, POP_EST } = geo.properties;
                    setContent(`${NAME} — ${rounded(POP_EST)}`);
                    characterTooltipTimeout = setTimeout(() => clearContent(),3000)
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
                      fill: "#D6D6DA",
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
              ))
            }
          </Geographies>
          {characters.map(character => {
            if (character.partnerLeader) {
              return (<Marker 
                        onMouseEnter={() => {
                          setContent(character.name);
                          characterTooltipTimeout = setTimeout(() => clearContent(),3000)
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
  );
};

export const mapStateToProps = state => ({
  characters: state.family.characters
})

export default connect(mapStateToProps,null)(Map);