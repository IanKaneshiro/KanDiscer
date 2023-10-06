import React, { useState } from "react";
import { useSelector } from "react-redux";
import UserScore from "./UserScore";
import { getScoresByHoleNumber } from "../../store/rounds";
import "./RoundDetails.css";
import ScoreCard from "../ScoreCard";

const RoundDetails = ({ navigateHoles, currentHole, teepads }) => {
  const [showScore, setShowScore] = useState(false);
  const currentHoleScore = useSelector(getScoresByHoleNumber(currentHole));

  const handleShowScore = () => {
    setShowScore(!showScore);
  };

  return (
    <>
      <div className="course-rounds__options-container">
        <div className="course-rounds__next-prev">
          {currentHole === 0 ? (
            <button onClick={() => navigateHoles("next")}>Start</button>
          ) : (
            <div className="course-rounds__main">
              <div className="course-rounds__next-prev">
                <button
                  onClick={() => {
                    navigateHoles("prev");
                    setShowScore(false);
                  }}
                >
                  Prev
                </button>
                <button
                  onClick={() => {
                    setShowScore(false);
                    navigateHoles("next");
                  }}
                >
                  Next
                </button>
              </div>
              {(currentHole === 9 || currentHole === 18) && (
                <div className="course-rounds__view-score">
                  <button onClick={handleShowScore}>Show Score</button>
                </div>
              )}
              {showScore ? (
                <ScoreCard teepads={teepads} currentHole={currentHole} />
              ) : (
                <div className="course-rounds__user-scores">
                  {currentHoleScore.map((data) => (
                    <UserScore
                      data={data}
                      currentHole={currentHole}
                      teepads={teepads}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default RoundDetails;
