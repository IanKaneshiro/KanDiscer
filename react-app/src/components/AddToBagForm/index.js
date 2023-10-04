import React, { useState, useEffect } from "react";
import "./AddToBagForm.css";
import { useDispatch, useSelector } from "react-redux";
import { createBaggedDisc } from "../../store/baggedDiscs";
import { getDiscById, currentDisc, clearCurrentDisc } from "../../store/discs";

const AddToBagForm = ({ bagId, discs, toggleMenu }) => {
  const dispatch = useDispatch();
  const disc = useSelector(currentDisc);
  const [weight, setWeight] = useState("");
  const [color, setColor] = useState("#000000");
  const [plastic, setPlastic] = useState("");
  const [image_url, setImageUrl] = useState("");
  const [discId, setDiscId] = useState("");

  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getDiscById(discId));

    return () => dispatch(clearCurrentDisc());
  }, [dispatch, discId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("weight", weight);
    if (!color) {
      formData.append("color", "#000000");
    } else {
      formData.append("color", color);
    }
    formData.append("plastic", plastic);
    formData.append("image_url", image_url);

    const data = await dispatch(createBaggedDisc(formData, bagId, disc.id));
    if (data) {
      setErrors(data);
    } else {
      setColor("#000000");
      setImageUrl("");
      setPlastic("");
      setWeight("");
      setDiscId("");
      toggleMenu();
    }
  };

  return (
    <div className="add_bagged_disc__container">
      <h2>Add a disc</h2>
      <form
        className="add_bagged_disc__main"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <select
          value={discId}
          required
          onChange={(e) => setDiscId(e.target.value)}
        >
          <option defaultChecked value="">
            Select a disc...
          </option>
          {discs.map((disc) => (
            <option key={disc.id} value={disc.id}>
              {disc.name}
            </option>
          ))}
        </select>
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
        <div className="add_bagged_disc__color">
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
        <select
          value={plastic}
          required
          onChange={(e) => setPlastic(e.target.value)}
        >
          <option defaultChecked value="">
            Select plastic type...
          </option>
          {disc?.plastics?.split(", ").map((plastic) => (
            <option key={plastic} value={plastic}>
              {plastic}
            </option>
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

export default AddToBagForm;
