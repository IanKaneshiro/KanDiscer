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

  const handleToast = () => {
    history.push(`/bags/${bagId}`);
    closeModal();
  };
  const toastAlert = () =>
    toast((t) => (
      <div className="toast-alert">
        <h3>Succesfully added to your bag!</h3>
        <div>
          <button onClick={handleToast}>Go to bag</button>
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
      setBagId("");
      setColor("");
      setImageUrl("");
      setPlastic("");
      setWeight("");
      toastAlert();
      // alert("Succesfully added to your bag");
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
        <input
          required
          placeholder="Weight (Grams)"
          value={weight}
          min={100}
          max={200}
          onChange={(e) => setWeight(e.target.value)}
          type="number"
        />

        {errors.weight && <p className="errors">{errors.weight}</p>}
        <div className="create_bagged_disc__color">
          <label for="color">Color: </label>
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
        <select
          value={plastic}
          required
          onChange={(e) => setPlastic(e.target.value)}
        >
          <option defaultChecked value="">
            Select plastic type...
          </option>
          {disc.plastics?.split(", ").map((plastic) => (
            <option value={plastic}>{plastic}</option>
          ))}
        </select>
        {errors.plastic && <p className="errors">{errors.plastic}</p>}
        <input
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
