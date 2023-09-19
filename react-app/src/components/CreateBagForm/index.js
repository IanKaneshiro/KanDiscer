import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { createNewBag } from "../../store/bags";
import "./CreateBagForm.css";

const CreateBagForm = () => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const sessionUser = useSelector((state) => state.session.user);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState("");

  const [errors, setErrors] = useState({});

  if (!sessionUser) {
    closeModal();
    return <Redirect to="/login" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const bag = {
      name,
      description,
      notes,
    };

    const data = await dispatch(createNewBag(bag));
    if (data) {
      setErrors(data);
    } else {
      closeModal();
    }
  };

  return (
    <form className="create_bag__main" onSubmit={handleSubmit}>
      <input
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        type="text"
        required
      />
      {errors.name && <p className="errors">{errors.name}</p>}
      <textarea
        placeholder="Add a description (Optional)"
        onChange={(e) => setDescription(e.target.value)}
        type="text"
      />
      {errors.description && <p className="errors">{errors.description}</p>}
      <textarea
        placeholder="Add notes about your bag (Optional)"
        onChange={(e) => setNotes(e.target.value)}
        type="text"
      />
      {errors.notes && <p className="errors">{errors.notes}</p>}
      <button>Create</button>
    </form>
  );
};

export default CreateBagForm;
