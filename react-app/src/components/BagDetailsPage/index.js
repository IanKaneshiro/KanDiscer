import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCurrentBag, getBagById } from "../../store/bags";
import {
  getAllBaggedDiscs,
  clearBaggedDiscs,
  selectDistance,
  selectFairway,
  selectMidrange,
  selectPutter,
  selectAllBaggedDiscs,
} from "../../store/baggedDiscs";
import BaggedType from "../BaggedType";
import BagFlightChart from "../BagFlightChart";
import { useParams } from "react-router-dom";
import "./BagDetailsPage.css";

const BagDetailsPage = () => {
  const dispatch = useDispatch();

  const allDiscs = useSelector(selectAllBaggedDiscs);
  const distance = useSelector(selectDistance);
  const fairway = useSelector(selectFairway);
  const midrange = useSelector(selectMidrange);
  const putter = useSelector(selectPutter);

  const { bagId } = useParams();

  useEffect(() => {
    dispatch(getAllBaggedDiscs(bagId));

    return () => dispatch(clearBaggedDiscs());
  }, [dispatch, bagId]);

  useEffect(() => {
    dispatch(getBagById(bagId));

    return () => dispatch(clearCurrentBag());
  }, [dispatch, bagId]);

  return (
    <div className="bags__container">
      <div className="bags__main">
        <div className="bags__in_bag">
          <BaggedType type={"Distance"} discs={distance} />
          <BaggedType type={"Fairway"} discs={fairway} />
          <BaggedType type={"Midrange"} discs={midrange} />
          <BaggedType type={"Putter"} discs={putter} />
        </div>
        <div className="bags__flight_chart">
          <BagFlightChart discs={allDiscs} />
        </div>
      </div>
    </div>
  );
};

export default BagDetailsPage;
