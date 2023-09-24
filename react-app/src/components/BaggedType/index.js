import React from "react";
import BaggedTypeTile from "../BaggedTypeTile";
import "./BaggedType.css";

const BaggedType = ({ discs, type }) => {
  return (
    <div className="bagged-type__container">
      <h1>{type}</h1>
      <div className="bagged-type__discs">
        {discs.map((disc) => (
          <BaggedTypeTile disc={disc} />
        ))}
      </div>
    </div>
  );
};

export default BaggedType;
