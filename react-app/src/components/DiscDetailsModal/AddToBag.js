import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import "./AddToBag.css";

function AddToBag({ discId, bagId }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const divRef = useRef();

  const openMenu = (e) => {
    if (showMenu || !bagId) return;
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
    <>
      <button onClick={openMenu}>Add to Bag</button>
      <div className={divClassName} ref={divRef}>
        Hello World
        <button onClick={closeMenu}>Submit</button>
      </div>
    </>
  );
}

export default AddToBag;
