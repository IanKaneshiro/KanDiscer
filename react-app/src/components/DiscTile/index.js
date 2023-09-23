import React from "react";
import "./DiscTile.css";

const DiscTile = ({ disc }) => {
  return (
    <div className="disc_detail__container">
      <div className="disc_detail__header">
        <h3>
          {disc.manufacturer} {disc.name}
        </h3>
      </div>
      <div className="disc_detail__body">
        <p>{disc.type}</p>

        <table className="disc_tile__flight">
          <thead>
            <tr>
              <th>Speed</th>
              <th>Glide</th>
              <th>Turn</th>
              <th>Fade</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{disc.speed}</td>
              <td>{disc.glide}</td>
              <td>{disc.turn}</td>
              <td>{disc.fade}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DiscTile;
