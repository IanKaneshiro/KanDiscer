// import React, { useState } from "react";
// import Map, { Marker, FullscreenControl, ScaleControl } from "react-map-gl";
// import "./CourseDetails.css";

// const teePad1 = { longitude: -123.1529549384451, latitude: 44.050963068556996 };
// // const basket1 = { lat: 44.05073724174806, lng: -123.15207798763349 };
// // const teePad2 = { lat: 44.05046067372952, lng: -123.15153686522522 };
// // const basket2 = { lat: 44.050449405200894, lng: -123.15038055172724 };

// const CourseDetails = () => {
//   const [initialView, setInitialView] = useState({
//     latitude: 44.05220019334348,
//     longitude: -123.15358982872979,
//     zoom: 16,
//   });

//   return (
//     <div
//       className="course-details__container"
//       style={{ position: "relative", zIndex: "1000000" }}
//     >
//       <Map
//         onClick={(map) => console.log(map.lngLat)}
//         mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
//         initialViewState={initialView}
//         mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
//         padding={20}
//         style={{ position: "absolute" }}
//       >
//         <Marker
//           longitude={teePad1.longitude}
//           latitude={teePad1.latitude}
//           offsetLeft={-20} // Adjust this value to move the marker horizontally
//           offsetTop={-40} // Adjust this value to move the marker vertically
//         >
//           <div style={{ fontSize: 24, color: "red" }}>Marker</div>
//         </Marker>
//       </Map>
//     </div>
//   );
// };

// export default CourseDetails;

import React, { useState, useEffect, useRef } from "react";
import mapboxgl, { Marker } from "mapbox-gl";
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

const CourseDetails = () => {
  const map = useRef(null);
  const mapContainer = useRef(null);
  const [lng, setLng] = useState(-123.15358982872979);
  const [lat, setLat] = useState(44.05220019334348);
  const [zoom, setZoom] = useState(16);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/satellite-streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });

    // Create and add the marker here
    const marker = new Marker().addTo(map.current);

    function updateMarker() {
      const center = map.current.getCenter();
      marker.setLngLat([center.lng, center.lat]);
    }

    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
    updateMarker();
  }, [lat, lng, zoom]); // Empty dependency array ensures this runs once when the component mounts

  return (
    <div>
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div
        style={{ height: "300px" }}
        ref={mapContainer}
        className="map-container"
      />
    </div>
  );
};

export default CourseDetails;
