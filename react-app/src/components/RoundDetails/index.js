import React from "react";

import "./RoundDetails.css";

const RoundDetails = ({ basket, navigateHoles, currentHole }) => {
  return (
    <>
      <div className="course-rounds__options-container">
        <div className="course-rounds__next-prev">
          {currentHole === 0 ? (
            <button onClick={() => navigateHoles("next")}>Start</button>
          ) : (
            <>
              <button onClick={() => navigateHoles("prev")}>Prev</button>
              <button onClick={() => navigateHoles("next")}>Next</button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default RoundDetails;
