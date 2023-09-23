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
} from "../../store/baggedDiscs";
import BaggedType from "../BaggedType";
import { useParams } from "react-router-dom";
import "./BagDetailsPage.css";

const BagDetailsPage = () => {
  const dispatch = useDispatch();
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

          <button className="bags__add_btn">
            <i className="fa-solid fa-plus fa-2xl"></i>
          </button>
        </div>
        <div className="bags__flight_chart">right</div>
      </div>
    </div>
  );
};

export default BagDetailsPage;
