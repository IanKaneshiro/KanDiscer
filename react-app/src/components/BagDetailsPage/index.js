import React, { useEffect, useState } from "react";
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
import { getAllDiscs, allDiscs } from "../../store/discs";
import BaggedType from "../BaggedType";
import BagFlightChart from "../BagFlightChart";
import { useParams } from "react-router-dom";
import "./BagDetailsPage.css";
import AddToBagForm from "../AddToBagForm";

const BagDetailsPage = () => {
  const dispatch = useDispatch();
  const [openMenu, setOpenMenu] = useState(false);

  const discs = useSelector(allDiscs);
  const allBaggedDiscs = useSelector(selectAllBaggedDiscs);

  const distance = useSelector(selectDistance);
  const fairway = useSelector(selectFairway);
  const midrange = useSelector(selectMidrange);
  const putter = useSelector(selectPutter);

  const { bagId } = useParams();

  useEffect(() => {
    dispatch(getAllDiscs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllBaggedDiscs(bagId));

    return () => dispatch(clearBaggedDiscs());
  }, [dispatch, bagId]);

  useEffect(() => {
    dispatch(getBagById(bagId));

    return () => dispatch(clearCurrentBag());
  }, [dispatch, bagId]);

  const addBagFormClassName = openMenu
    ? "bags__add_dropdown"
    : "bags__add_dropdown hidden";

  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <div className="bags__container">
      <div className="bags__main">
        <div className="bags__in_bag">
          <div className="bags__button-div">
            <h2>Add your discs to this bag</h2>
            <button onClick={toggleMenu} className="bags__add-discs-btn">
              {openMenu ? (
                <i className="fa-solid fa-caret-up fa-xl"></i>
              ) : (
                <i className="fa-solid fa-plus fa-xl"></i>
              )}
            </button>
          </div>
          <div className={addBagFormClassName}>
            <AddToBagForm bagId={bagId} discs={discs} toggleMenu={toggleMenu} />
          </div>
          <BaggedType type={"Distance"} discs={distance} />
          <BaggedType type={"Fairway"} discs={fairway} />
          <BaggedType type={"Midrange"} discs={midrange} />
          <BaggedType type={"Putter"} discs={putter} />
        </div>
        <div className="bags__flight_chart">
          <BagFlightChart discs={allBaggedDiscs} />
        </div>
      </div>
    </div>
  );
};

export default BagDetailsPage;
