import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  updateBagDisc,
  getBaggedDiscById,
  clearCurrentBaggedDisc,
} from "../../store/baggedDiscs";
import { useModal } from "../../context/Modal";
import "./UpdateBaggedDiscForm.css";

const UpdateBaggedDiscForm = ({ disc }) => {
  const dispatch = useDispatch();
  const [weight, setWeight] = useState(disc.weight);
  const [color, setColor] = useState(disc.color);
  const [plastic, setPlastic] = useState(disc.plastic);
  const [image_url, setImageUrl] = useState("");
  const { closeModal } = useModal();

  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getBaggedDiscById(disc.id));
    return () => dispatch(clearCurrentBaggedDisc());
  }, [dispatch, disc]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("weight", weight);
    formData.append("color", color);
    formData.append("plastic", plastic);
    formData.append("image_url", image_url);

    const data = await dispatch(updateBagDisc(formData, disc.id));
    if (data) {
      setErrors(data);
    } else {
      closeModal();
    }
  };

  if (!disc) return <h1>Loading...</h1>;

  return (
    <div className="update_bagged_disc__container">
      <h1>Update Disc</h1>
      <form
        className="update_bagged_disc__main"
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
        <div className="update_bagged_disc__color">
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
          {disc?.info?.plastics.split(", ").map((plastic) => (
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
        <button>Save changes</button>
      </form>
    </div>
  );
};

export default UpdateBaggedDiscForm;
