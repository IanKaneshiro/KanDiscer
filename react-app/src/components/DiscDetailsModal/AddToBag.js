import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./AddToBag.css";
import CreateBaggedDiscForm from "../CreateBaggedDiscForm";
import { currentDisc, getDiscById } from "../../store/discs";

function AddToBag({ discId, bagId, setBagId }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const disc = useSelector(currentDisc);
  const divRef = useRef();

  useEffect(() => {
    dispatch(getDiscById(discId));
  }, [dispatch, discId]);

  const openMenu = (e) => {
    if (showMenu || !bagId) {
      alert("Please select a bag");
      return;
    }
    setShowMenu(true);
    e.stopPropagation();
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!divRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const divClassName = "discs-add-bag__dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <div className="add-to-bag__container">
      <button onClick={openMenu}>Add to Bag</button>
      <div className={divClassName} ref={divRef}>
        <CreateBaggedDiscForm
          closeMenu={closeMenu}
          disc={disc}
          bagId={bagId}
          setBagId={setBagId}
        />
      </div>
    </div>
  );
}

export default AddToBag;
