import React, { useState, useRef } from "react";
import Map, {
  Marker,
  Source,
  Layer,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
} from "react-map-gl";
import {
  zoomToHolePosition,
  calculateLines,
} from "../../utils/coursesHelperFunctions";
import "./CourseDetails.css";

const teePad1 = { lng: -123.1529549384451, lat: 44.050963068556996 };
const basket1 = { lng: -123.15207798763349, lat: 44.05073724174806 };
const teePad2 = { lng: -123.15299441460132, lat: 44.0504870571707 };
const basket2 = { lng: -123.15177002076109, lat: 44.050335549832226 };
const teePad3 = { lat: 44.05046067372952, lng: -123.15153686522522 };
const basket3 = { lng: -123.1503398859764, lat: 44.050495872936864 };
const teePad4 = { lng: -123.15040268407805, lat: 44.05072084818741 };
const basket4 = { lng: -123.15065354638654, lat: 44.05182636937076 };
const teePad5 = { lng: -123.15064891082511, lat: 44.05233367635924 };
const basket5 = { lng: -123.14823440853417, lat: 44.052161279061266 };
const teePad6 = { lng: -123.1482200317821, lat: 44.052464718808466 };
const basket6 = { lng: -123.1492282469045, lat: 44.05279866837108 };
const teePad7 = { lng: -123.14871272132203, lat: 44.05290150078318 };
const basket7 = { lng: -123.1501593456099, lat: 44.05313963354112 };
const teePad8 = { lng: -123.1500723355887, lat: 44.0533187413962 };
const basket8 = { lng: -123.14915968183095, lat: 44.053915583232765 };
const teePad9 = { lng: -123.14868500217351, lat: 44.05391229242235 };
const basket9 = { lng: -123.14894988888824, lat: 44.05311712022785 };
const teePad10 = { lng: -123.14822336828644, lat: 44.052774982968 };
const basket10 = { lng: -123.14840931116886, lat: 44.0538477809059 };
const teePad11 = { lng: -123.14867919506254, lat: 44.05416093220995 };
const basket11 = { lng: -123.1500913997165, lat: 44.05400168271885 };
const teePad12 = { lng: -123.15050883519518, lat: 44.053221844224026 };
const basket12 = { lng: -123.15032018158062, lat: 44.05390822368207 };
const teePad13 = { lng: -123.15168088939618, lat: 44.054142916597414 };
const basket13 = { lng: -123.15020280862427, lat: 44.05261289055903 };
const teePad14 = { lng: -123.15082955393135, lat: 44.05218779812694 };
const basket14 = { lng: -123.15208681232176, lat: 44.05229083112664 };
const teePad15 = { lng: -123.15234744586972, lat: 44.052272320554806 };
const basket15 = { lng: -123.15369214515934, lat: 44.05286181927042 };
const teePad16 = { lng: -123.1527955705296, lat: 44.05198370109369 };
const basket16 = { lng: -123.15137931555192, lat: 44.05185931929984 };
const teePad17 = { lng: -123.15142319725831, lat: 44.051514349592395 };
const basket17 = { lng: -123.15098612795347, lat: 44.050937863617634 };
const teePad18 = { lng: -123.15113526974402, lat: 44.05060797086824 };
const basket18 = { lng: -123.15254717491858, lat: 44.0514034429728 };

const holePositions = [
  [teePad1, basket1],
  [teePad2, basket2],
  [teePad3, basket3],
  [teePad4, basket4],
  [teePad5, basket5],
  [teePad6, basket6],
  [teePad7, basket7],
  [teePad8, basket8],
  [teePad9, basket9],
  [teePad10, basket10],
  [teePad11, basket11],
  [teePad12, basket12],
  [teePad13, basket13],
  [teePad14, basket14],
  [teePad15, basket15],
  [teePad16, basket16],
  [teePad17, basket17],
  [teePad18, basket18],
];
const dottedLines = [
  [basket1, teePad2],
  [basket2, teePad3],
  [basket3, teePad4],
  [basket4, teePad5],
  [basket5, teePad6],
  [basket6, teePad7],
  [basket7, teePad8],
  [basket8, teePad9],
  [basket9, teePad10],
  [basket10, teePad11],
  [basket11, teePad12],
  [basket12, teePad13],
  [basket13, teePad14],
  [basket14, teePad15],
  [basket15, teePad16],
  [basket16, teePad17],
  [basket17, teePad18],
];
const basketMarkers = [
  basket1,
  basket2,
  basket3,
  basket4,
  basket5,
  basket6,
  basket7,
  basket8,
  basket9,
  basket10,
  basket11,
  basket12,
  basket13,
  basket14,
  basket15,
  basket16,
  basket17,
  basket18,
];
const teePadMarkers = [
  teePad1,
  teePad2,
  teePad3,
  teePad4,
  teePad5,
  teePad6,
  teePad7,
  teePad8,
  teePad9,
  teePad10,
  teePad11,
  teePad12,
  teePad13,
  teePad14,
  teePad15,
  teePad16,
  teePad17,
  teePad18,
];

const basketPositions = calculateLines(holePositions);

const dottedLineFeatures = calculateLines(dottedLines);

const CourseDetails = () => {
  const [hole, setHole] = useState(0);
  const mapRef = useRef();
  const [initialView, setInitialView] = useState({
    latitude: 44.05220019334348,
    longitude: -123.15358982872979,
    zoom: 16,
  });

  const goToNextHole = () => {
    if (hole >= teePadMarkers.length) {
      setHole(0);
    }
    zoomToHolePosition(teePadMarkers[hole], basketMarkers[hole], mapRef);
    setHole((prev) => prev + 1);
  };

  return (
    <div className="course-details__container">
      <Map
        ref={mapRef}
        onClick={(map) => console.log(map.lngLat)}
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        initialViewState={initialView}
        center={[-123.1524725738225, 44.05084228389478]}
        mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
      >
        <FullscreenControl position="top-left" />
        <NavigationControl position="top-left" />
        <ScaleControl />
        {/* Renders the markers for each teepad*/}
        {teePadMarkers.map((teePad, index) => (
          <Marker
            key={`teePad${index}`}
            longitude={teePad.lng}
            latitude={teePad.lat}
          >
            <div
              style={{
                backgroundColor: "white",
                width: "20px",
                height: "40px",
                border: "1px solid black",
              }}
            ></div>
          </Marker>
        ))}
        {/* Renders markers for each basket position */}
        {basketMarkers.map((basket, index) => (
          <Marker
            key={`basket${index}`}
            longitude={basket.lng}
            latitude={basket.lat}
          >
            <img
              style={{ width: "50px", height: "50px" }}
              src="https://res.cloudinary.com/dmkyocbqi/image/upload/v1696214732/P130jE01_hfjszg.svg"
              alt="basket"
            />
          </Marker>
        ))}
        {/* Renders the lines between each teepad and basket */}
        {basketPositions.map((feature, index) => (
          <Source
            key={`teePad${index}`}
            id={`teePadSource${index}`}
            type="geojson"
            data={feature}
          >
            <Layer
              id={`teePadLayer${index}`}
              type="line"
              paint={{
                "line-color": "white",
                "line-width": 8,
                "line-opacity": 0.5,
              }}
            />
          </Source>
        ))}
        {/* Renders the dotted lines between each basket and teepad */}
        {dottedLineFeatures.map((feature, index) => (
          <Source
            key={`dottedLine${index}`}
            id={`dottedLineSource${index}`}
            type="geojson"
            data={feature}
          >
            <Layer
              id={`dottedLineLayer${index}`}
              type="line"
              paint={{
                "line-color": "white",
                "line-width": 1,
                "line-dasharray": [3, 3],
              }}
            />
          </Source>
        ))}
      </Map>
      <button onClick={goToNextHole}>Next</button>
    </div>
  );
};

export default CourseDetails;
