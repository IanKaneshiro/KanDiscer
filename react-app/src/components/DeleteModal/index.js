import React from "react";
import { useModal } from "../../context/Modal";
import "./DeleteModal.css";

const DeleteModal = ({ value, handleDelete }) => {
  const { closeModal } = useModal();
  return (
    <div>
      <h1>Delete {value.name}</h1>
      <button onClick={handleDelete}>Confirm</button>
      <button onClick={closeModal}>Cancel</button>
    </div>
  );
};

export default DeleteModal;
