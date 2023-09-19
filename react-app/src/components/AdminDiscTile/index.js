import React from "react";
import { useDispatch } from "react-redux";
import "./AdminDiscTile.css";
import OpenModalButton from "../OpenModalButton";
import UpdateDiscModal from "../UpdateDiscForm";
import DeleteModal from "../DeleteModal";
import { deleteDisc } from "../../store/discs";
import { useModal } from "../../context/Modal";

const AdminDiscTile = ({ disc, approve }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDelete = () => {
    dispatch(deleteDisc(disc.id));
    closeModal();
  };

  return (
    <div className="admin-disc__main">
      <h2>{disc.name}</h2>
      <OpenModalButton
        buttonText={approve ? "Review" : "Update"}
        modalComponent={<UpdateDiscModal disc={disc} approve={approve} />}
      />
      <OpenModalButton
        buttonText={"Delete"}
        modalComponent={<DeleteModal disc={disc} handleDelete={handleDelete} />}
      />
    </div>
  );
};

export default AdminDiscTile;
