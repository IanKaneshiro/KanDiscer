import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCurrentBag,
  deleteBag,
  getBagById,
  selectCurrentBag,
} from "../../store/bags";
import {
  getAllBaggedDiscs,
  selectAllBaggedDiscs,
  clearBaggedDiscs,
} from "../../store/baggedDiscs";
import OpenModalButton from "../OpenModalButton";
import DeleteModal from "../DeleteModal";
import BagUpdateForm from "../BagUpdateForm";
import { useParams, useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import "./BagDetailsPage.css";

const BagDetailsPage = () => {
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const baggedDiscs = useSelector(selectAllBaggedDiscs);
  const bag = useSelector(selectCurrentBag);
  const history = useHistory();
  const { bagId } = useParams();

  useEffect(() => {
    dispatch(getAllBaggedDiscs(bagId));

    return () => dispatch(clearBaggedDiscs());
  }, [dispatch, bagId]);

  useEffect(() => {
    dispatch(getBagById(bagId));

    return () => dispatch(clearCurrentBag());
  }, [dispatch, bagId]);

  const handleDelete = () => {
    dispatch(deleteBag(bagId));
    closeModal();
    return history.push("/bags");
  };

  return (
    <div className="bags__container">
      <div>
        <OpenModalButton
          buttonText={"Update"}
          modalComponent={<BagUpdateForm bagId={bagId} />}
        />
        <OpenModalButton
          buttonText={"Delete"}
          modalComponent={
            <DeleteModal value={bag} handleDelete={handleDelete} />
          }
        />
      </div>
      <div className="bags__main">
        <div className="bags__in_bag">
          {baggedDiscs.map((disc) => (
            <div key={disc.id}>
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

export default BagDetailsPage;
