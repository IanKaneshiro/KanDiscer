import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Map, {
  Marker,
  Source,
  Layer,
  NavigationControl,
  FullscreenControl,
  GeolocateControl,
} from "react-map-gl";

import {
  getTeepadsByCourseId,
  getTeepadMarkers,
  getBasketMarkers,
  getDottedLines,
  getHolePositions,
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

const CourseDetails = () => {
  const dispatch = useDispatch();
  const [hole, setHole] = useState(0);
  const { courseId } = useParams();
  const course = useSelector(currentCourse);
  const teePadMarkers = useSelector(getTeepadMarkers);
  const basketMarkers = useSelector(getBasketMarkers);
  const holePositions = useSelector(getHolePositions);
  const dottedLines = useSelector(getDottedLines);
  const basketPositions = calculateLines(holePositions);
  const dottedLineFeatures = calculateLines(dottedLines);
  const mapRef = useRef();

  const initalView = {
    longitude: course.lng,
    latitude: course.lat,
    zoom: 16,
  };

  const goToNextHole = () => {
    if (hole >= teePadMarkers.length) {
      setHole(0);
    }
    zoomToHolePosition(teePadMarkers[hole], basketMarkers[hole], mapRef);
    setHole((prev) => prev + 1);
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
        onClick={(map) => console.log(map.lngLat)}
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        initialViewState={initalView}
        mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
      >
        <FullscreenControl position="top-left" />
        <NavigationControl position="top-left" />
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
