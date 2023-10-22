import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
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
  const [lat, setLat] = useState(37.80221709927471);
  const [lng, setLng] = useState(-100.47483245550866);
  const [headline, setHeadline] = useState("");
  const [description, setDescription] = useState("");
  const [course_contact, setCourseContact] = useState("");
  const [course_website, setCourseWebsite] = useState("");
  const [year_established, setYearEstablished] = useState("");
  const [hole_count, setHoleCount] = useState("");
  const [tee_types, setTeeTypes] = useState("");
  const [target_types, setTargetTypes] = useState("");
  const [services, setServices] = useState("");
  const [cost, setCost] = useState("");

  const [errors, setErrors] = useState([]);

  if (!sessionUser) return <Redirect to="/" />;

  function extractCityAndState(address) {
    const regex = /([A-Za-z\s]+),\s([A-Za-z\s]+)/;
    const match = address.match(regex);

    if (match) {
      const city = match[1];
      const state = match[2];
      return `${city}, ${state}`;
    }
  }

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
      services,
      cost,
    };

    const data = await dispatch(createNewCourse(course));
    if (data.errors) {
      setErrors(data);
    } else {
      if (!data.approved) {
        return history.push("/courses");
      }
      return history.push(`/courses/${data.id}`);
    }
  };

  return (
    <div className="create-course__container">
      <div style={{ width: "100%", height: "400px" }}>
        <Map
          ref={mapRef}
          mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          // onClick={(e) => console.log(e.lngLat)}
          initialViewState={{
            longitude: -100.47483245550866,
            latitude: 37.80221709927471,
            zoom: 2,
          }}
          mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
        >
          <div className="text-overlay-create-course">
            <p>Latitude: {lat}</p>
            <p>Longitude: {lng}</p>
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
                console.log(e);
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
      </div>
      <form className="create-course__form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="locationName">Location</label>
          <input
            id="locationName"
            type="text"
            placeholder="Location (Auto filled from map)"
            value={location_name}
            required
            disabled
          />
          {errors.location_name && (
            <p className="errors">{errors.location_name}</p>
          )}
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
            placeholder="Headline"
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            required
          />
          {errors.headline && <p className="errors">{errors.headline}</p>}
          <label htmlFor="description">Description</label>
          <textarea
            style={{ width: "100%", height: "100px" }}
            id="description"
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          {errors.description && <p className="errors">{errors.description}</p>}
          <label htmlFor="courseContact">Course Contact</label>
          <input
            id="courseContact"
            type="text"
            placeholder="Course Contact"
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
            placeholder="Hole Count"
            value={hole_count}
            onChange={(e) => setHoleCount(e.target.value)}
            required
          />
          {errors.hole_count && <p className="errors">{errors.hole_count}</p>}
          <label htmlFor="teeTypes">Tee Types</label>
          <input
            id="teeTypes"
            type="text"
            placeholder="Tee Types"
            value={tee_types}
            onChange={(e) => setTeeTypes(e.target.value)}
            required
          />
          {errors.tee_types && <p className="errors">{errors.tee_types}</p>}
          <label htmlFor="targetTypes">Target Types</label>
          <input
            id="targetTypes"
            type="text"
            placeholder="Target Types"
            value={target_types}
            onChange={(e) => setTargetTypes(e.target.value)}
            required
          />
          {errors.target_types && (
            <p className="errors">{errors.target_types}</p>
          )}
          <label htmlFor="services">Services</label>
          <input
            id="services"
            type="text"
            placeholder="services"
            value={services}
            onChange={(e) => setServices(e.target.value)}
            required
          />
          {errors.services && <p className="errors">{errors.services}</p>}
          <label htmlFor="cost">Cost</label>
          <input
            id="cost"
            type="number"
            placeholder="Cost"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            required
          />
          {errors.cost && <p className="errors">{errors.cost}</p>}
        </div>
        <button type="submit">Create Course</button>
      </form>
    </div>
  );
};

export default CreateCoursePage;
