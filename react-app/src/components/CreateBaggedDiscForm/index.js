import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createBaggedDisc } from "../../store/baggedDiscs";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import toast from "react-hot-toast";

import "./CreateBaggedDiscForm.css";

const CreateBaggedDiscForm = ({ disc, bagId, closeMenu, setBagId }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [weight, setWeight] = useState("");
  const [color, setColor] = useState("#000000");
  const [plastic, setPlastic] = useState("");
  const [image_url, setImageUrl] = useState("");
  const { closeModal } = useModal();

  const handleToast = (t) => {
    history.push(`/bags/${bagId}`);
    toast.dismiss(t.id);
    closeModal();
  };
  const toastAlert = () =>
    toast((t) => (
      <div className="toast-alert">
        <h3>Succesfully added to your bag!</h3>
        <div>
          <button onClick={() => handleToast(t)}>Go to bag</button>
          <button onClick={() => toast.dismiss(t.id)}>Dismiss</button>
        </div>
      </div>
    ));

  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("weight", weight);
    formData.append("color", color);
    formData.append("plastic", plastic);
    formData.append("image_url", image_url);

    const data = await dispatch(createBaggedDisc(formData, bagId, disc.id));
    if (data) {
      setErrors(data);
    } else {
      closeMenu();
      setColor("#000000");
      setPlastic("");
      setWeight("");
      setBagId("");
      toastAlert();
    }
  };

  return (
    <div className="create_bagged_disc__container">
      <h1>Add details</h1>
      <form
        className="create_bagged_disc__main"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <label htmlFor="weight">Weight</label>
        <input
          id="weight"
          required
          placeholder="In grams"
          value={weight}
          min={100}
          max={200}
          onChange={(e) => setWeight(e.target.value)}
          type="number"
        />

        {errors.weight && <p className="errors">{errors.weight}</p>}
        <div className="create_bagged_disc__color">
          <label htmlFor="color">Color: </label>
          <input
            id="color"
            required
            type="color"
            value={color}
            placeholder="Color"
            onChange={(e) => setColor(e.target.value)}
          />
        </div>
        {errors.color && <p className="errors">{errors.color}</p>}
        <label htmlFor="plastic">Plastic</label>
        <select
          id="plastic"
          value={plastic}
          required
          onChange={(e) => setPlastic(e.target.value)}
        >
          <option defaultChecked value="">
            Select plastic type...
          </option>
          {disc.plastics?.split(", ").map((plastic) => (
            <option key={plastic} value={plastic}>
              {plastic}
            </option>
          ))}
        </select>
        {errors.plastic && <p className="errors">{errors.plastic}</p>}
        <label htmlFor="image">Image</label>
        <input
          id="image"
          type="file"
          accept="image/*"
          onChange={(e) => setImageUrl(e.target.files[0])}
        />
        {errors.image_url && <p className="errors">{errors.image_url}</p>}
        <button>Add</button>
      </form>
    </div>
  );
};

export default CreateBaggedDiscForm;
