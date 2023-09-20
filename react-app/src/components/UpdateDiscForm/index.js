import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { discTypes, manufactures } from "../../utils/seederData";
import { updateDisc } from "../../store/discs";

const UpdateDiscModal = ({ disc, approve }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const sessionUser = useSelector((state) => state.session.user);
  const [manufacturer, setManufacture] = useState(disc?.manufacturer);
  const [name, setName] = useState(disc?.name);
  const [type, setType] = useState(disc?.type);
  const [description, setDescription] = useState(disc?.description);
  const [purchase_link, setPurchaseLink] = useState(disc?.purchaseLink);
  const [plastics, setPlastics] = useState(disc?.plastics);
  const [speed, setSpeed] = useState(disc?.speed);
  const [glide, setGlide] = useState(disc?.glide);
  const [turn, setTurn] = useState(disc?.turn);
  const [fade, setFade] = useState(disc?.fade);
  const [height, setHeight] = useState(disc?.height);
  const [rim_depth, setRimDepth] = useState(disc?.rimDepth);
  const [rim_width, setRimWidth] = useState(disc?.rimWidth);
  const [image_url, setImageUrl] = useState(disc?.imageUrl);

  const [errors, setErrors] = useState({});

  if (!sessionUser) {
    closeModal();
    return <Redirect to="/login" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedDisc = {
      manufacturer,
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
    const data = await dispatch(updateDisc(updatedDisc, disc.id, approve));
    if (data) {
      setErrors(data);
    } else {
      closeModal();
    }
  };

  return (
    <form className="create_disc__main" onSubmit={handleSubmit}>
      <div className="create_disc__info">
        <select
          required
          value={manufacturer}
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
        {errors.manufacturer && <p>{errors.manufacturer}</p>}
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
      <button type="submit">{approve ? "Approve" : "Save Changes"}</button>
    </form>
  );
};

export default UpdateDiscModal;
