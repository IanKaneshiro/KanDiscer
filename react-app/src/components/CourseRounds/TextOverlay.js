import React from "react";

const TextOverlay = ({ basket }) => {
  return (
    <div className="text-overlay">
      {basket ? (
        <>
          <h4>Hole: {basket?.holeNumber}</h4>
          <p>Distance: {basket?.distance}</p>
          <p>Par: {basket?.par}</p>
        </>
      ) : (
        <h4>Press Start to begin round</h4>
      )}
    </div>
  );
};

export default TextOverlay;
