import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, useHistory } from "react-router-dom";
import { getAllBags, bags, clearAllBags } from "../../store/bags";
import OpenModalButton from "../OpenModalButton";
import CreateBagForm from "../CreateBagForm";
import BagDetailsPage from "../BagDetailsPage";
import { selectCurrentBag, deleteBag } from "../../store/bags";
import BagUpdateForm from "../BagUpdateForm";
import { useModal } from "../../context/Modal";
import DeleteModal from "../DeleteModal";
import "./BagsNavigationBar.css";
import LoadingSpinner from "../LoadingSpinner";

const BagsNavigationBar = () => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const allBags = useSelector(bags);
  const history = useHistory();
  const bag = useSelector(selectCurrentBag);
  const [currentId, setCurrentId] = useState("");

  useEffect(() => {
    dispatch(getAllBags());
    return () => dispatch(clearAllBags());
  }, [dispatch]);

  useEffect(() => {
    setCurrentId(bag.id);
  }, [bag]);

  const setBag = (id) => {
    if (id) {
      return history.push(`/bags/${id}`);
    } else {
      setCurrentId("");
      return history.push("/bags");
    }
  };

  const handleDelete = () => {
    dispatch(deleteBag(bag.id));
    closeModal();
    return history.push("/bags");
  };

  if (!allBags) return <LoadingSpinner />;

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
