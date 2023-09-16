import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDiscs } from "../../store/discs";
import { allDiscs } from "../../store/discs";
import DiscTile from "../DiscTile";
import OpenModalButton from "../OpenModalButton";
import DiscDetailsModal from "../DiscDetailsModal";
import "./DiscsLandingPage.css";

const DiscsLandingPage = () => {
  const dispatch = useDispatch();
  const discs = useSelector(allDiscs);

  useEffect(() => {
    dispatch(getAllDiscs());
  }, [dispatch]);
  return (
    <div>
      {discs.map((disc) => (
        <OpenModalButton
          className="disc-landing__modal"
          key={disc.id}
          buttonText={<DiscTile disc={disc} />}
          modalComponent={<DiscDetailsModal disc={disc} />}
        />
      ))}
    </div>
  );
};

export default DiscsLandingPage;
