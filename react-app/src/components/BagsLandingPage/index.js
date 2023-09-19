import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bags, getAllBags } from "../../store/bags";
import "./BagsLandingPage.css";
import BagsTile from "../BagsTile";
import OpenModalButton from "../OpenModalButton";
import CreateBagForm from "../CreateBagForm";

const BagsLandingPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllBags());
  }, [dispatch]);

  const allBags = useSelector(bags);

  return (
    <div className="bags__container">
      <div className="bags__search">
        <input />
        <OpenModalButton
          buttonText={"Add a new bag"}
          modalComponent={<CreateBagForm />}
        />
      </div>
      <div className="bags__main">
        <div className="bags__in_bag">
          <BagsTile allBags={allBags} />
          <BagsTile />
          <BagsTile />
          <BagsTile />
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
