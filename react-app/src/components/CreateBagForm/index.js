import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { createNewBag } from "../../store/bags";
import "./CreateBagForm.css";

const CreateBagForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
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
    if (data.errors) {
      setErrors(data);
    } else {
      closeModal();
      return history.push(`/bags/${data.id}`);
    }
  };

  return (
    <form className="create_bag__main" onSubmit={handleSubmit}>
      <h1>Add New Bag</h1>
      <label for="name">Name</label>
      <input
        id="name"
        value={name}
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        type="text"
        required
      />
      {errors.name && <p className="errors">{errors.name}</p>}
      <label for="description">Description</label>
      <textarea
        id="description"
        value={description}
        placeholder="Add some details about your bag"
        onChange={(e) => setDescription(e.target.value)}
        type="text"
      />
      {errors.description && <p className="errors">{errors.description}</p>}
      <label for="notes">Notes</label>
      <textarea
        id="notes"
        value={notes}
        placeholder="Add notes about your bag"
        onChange={(e) => setNotes(e.target.value)}
        type="text"
      />
      {errors.notes && <p className="errors">{errors.notes}</p>}
      <button>Create</button>
    </form>
  );
};

export default CreateBagForm;
