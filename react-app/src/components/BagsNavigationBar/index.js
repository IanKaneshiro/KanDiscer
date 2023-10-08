import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, useHistory } from "react-router-dom";
import {
  getAllBags,
  bags,
  clearAllBags,
  getBagById,
  clearCurrentBag,
} from "../../store/bags";
import OpenModalButton from "../OpenModalButton";
import CreateBagForm from "../CreateBagForm";
import BagDetailsPage from "../BagDetailsPage";
import { selectCurrentBag, deleteBag } from "../../store/bags";
import BagUpdateForm from "../BagUpdateForm";
import { useModal } from "../../context/Modal";
import DeleteModal from "../DeleteModal";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import "./BagsNavigationBar.css";

const BagsNavigationBar = () => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const allBags = useSelector(bags);
  const history = useHistory();
  const bag = useSelector(selectCurrentBag);
  const sessionUser = useSelector((state) => state.session.user);

  const [currentId, setCurrentId] = useState("");

  useEffect(() => {
    dispatch(getAllBags());
    return () => dispatch(clearAllBags());
  }, [dispatch]);

  const setBag = (id) => {
    if (id) {
      dispatch(getBagById(id));
      setCurrentId(id);
      return history.push(`/bags/${id}`);
    } else {
      setCurrentId("");
      dispatch(clearCurrentBag());
      return history.push("/bags");
    }
  };

  const handleDelete = () => {
    dispatch(deleteBag(bag.id));
    closeModal();
    return history.push("/bags");
  };

  if (bag.id && bag.ownerId !== sessionUser.id) {
    return <Redirect to="/bags" />;
  }
  return (
    <div className="bags-navigation__container">
      <div className="bags-navigation__navbar">
        <OpenModalButton
          buttonText={"Add a new bag"}
          modalComponent={<CreateBagForm />}
        />
        <select value={currentId} onChange={(e) => setBag(e.target.value)}>
          <option value="">Select your bag...</option>
          {allBags.map((bag) => (
            <option key={bag.id} value={bag.id}>
              {bag.name}
            </option>
          ))}
        </select>
        {bag.id && (
          <>
            <OpenModalButton
              buttonText={"Details"}
              modalComponent={<BagUpdateForm bagId={bag.id} />}
            />
            <OpenModalButton
              buttonText={"Delete"}
              modalComponent={
                <DeleteModal value={bag} handleDelete={handleDelete} />
              }
            />
          </>
        )}
      </div>
      <Route path="/bags/:bagId">
        <BagDetailsPage />
      </Route>
    </div>
  );
};

export default BagsNavigationBar;
