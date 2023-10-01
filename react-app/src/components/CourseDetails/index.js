import React, { useState } from "react";
import Map, { Marker, Source, Layer } from "react-map-gl";

import "./CourseDetails.css";

const teePad1 = { lng: -123.1529549384451, lat: 44.050963068556996 };
const basket1 = { lng: -123.15207798763349, lat: 44.05073724174806 };
const teePad2 = { lat: 44.05046067372952, lng: -123.15153686522522 };
const basket2 = { lat: 44.050449405200894, lng: -123.15038055172724 };

const CourseDetails = () => {
  const [initialView, setInitialView] = useState({
    latitude: 44.05220019334348,
    longitude: -123.15358982872979,
    zoom: 16,
  });

  const data = {
    type: "Feature",
    properties: {},
    geometry: {
      type: "LineString",
      coordinates: [
        [-123.1529549384451, 44.050963068556996],
        [-123.15207798763349, 44.05073724174806],
      ],
    },
  };
  const data2 = {
    type: "Feature",
    properties: {},
    geometry: {
      type: "LineString",
      coordinates: [
        [teePad2.lng, teePad2.lat],
        [basket2.lng, basket2.lat],
      ],
    },
  };

  const layer = {
    id: "route",
    type: "line",
    layout: {
      "line-join": "round",
      "line-cap": "round",
    },
    paint: {
      "line-color": "#ffffff",
      "line-width": 8,
      "line-opacity": 0.6,
    },
  };

  const layer2 = {
    id: "route2", // Unique ID for the second line
    type: "line",
    layout: {
      "line-join": "round",
      "line-cap": "round",
    },
    paint: {
      "line-color": "#ffffff",
      "line-width": 8,
      "line-opacity": 0.6,
    },
  };

  return (
    <div className="course-details__container">
      <Map
        onClick={(map) => console.log(map.lngLat)}
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        initialViewState={initialView}
        mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
      >
        <Marker longitude={teePad1.lng} latitude={teePad1.lat} />
        <Marker longitude={basket1.lng} latitude={basket1.lat} />
        <Marker longitude={teePad2.lng} latitude={teePad2.lat} />
        <Marker longitude={basket2.lng} latitude={basket2.lat} />
        <Source id="my-data1" type="geojson" data={data}>
          <Layer {...layer} />
        </Source>
        <Source id="my-data2" type="geojson" data={data2}>
          <Layer {...layer2} />
        </Source>
      </Map>
    </div>
  );
};

export default CourseDetails;
