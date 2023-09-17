import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./CreateDiscForm.css";
import { useModal } from "../../context/Modal";
import "./CreateDiscForm.css";
import { discTypes, manufactures } from "../../utils/seederData";
import { createNewDisc } from "../../store/discs";

const CreateDiscForm = () => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const sessionUser = useSelector((state) => state.session.user);
  const [manufacture, setManufacture] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [purchase_link, setPurchaseLink] = useState("");
  const [plastics, setPlastics] = useState("");
  const [speed, setSpeed] = useState(0);
  const [glide, setGlide] = useState(0);
  const [turn, setTurn] = useState(null);
  const [fade, setFade] = useState(0);
  const [height, setHeight] = useState(0.0);
  const [rim_depth, setRimDepth] = useState(0.0);
  const [rim_width, setRimWidth] = useState(0.0);
  const [image_url, setImageUrl] = useState(0.0);

  const [errors, setErrors] = useState({});

  if (!sessionUser) {
    closeModal();
    return <Redirect to="/signup" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const disc = {
      manufacture,
      name,
      type,
      description,
      purchase_link,
      plastics,
      speed,
      glide,
      turn,
      fade,
      height,
      rim_depth,
      rim_width,
      image_url,
    };
    const data = await dispatch(createNewDisc(disc));
    if (data) {
      setErrors(data);
    } else {
      closeModal();
    }
  };

  return (
    <form className="create_disc__main" onSubmit={handleSubmit}>
      <div class="create_disc__info">
        <select
          required
          value={manufacture}
          onChange={(e) => setManufacture(e.target.value)}
        >
          <option disabled value="">
            Please select a manufacturer...
          </option>
          {manufactures.map((man) => (
            <option key={man} value={man}>
              {man}
            </option>
          ))}
        </select>
        {errors.manufacture && <p>{errors.manufacture}</p>}
        <input
          required
          placeholder="Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && <p>{errors.name}</p>}
        <textarea
          placeholder="Description (Optional)"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {errors.description && <p>{errors.description}</p>}{" "}
        <select required value={type} onChange={(e) => setType(e.target.value)}>
          <option disabled value="">
            Please select a type...
          </option>
          {discTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        {errors.type && <p>{errors.type}</p>}
        <input
          placeholder="Add a link to purchase (Optional)"
          type="text"
          value={purchase_link}
          onChange={(e) => setPurchaseLink(e.target.value)}
        />
        {errors.purchase_link && <p>{errors.purchase_link}</p>}
        <input
          placeholder="Please enter discs plastic types. e.g 'Esp, Ti, Z'"
          type="text"
          value={plastics}
          onChange={(e) => setPlastics(e.target.value)}
          required
        />
        {errors.plastics && <p>{errors.plastics}</p>}
      </div>
      <div class="create_disc__flight">
        <span>
          Speed: {speed} Glide: {glide} Turn: {turn} Fade: {fade}
        </span>
        <input
          placeholder="Speed"
          type="range"
          min="1"
          max="15"
          value={speed}
          onChange={(e) => setSpeed(e.target.value)}
          required
        />
        {errors.speed && <p>{errors.speed}</p>}
        <input
          placeholder="Glide"
          type="range"
          min="1"
          max="7"
          value={glide}
          onChange={(e) => setGlide(e.target.value)}
          required
        />
        {errors.glide && <p>{errors.glide}</p>}
        <input
          placeholder="Turn"
          type="range"
          min="-5"
          max="2"
          value={turn}
          onChange={(e) => setTurn(e.target.value)}
          required
        />
        {errors.turn && <p>{errors.turn}</p>}
        <input
          placeholder="Fade"
          type="range"
          min="0"
          max="6"
          value={fade}
          onChange={(e) => setFade(e.target.value)}
          required
        />
        {errors.fade && <p>{errors.fade}</p>}
      </div>
      <div class="create_disc__dimensions">
        <input
          value={height}
          type="number"
          placeholder="Height"
          onChange={(e) => setHeight(e.target.value)}
        />
        {errors.height && <p>{errors.height}</p>}
        <input
          value={rim_depth}
          type="number"
          placeholder="Rim depth"
          onChange={(e) => setRimDepth(e.target.value)}
        />
        {errors.rim_depth && <p>{errors.rim_depth}</p>}{" "}
        <input
          value={rim_width}
          type="number"
          placeholder="Rim width"
          onChange={(e) => setRimWidth(e.target.value)}
        />
        {errors.rim_width && <p>{errors.rim_width}</p>}{" "}
        <input
          value={image_url}
          type="text"
          placeholder="Image Url"
          onChange={(e) => setImageUrl(e.target.value)}
        />
        {errors.image_url && <p>{errors.image_url}</p>}
      </div>
      <button type="submit">
        {sessionUser.admin ? "Create Disc" : "Request Disc"}
      </button>
    </form>
  );
};

export default CreateDiscForm;
