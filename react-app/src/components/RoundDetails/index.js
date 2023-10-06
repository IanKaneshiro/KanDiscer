import React from "react";
import { useSelector } from "react-redux";
import UserScore from "./UserScore";
import { getScoresByHoleNumber } from "../../store/rounds";
import "./RoundDetails.css";

const RoundDetails = ({ navigateHoles, currentHole, teepads }) => {
  const currentHoleScore = useSelector(getScoresByHoleNumber(currentHole));

  return (
    <>
      <div className="course-rounds__options-container">
        <div className="course-rounds__next-prev">
          {currentHole === 0 ? (
            <button onClick={() => navigateHoles("next")}>Start</button>
          ) : (
            <div className="course-rounds__main">
              <div className="course-rounds__next-prev">
                <button onClick={() => navigateHoles("prev")}>Prev</button>
                <button onClick={() => navigateHoles("next")}>Next</button>
              </div>
              <div className="course-rounds__user-scores">
                {currentHoleScore.map((data) => (
                  <UserScore
                    data={data}
                    currentHole={currentHole}
                    teepads={teepads}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default RoundDetails;
