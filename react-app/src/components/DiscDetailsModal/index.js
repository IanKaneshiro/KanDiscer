import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bags, getAllBags } from "../../store/bags";
import FlightChart from "../FlightChart";
import AddToBag from "./AddToBag";
import "./DiscDetailsModal.css";

const DiscDetailsModal = ({ disc, sessionUser }) => {
  const dispatch = useDispatch();
  const [bagId, setBagId] = useState(null);
  const allBags = useSelector(bags);

  useEffect(() => {
    dispatch(getAllBags());
  }, [dispatch]);

  return (
    <main className="disc_details__main">
      <section className="disc_details__left">
        <div className="disc_details__left-header">
          <h1>{disc.name}</h1>
          {sessionUser && (
            <div className="disc_details__left-header-bag">
              <select value={bagId} onChange={(e) => setBagId(e.target.value)}>
                <option value="">Select your bag...</option>
                {allBags.map((bag) => (
                  <option value={bag.id}>{bag.name}</option>
                ))}
              </select>
              <AddToBag discId={disc.id} bagId={bagId} />
            </div>
          )}
        </div>
        <div className="disc_details__left-img-description">
          <div className="disc_details__left-img">
            <img src={disc.imageUrl} alt={disc.name} />
          </div>
          <div className=".disc_details__left-description">
            <p>{disc.description}</p>
            <a
              style={{ fontWeight: "Bold" }}
              href={disc.purchaseLink}
              rel="noreferrer"
              target="_blank"
            >
              Buy now
            </a>
          </div>
        </div>
        <div className="disc_details__left-table">
          <table className="flight">
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
          <table className="dimensions">
            <thead>
              <tr>
                <th>Height</th>
                <th>Rim Depth</th>
                <th>Rim Width</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{disc.height}cm</td>
                <td>{disc.rimDepth}cm</td>
                <td>{disc.rimWidth}cm</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      <section className="disc_details__right">
        <FlightChart disc={disc} />
      </section>
    </main>
  );
};

export default DiscDetailsModal;
