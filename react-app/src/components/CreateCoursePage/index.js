import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import toast from "react-hot-toast";
import Map, { Marker } from "react-map-gl";
import { SearchBox } from "@mapbox/search-js-react";
import { createNewCourse } from "../../store/courses";
import "./CreateCoursePage.css";

const CreateCoursePage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const mapRef = useRef();
  const sessionUser = useSelector((state) => state.session.user);

  const [name, setName] = useState("");
  const [location_name, setLocationName] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [headline, setHeadline] = useState("");
  const [description, setDescription] = useState("");
  const [course_contact, setCourseContact] = useState("");
  const [course_website, setCourseWebsite] = useState("");
  const [year_established, setYearEstablished] = useState("");
  const [hole_count, setHoleCount] = useState("");
  const [tee_types, setTeeTypes] = useState("");
  const [target_types, setTargetTypes] = useState("");
  const [cost, setCost] = useState("");

  const [errors, setErrors] = useState({});

  if (!sessionUser) return <Redirect to="/" />;

  const extractCityAndState = (address) => {
    const regex = /([A-Za-z\s]+),\s([A-Za-z\s]+)/;
    const match = address.match(regex);

    if (match) {
      const city = match[1];
      const state = match[2];
      return `${city}, ${state}`;
    }
  };

  const toastAlert = () =>
    toast((t) => (
      <div className="toast-alert">
        {sessionUser.admin ? <h3>Created</h3> : <h3>Submitted for approval</h3>}
      </div>
    ));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const course = {
      name,
      location_name,
      lat,
      lng,
      headline,
      description,
      course_contact,
      course_website,
      year_established,
      hole_count,
      tee_types,
      target_types,
      cost,
    };

    const data = await dispatch(createNewCourse(course));
    if (data.errors) {
      setErrors(data.errors);
    } else {
      toastAlert();
      if (sessionUser.admin) {
        return history.push(`/courses/${data.id}`);
      }
      return history.push("/courses");
    }
  };

  return (
    <div className="create-course__container">
      <form className="create-course__form" onSubmit={handleSubmit}>
        <Map
          style={{ width: "100%", height: "400px" }}
          ref={mapRef}
          mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          initialViewState={{
            longitude: -100.47483245550866,
            latitude: 37.80221709927471,
            zoom: 2,
          }}
          mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
        >
          <div className="text-overlay-create-course">
            <p>Place marker in the parking lot or teepad of hole 1</p>
            <SearchBox
              accessToken={process.env.REACT_APP_MAPBOX_TOKEN}
              map={mapRef?.current}
              popoverOptions={{
                placement: "top-start",
                flip: true,
                offset: 5,
              }}
              marker="true"
              placeholder="Search for Location"
              value=""
              onRetrieve={(e) => {
                const locationName = extractCityAndState(
                  e.features[0].properties.place_formatted
                );
                setLocationName(locationName);
                setLat(e.features[0].geometry.coordinates[1]);
                setLng(e.features[0].geometry.coordinates[0]);
              }}
            />
          </div>
          <Marker
            draggable="true"
            anchor="center"
            latitude={lat}
            longitude={lng}
            onDragEnd={(e) => {
              setLat(e.lngLat.lat);
              setLng(e.lngLat.lng);
            }}
          />
        </Map>
        {errors.location_name && (
          <p className="errors">Please place marker at your course</p>
        )}
        <div className="create-course__form-info">
          <div>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            {errors.name && <p className="errors">{errors.name}</p>}
            <label htmlFor="headline">Headline</label>
            <input
              id="headline"
              type="text"
              placeholder="Summary of course"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              required
            />
            {errors.headline && <p className="errors">{errors.headline}</p>}
            <label htmlFor="description">Description</label>
            <textarea
              style={{ width: "100%", height: "110px" }}
              id="description"
              type="text"
              placeholder="Short description of course"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            {errors.description && (
              <p className="errors">{errors.description}</p>
            )}
            <label htmlFor="courseContact">Course Contact</label>
            <input
              id="courseContact"
              type="text"
              placeholder="Email, phone number..."
              value={course_contact}
              onChange={(e) => setCourseContact(e.target.value)}
              required
            />
            {errors.course_contact && (
              <p className="errors">{errors.course_contact}</p>
            )}
            <label htmlFor="courseWebsite">Course Website</label>
            <input
              id="courseWebsite"
              type="text"
              placeholder="Course Website"
              value={course_website}
              onChange={(e) => setCourseWebsite(e.target.value)}
              required
            />
            {errors.course_website && (
              <p className="errors">{errors.course_website}</p>
            )}
          </div>
          <div>
            <label htmlFor="yearEstablished">Year Established</label>
            <input
              id="yearEstablished"
              type="number"
              placeholder="2005"
              value={year_established}
              onChange={(e) => setYearEstablished(e.target.value)}
              required
            />
            {errors.year_established && (
              <p className="errors">{errors.year_established}</p>
            )}
            <label htmlFor="holeCount">Hole Count</label>
            <input
              id="holeCount"
              type="number"
              placeholder="18"
              value={hole_count}
              onChange={(e) => setHoleCount(e.target.value)}
              required
            />
            {errors.hole_count && <p className="errors">{errors.hole_count}</p>}
            <label htmlFor="teeTypes">Tee Types</label>
            <input
              id="teeTypes"
              type="text"
              placeholder="Concrete, Turf, Pavers.."
              value={tee_types}
              onChange={(e) => setTeeTypes(e.target.value)}
              required
            />
            {errors.tee_types && <p className="errors">{errors.tee_types}</p>}
            <label htmlFor="targetTypes">Target Types</label>
            <input
              id="targetTypes"
              type="text"
              placeholder="Type of baskets"
              value={target_types}
              onChange={(e) => setTargetTypes(e.target.value)}
              required
            />
            {errors.target_types && (
              <p className="errors">{errors.target_types}</p>
            )}
            <label htmlFor="cost">Cost</label>
            <input
              id="cost"
              type="number"
              placeholder="Put 0 if free to play"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              required
            />
            {errors.cost && <p className="errors">{errors.cost}</p>}
          </div>
        </div>
        <button type="submit">Create Course</button>
      </form>
    </div>
  );
};

export default CreateCoursePage;
