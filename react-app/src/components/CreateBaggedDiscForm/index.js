import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createBaggedDisc } from "../../store/baggedDiscs";
import "./CreateBaggedDiscForm.css";

const CreateBaggedDiscForm = ({ disc, bagId, closeMenu }) => {
  const dispatch = useDispatch();
  const [weight, setWeight] = useState(0);
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
    }
  };

  return (
    <>
      <h1>Add details (Optional)</h1>
      <form className="create_bagged_disc__main" onSubmit={handleSubmit}>
        <input
          placeholder="Weight (Optional)"
          onChange={(e) => setWeight(e.target.value)}
          type="number"
        />
        {errors.weight && <p className="errors">{errors.weight}</p>}
        <input
          required
          type="color"
          value={color}
          placeholder="Color"
          onChange={(e) => setColor(e.target.value)}
        />
        {errors.color && <p className="errors">{errors.color}</p>}
        <select required onChange={(e) => setPlastic(e.target.value)}>
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
    </>
  );
};

export default CreateBaggedDiscForm;
