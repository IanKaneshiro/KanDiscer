import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createBaggedDisc } from "../../store/baggedDiscs";
import "./CreateBaggedDiscForm.css";

const CreateBaggedDiscForm = ({ disc, bagId, closeMenu, setBagId }) => {
  const dispatch = useDispatch();
  const [weight, setWeight] = useState("");
  const [color, setColor] = useState("#000000");
  const [plastic, setPlastic] = useState("");
  const [image_url, setImageUrl] = useState("");

  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const baggedDisc = {
      weight,
      color,
      plastic,
      image_url,
    };

    const data = await dispatch(createBaggedDisc(baggedDisc, bagId, disc.id));
    if (data) {
      setErrors(data);
    } else {
      closeMenu();
      setBagId("");
      setColor("");
      setImageUrl("");
      setPlastic("");
      setWeight("");
      alert("Succesfully added to your bag");
    }
  };

  return (
    <div className="create_bagged_disc__container">
      <h1>Add details</h1>
      <form className="create_bagged_disc__main" onSubmit={handleSubmit}>
        <input
          required
          placeholder="Weight (Grams)"
          value={weight}
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
          placeholder="Image Url (Optional)"
          value={image_url}
          onChange={(e) => setImageUrl(e.target.value)}
          type="text"
        />
        {errors.image_url && <p className="errors">{errors.image_url}</p>}
        <button>Add</button>
      </form>
    </div>
  );
};

export default CreateBaggedDiscForm;
