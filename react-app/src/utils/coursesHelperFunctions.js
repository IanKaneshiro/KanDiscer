// Dynamically generates the Source info for each MapBox layer
const createGeoJSONFeature = (coordinates) => {
  return {
    type: "Feature",
    properties: {},
    geometry: {
      type: "LineString",
      coordinates,
    },
  };
};

// Calculates the bearing so the line between the teepad and basket are always straight vertical on screen
const calculateBearing = (startLat, startLng, endLat, endLng) => {
  const startLatRad = (Math.PI * startLat) / 180;
  const endLatRad = (Math.PI * endLat) / 180;
  const deltaLng = (Math.PI * (endLng - startLng)) / 180;

  const y = Math.sin(deltaLng) * Math.cos(endLatRad);
  const x =
    Math.cos(startLatRad) * Math.sin(endLatRad) -
    Math.sin(startLatRad) * Math.cos(endLatRad) * Math.cos(deltaLng);

  let bearing = Math.atan2(y, x);
  bearing = (bearing * 180) / Math.PI;
  bearing = (bearing + 360) % 360;

  return bearing;
};

// Can be called to reposition map based on a hole position
export const zoomToHolePosition = (teePad, basket, mapRef) => {
  const bbox = [
    [teePad.lng, teePad.lat],
    [basket.lng, basket.lat],
  ];
  const bearing = calculateBearing(
    teePad.lat,
    teePad.lng,
    basket.lat,
    basket.lng
  );
  mapRef.current?.fitBounds(bbox, {
    padding: 100,
    bearing: bearing,
    duration: 2000,
    curve: 2,
  });
};

export const calculateLines = (positions) => {
  return positions.map((line) =>
    createGeoJSONFeature(line.map((point) => [point.lng, point.lat]))
  );
};
