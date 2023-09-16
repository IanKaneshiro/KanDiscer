import React from "react";
import "./DiscTile.css";

const DiscTile = ({ disc }) => {
  return <div className="disc_detail__container">{disc.name}</div>;
};

export default DiscTile;
