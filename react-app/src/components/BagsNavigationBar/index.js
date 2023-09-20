import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllBags,
  bags,
  getBagById,
  selectCurrentBag,
} from "../../store/bags";
import BagsLandingPage from "../BagsLandingPage";
import OpenModalButton from "../OpenModalButton";
import CreateBagForm from "../CreateBagForm";
import "./BagsNavigationBar.css";
import { clearBaggedDiscs } from "../../store/baggedDiscs";

const BagsNavigationBar = () => {
  const dispatch = useDispatch();
  const allBags = useSelector(bags);
  const currentBag = useSelector(selectCurrentBag);
  const [currentBagId, setCurrentBagId] = useState(0);

  useEffect(() => {
    dispatch(getAllBags());
  }, [dispatch]);

  const getCurrentBag = (id) => {
    dispatch(getBagById(id));
    setCurrentBagId(id);
  };

  return (
    <div>
      <OpenModalButton
        buttonText={"Add a new bag"}
        modalComponent={<CreateBagForm />}
      />
      <select
        value={currentBagId}
        onChange={(e) => getCurrentBag(Number(e.target.value))}
      >
        <option value="">Select your bag</option>
        {allBags.map((bag) => (
          <option value={bag.id}>{bag.name}</option>
        ))}
      </select>
      <BagsLandingPage bag={currentBag} />
    </div>
  );
};

export default BagsNavigationBar;
