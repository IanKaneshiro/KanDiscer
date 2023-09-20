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
import DeleteModal from "../DeleteModal";
import "./BagsNavigationBar.css";
import { Switch, Route } from "react-router-dom";

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
        <option value="">Select your bag...</option>
        {allBags.map((bag) => (
          <option value={bag.id}>{bag.name}</option>
        ))}
      </select>
      {currentBagId !== 0 && (
        <div>
          <OpenModalButton buttonText={"Update"} />
          <OpenModalButton
            modalComponent={<DeleteModal name={currentBag} />}
            buttonText={"Delete"}
          />
        </div>
      )}
      <Switch>
        <Route path="/bags/:bagId">
          <BagsLandingPage bag={currentBag} />
        </Route>
      </Switch>
    </div>
  );
};

export default BagsNavigationBar;
