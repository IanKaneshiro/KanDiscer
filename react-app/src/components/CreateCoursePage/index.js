import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import Map, { Marker } from "react-map-gl";
import { createNewCourse } from "../../store/courses";

const CreateCoursePage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const mapRef = useRef();
  const sessionUser = useSelector((state) => state.session.user);

  const [name, setName] = useState("");
  const [location_name, setLocationName] = useState("");
  const [lat, setLat] = useState(-79.4512);
  const [lng, setLng] = useState(43.6568);
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
      return history.push(`/courses/${data.id}`);
    }
  };

  return (
    <div className="login-page__container">
      <h1>Create Course</h1>
      <div style={{ width: "400px", height: "400px" }}>
        <Map
          ref={mapRef}
          mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          initialViewState={{
            longitude: -79.4512,
            latitude: 43.6568,
            zoom: 13,
          }}
          mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
        >
          {/* <Marker
            draggable="true"
            anchor="center"
            onDragEnd={(e) => {
              setLat(e.lngLat.lat);
              setLng(e.lngLat.lng);
            }}
          /> */}
        </Map>
      </div>
      <form className="login-page__form" onSubmit={handleSubmit}>
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
        <label htmlFor="locationName">Location Name</label>
        <input
          id="locationName"
          type="text"
          placeholder="Location Name"
          value={location_name}
          onChange={(e) => setLocationName(e.target.value)}
          required
        />
        {errors.location_name && (
          <p className="errors">{errors.location_name}</p>
        )}
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
        {errors.target_types && <p className="errors">{errors.target_types}</p>}
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
        <button type="submit">Create Course</button>
      </form>
    </div>
  );
};

export default CreateCoursePage;
