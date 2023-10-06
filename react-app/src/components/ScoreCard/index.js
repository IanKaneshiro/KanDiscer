import React from "react";
import { useSelector } from "react-redux";
import { selectPlayers } from "../../store/rounds";
import "./ScoreCard.css";

const ScoreCard = ({ teepads, currentHole }) => {
  const players = useSelector(selectPlayers);
  const holes18 = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
  ];
  const holes9 = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const coursePar = teepads.reduce((acc, val) => {
    if (val.holeNumber <= currentHole) {
      return acc + val.baskets[0].par;
    }
    return acc;
  }, 0);

  const calculateTotal = (player) => {
    const playersScore = Object.entries(player.scores).reduce(
      (acc, [hole, score]) => {
        if (parseInt(hole) <= currentHole) {
          if (!score) return acc + teepads[hole - 1].baskets[0].par;
          return acc + score;
        }
        return acc;
      },
      0
    );
    const score = playersScore - coursePar;
    if (score > 0) return `+${score}`;
    if (score < 0) return `${score}`;
    return "E";
  };

  return (
    <div className="score-card__container">
      <table className="score-card__table">
        <thead>
          <tr>
            <th>Player</th>
            {currentHole <= 9
              ? holes9.map((hole, index) => (
                  <th key={index}>Hole {index + 1}</th>
                ))
              : holes18.map((hole, index) => (
                  <th key={index}>Hole {index + 1}</th>
                ))}
            <th>Total Score</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={player.id}>
              <td className="player-name">{player.name}</td>
              {currentHole <= 9
                ? holes9.map((hole, index) => (
                    <td key={index} className="score-cell">
                      {player.scores[hole]}
                    </td>
                  ))
                : holes18.map((hole, index) => (
                    <td key={index} className="score-cell">
                      {player.scores[hole]}
                    </td>
                  ))}
              <td className="total-cell">{calculateTotal(player)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScoreCard;
