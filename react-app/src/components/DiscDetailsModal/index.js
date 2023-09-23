import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bags, getAllBags } from "../../store/bags";
import FlightChart from "../FlightChart";
import AddToBag from "./AddToBag";
import "./DiscDetailsModal.css";

const DiscDetailsModal = ({ disc }) => {
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
          <div className="disc_details__left-header-bag">
            <select value={bagId} onChange={(e) => setBagId(e.target.value)}>
              <option value="">Select your bag</option>
              {allBags.map((bag) => (
                <option value={bag.id}>{bag.name}</option>
              ))}
            </select>
            <AddToBag discId={disc.id} bagId={bagId} />
          </div>
        </div>
        <div className="disc_details__left-img">
          <img src={disc.imageUrl} alt={disc.name} />
        </div>
        <table className="disc_details__left-table flight">
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
        <table className="disc_details__left-table dimensions">
          <thead>
            <tr>
              <th>Height</th>
              <th>Rim Depth</th>
              <th>Rim Width</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{disc.height}</td>
              <td>{disc.rimDepth}</td>
              <td>{disc.rimWidth}</td>
            </tr>
          </tbody>
        </table>
      </section>
      <section className="disc_details__right">
        <FlightChart disc={disc} />
      </section>
    </main>
  );
};

export default DiscDetailsModal;
