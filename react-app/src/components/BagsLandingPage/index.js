import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllBaggedDiscs,
  selectAllBaggedDiscs,
  clearBaggedDiscs,
} from "../../store/baggedDiscs";
import "./BagsLandingPage.css";

const BagsLandingPage = ({ bag }) => {
  const dispatch = useDispatch();
  const baggedDiscs = useSelector(selectAllBaggedDiscs);

  useEffect(() => {
    dispatch(getAllBaggedDiscs(bag.id));
    return () => dispatch(clearBaggedDiscs());
  }, [dispatch, bag]);

  return (
    <div className="bags__container">
      <div className="bags__main">
        <div className="bags__in_bag">
          {baggedDiscs.map((disc) => (
            <div>
              <p>{disc.info.name}</p>
              <p>{disc.color}</p>
            </div>
          ))}
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
