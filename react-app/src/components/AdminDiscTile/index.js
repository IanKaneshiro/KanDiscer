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
      <h3>{disc.name}</h3>
      <div className="admin-disc__edit">
        <OpenModalButton
          buttonText={approve ? "Review" : "Update"}
          modalComponent={<UpdateDiscModal disc={disc} approve={approve} />}
        />
        <OpenModalButton
          buttonText={"Delete"}
          modalComponent={
            <DeleteModal value={disc} handleDelete={handleDelete} />
          }
        />
      </div>
    </div>
  );
};

export default AdminDiscTile;
