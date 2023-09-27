import React from "react";
import { useDispatch } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import DeleteModal from "../DeleteModal";
import { deleteBaggedDisc } from "../../store/baggedDiscs";
import { useModal } from "../../context/Modal";
import "./BaggedTypeTile.css";

const BaggedTypeTile = ({ disc }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDelete = () => {
    dispatch(deleteBaggedDisc(disc.id));
    closeModal();
  };
  return (
    <div className="bagged-type-tile__container">
      <div>
        {disc.imageUrl ? (
          <img src={disc.imageUrl} alt={disc.info.name} />
        ) : (
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              backgroundColor: disc.color,
            }}
          ></div>
        )}
      </div>
      <div>
        <p>{disc.info.manufacturer}</p>
        <p>{disc.info.name}</p>
      </div>
      <div>
        <p>{disc.plastic}</p>
        <p>{`${disc.info.speed} / ${disc.info.glide} / ${disc.info.turn} / ${disc.info.fade}`}</p>
      </div>
      <OpenModalButton
        buttonText={"✖"}
        modalComponent={
          <DeleteModal handleDelete={handleDelete} value={disc.info} />
        }
      />
    </div>
  );
};

export default BaggedTypeTile;
