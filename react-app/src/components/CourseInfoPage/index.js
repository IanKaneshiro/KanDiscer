import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import {
  getCourseById,
  currentCourse,
  clearCurrentCourse,
} from "../../store/courses";
import "./CourseInfoPage.css";
import OpenModalButton from "../OpenModalButton";
import CreateRoundForm from "../CreateRoundForm";
import LoadingSpinner from "../LoadingSpinner";
import Map from "react-map-gl";

const CourseInfoPage = () => {
  const course = useSelector(currentCourse);
  const sessionUser = useSelector((state) => state.session.user);
  const { courseId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const mapRef = useRef();

  useEffect(() => {
    dispatch(getCourseById(courseId));

    return () => dispatch(clearCurrentCourse());
  }, [dispatch, courseId]);

  if (!course.id) return <LoadingSpinner />;

  return (
    <div className="course-info__container">
      <div className="course-info__header">
        {course.teepads.length ? (
          <>
            <button
              onClick={() => {
                history.push(`/courses/${course.id}/view`);
              }}
            >
              View layout
            </button>
            {sessionUser ? (
              <OpenModalButton
                modalComponent={<CreateRoundForm course={course} />}
                buttonText={"Start Round"}
              />
            ) : null}
          </>
        ) : (
          <p>No layouts yet</p>
        )}
        {sessionUser?.admin || sessionUser?.id === course.owner?.id ? (
          <button onClick={() => history.push(`/courses/${course.id}/update`)}>
            Update
          </button>
        ) : null}
        <h1>{course.name}</h1>
        <h3>
          <i className="fa-solid fa-location-dot fa-sm"></i>{" "}
          {course.locationName}
        </h3>
      </div>
      <div className="course-info__main">
        <div className="course-info__details">
          <h3>About the course</h3>
          <p>
            <i className="fa-solid fa-flag"></i> {course.holeCount} Holes
          </p>
          <p>
            <i className="fa-solid fa-money-bill-1-wave"></i>{" "}
            {course.cost === 0 ? "Free to play" : "$" + course.cost}
          </p>
          <p>
            <i className="fa-solid fa-rug"></i> {course.teeTypes}
          </p>
          <p>
            <i className="fa-solid fa-bullseye"></i> {course.targetTypes}{" "}
            Targets
          </p>
          <p>
            <i className="fa-solid fa-person-digging"></i> Established{" "}
            {course.yearEstablished}
          </p>
        </div>
        <div className="course-info__contact">
          <h3>Contact</h3>
          <p>
            <i className="fa-solid fa-address-card"></i> {course.courseContact}
          </p>
          <a
            style={{ fontWeight: "bold" }}
            href={course.courseWebsite}
            target="__blank"
          >
            <i className="fa-solid fa-globe"></i> {course.courseWebsite}
          </a>
        </div>
        <div style={{ width: "100%", height: "300px" }}>
          <h3>Location</h3>
          <Map
            ref={mapRef}
            mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            initialViewState={{
              longitude: course.lng,
              latitude: course.lat,
              zoom: 15,
            }}
            mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
          ></Map>
        </div>
      </div>
    </div>
  );
};

export default CourseInfoPage;
