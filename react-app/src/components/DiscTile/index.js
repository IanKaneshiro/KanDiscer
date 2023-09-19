import React from "react";
import "./DiscTile.css";

const DiscTile = ({ disc }) => {
  return (
    <div className="disc_detail__container">
      <div className="disc_detail__header">{disc.name}</div>
      <div className="disc_detail__body">{disc.height}</div>
    </div>
  );
};

export default DiscTile;
