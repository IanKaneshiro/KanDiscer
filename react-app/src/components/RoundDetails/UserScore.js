import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserScore, getCurrentPlayer } from "../../store/rounds";

const UserScore = ({ data, currentHole, teepads }) => {
  const dispatch = useDispatch();
  const currentPlayer = useSelector(getCurrentPlayer(parseInt(data.id)));
  const par = parseInt(teepads[currentHole - 1].baskets[0].par);

  // Increases user score
  const increaseScore = (id, score, hole) => {
    if (!score) return dispatch(updateUserScore(parseInt(id), par, hole));
    const newScore = score + 1;
    return dispatch(updateUserScore(parseInt(id), newScore, hole));
  };

  // decreases users score
  const decreaseScore = (id, score, hole) => {
    let newScore;
    newScore = score - 1;
    if (score <= 0) newScore = 0;
    if (!score) newScore = par - 1;
    return dispatch(updateUserScore(Number(id), newScore, hole));
  };

  // calculates the par up until the current hole we are on
  const currentPar = teepads.reduce((acc, val) => {
    if (val.holeNumber <= currentHole) {
      return acc + val.baskets[0].par;
    }
    return acc;
  }, 0);

  // Calculates users current score up until current hole
  const currentScore = Object.entries(currentPlayer.scores).reduce(
    (acc, [hole, score]) => {
      if (parseInt(hole) <= currentHole) {
        if (!score) return acc + teepads[hole - 1].baskets[0].par;
        return acc + score;
      }
      return acc;
    },
    0
  );

  // calculates the current score of the player
  const calculateCurrentScore = () => {
    const score = currentScore - currentPar;
    if (!currentScore) return "E";
    if (score > 0) return `+${score}`;
    if (score < 0) return `${score}`;
    return "E";
  };

  return (
    <div className="user-score__container">
      <button onClick={() => decreaseScore(data.id, data.score, currentHole)}>
        -
      </button>
      <h4>{data.name}</h4>
      <p>
        {data.score ? data.score : <i className="fa-solid fa-minus fa-xs"></i>}{" "}
        ({calculateCurrentScore()})
      </p>
      <button onClick={() => increaseScore(data.id, data.score, currentHole)}>
        +
      </button>
    </div>
  );
};

export default UserScore;
