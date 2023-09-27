import React from "react";
import { useModal } from "../../context/Modal";
import "./DeleteModal.css";

const DeleteModal = ({ value, handleDelete }) => {
  const { closeModal } = useModal();
  return (
    <div className="delete-modal__container">
      <h1>Delete {value.name}</h1>
      <div>
        <button className="delete-modal__delete" onClick={handleDelete}>
          Confirm
        </button>
        <button className="delete-modal__cancel" onClick={closeModal}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteModal;
