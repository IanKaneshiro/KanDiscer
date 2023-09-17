import React from "react";
import "./BagsLandingPage.css";

const BagsLandingPage = () => {
  return (
    <div className="bags__container">
      <input className="bags__search" />
      <div className="bags__main">
        <div className="bags__in_bag">
          <div className="bags__distance"></div>
          <div className="bags__fairway"></div>
          <div className="bags__midrange"></div>
          <div className="bags__putter"></div>
          <button className="bags__add_btn">
            <i className="fa-solid fa-plus fa-2xl"></i>
          </button>
        </div>
        <div className="bags__flight_chart">right</div>
      </div>
    </div>
  );
};

export default BagsLandingPage;
