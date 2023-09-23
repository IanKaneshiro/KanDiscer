import React from "react";
import { useModal } from "../../context/Modal";
import "./DeleteModal.css";

const DeleteModal = ({ value, handleDelete }) => {
  const { closeModal } = useModal();
  return (
    <div className="delete-modal__container">
      <h1>Delete {value.name}</h1>
      <div>
        <button
          style={{ backgroundColor: "#ff5a5f", color: "white" }}
          onClick={handleDelete}
        >
          Confirm
        </button>
        <button style={{ backgroundColor: "#a9a9a9" }} onClick={closeModal}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteModal;
