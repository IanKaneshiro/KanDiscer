import React, { useRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Map, { Marker, Source, Layer, GeolocateControl } from "react-map-gl";

import {
  getTeepadsByCourseId,
  getTeepadMarkers,
  getBasketMarkers,
  getDottedLines,
  getHolePositions,
  allTeepads,
} from "../../store/teepads";

import {
  zoomToHolePosition,
  calculateLines,
} from "../../utils/coursesHelperFunctions";
import "./CourseDetails.css";
import {
  clearCurrentCourse,
  currentCourse,
  getCourseById,
} from "../../store/courses";
import LoadingSpinner from "../LoadingSpinner";
import TextOverlay from "./TextOverlay";

const CourseDetails = () => {
  const dispatch = useDispatch();
  const { courseId } = useParams();
  const course = useSelector(currentCourse);
  const teepads = useSelector(allTeepads);
  const teePadMarkers = useSelector(getTeepadMarkers);
  const basketMarkers = useSelector(getBasketMarkers);
  const holePositions = useSelector(getHolePositions);
  const dottedLines = useSelector(getDottedLines);
  const basketPositions = calculateLines(holePositions);
  const dottedLineFeatures = calculateLines(dottedLines);
  const [currentHole, setCurrentHole] = useState(1);
  const mapRef = useRef();

  const initalView = {
    longitude: course.lng,
    latitude: course.lat,
    zoom: 16,
  };

  const goToNextHole = (holeNumber) => {
    setCurrentHole(holeNumber);
    zoomToHolePosition(
      teePadMarkers[holeNumber - 1],
      basketMarkers[holeNumber - 1],
      mapRef
    );
  };

  const navigateHoles = (type) => {
    switch (type) {
      case "next":
        if (currentHole === 18) return;
        setCurrentHole((prev) => (prev += 1));
        return goToNextHole(currentHole + 1);
      case "prev":
        if (currentHole === 1) return;
        setCurrentHole((prev) => (prev -= 1));
        return goToNextHole(currentHole - 1);
      default:
        return;
    }
  };

  useEffect(() => {
    dispatch(getTeepadsByCourseId(courseId));
  }, [dispatch, courseId]);

  useEffect(() => {
    dispatch(getCourseById(courseId));
    return () => dispatch(clearCurrentCourse);
  }, [dispatch, courseId]);

  if (!course.id) return <LoadingSpinner />;

  return (
    <div className="course-details__container">
      <Map
        ref={mapRef}
        onClick={(map) =>
          console.log(`lat=${map.lngLat.lat}, lng=${map.lngLat.lng}`)
        }
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        initialViewState={initalView}
        mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
      >
        <GeolocateControl
          position="top-left"
          trackUserLocation="true"
          positionOptions={{ enableHighAccuracy: true }}
        />
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
              style={{ width: "40px", height: "40px" }}
              src="https://res.cloudinary.com/dmkyocbqi/image/upload/v1696387602/disk_golf_in_gautier_mississippi_tkv6d4.png"
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
        <TextOverlay basket={teepads[currentHole - 1].baskets[0]} />
      </Map>
      <div className="course-details__options-container">
        <div className="course-details__score">
          <h1>Scores will be kept here</h1>
        </div>
        <div className="course-details__next-prev">
          <button onClick={() => navigateHoles("prev")}>Prev</button>
          <button onClick={() => navigateHoles("next")}>Next</button>
        </div>
        <div className="course-details__navigation">
          {teepads.map((teepad) => (
            <button
              key={teepad.id}
              onClick={() => goToNextHole(teepad.holeNumber)}
            >
              {teepad.holeNumber}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
