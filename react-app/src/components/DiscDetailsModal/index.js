import React from "react";
import "./DiscDetailsModal.css";

const DiscDetailsModal = ({ disc }) => {
  return (
    <main className="disc_details__main">
      <section className="disc_details__left">
        <h1>{disc.name}</h1>
        <ul>
          <li>Speed: {disc.speed}</li>
          <li>Glid: {disc.glide}</li>
          <li>Turn: {disc.turn}</li>
          <li>Fade: {disc.fade}</li>
        </ul>
      </section>
      <section className="disc_details__right">
        <p>FLIGHT CHART</p>
      </section>
    </main>
  );
};

export default DiscDetailsModal;
