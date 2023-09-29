import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { getBagById, selectCurrentBag, updateBag } from "../../store/bags";

const BagUpdateForm = ({ bagId }) => {
  const dispatch = useDispatch();
  const bag = useSelector(selectCurrentBag);
  const { closeModal } = useModal();
  const [name, setName] = useState(bag.name);
  const [description, setDescription] = useState(bag.description);
  const [notes, setNotes] = useState(bag.notes);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getBagById(bagId));
  }, [dispatch, bagId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const bag = {
      name,
      description,
      notes,
    };

    const data = await dispatch(updateBag(bag, bagId));
    if (data) {
      setErrors(data);
    } else {
      closeModal();
    }
  };

  return (
    <form className="create_bag__main" onSubmit={handleSubmit}>
      <h1>{bag.name} Details</h1>
      <label htmlFor="name">Name</label>
      <input
        id="name"
        value={name}
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        type="text"
        required
      />
      {errors.name && <p className="errors">{errors.name}</p>}
      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        value={description}
        placeholder="Add some details about your bag"
        onChange={(e) => setDescription(e.target.value)}
        type="text"
      />
      {errors.description && <p className="errors">{errors.description}</p>}
      <label htmlFor="notes">Notes</label>
      <textarea
        id="notes"
        value={notes}
        placeholder="Add notes about your bag"
        onChange={(e) => setNotes(e.target.value)}
        type="text"
      />
      {errors.notes && <p className="errors">{errors.notes}</p>}
      <button>Save Changes</button>
    </form>
  );
};

export default BagUpdateForm;
