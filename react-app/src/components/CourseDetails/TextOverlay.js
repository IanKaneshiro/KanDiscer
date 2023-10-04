import React from "react";

const TextOverlay = ({ basket }) => {
  return (
    <div className="text-overlay">
      <h4>Hole: {basket.holeNumber}</h4>
      <p>Distance: {basket.distance}</p>
      <p>Par: {basket.par}</p>
    </div>
  );
};

export default TextOverlay;
