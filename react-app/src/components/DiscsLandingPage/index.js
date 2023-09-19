import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDiscs } from "../../store/discs";
import { allDiscs } from "../../store/discs";
import DiscTile from "../DiscTile";
import OpenModalDiv from "../OpenModalDiv";
import DiscDetailsModal from "../DiscDetailsModal";
import OpenModalButton from "../OpenModalButton";
import CreateDiscForm from "../CreateDiscForm";
import "./DiscsLandingPage.css";

const DiscsLandingPage = () => {
  const dispatch = useDispatch();
  const discs = useSelector(allDiscs);
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getAllDiscs());
  }, [dispatch]);
  return (
    <>
      <input className="disc_landing__search" type="text" />
      <main className="disc_landing__container">
        <div className="disc_landing__filters">
          <h1>Filters will go here</h1>
          <div className="disc_landing__submit">
            {!sessionUser?.admin && <h3>Don't see your disc?</h3>}
            <OpenModalButton
              modalComponent={<CreateDiscForm />}
              buttonText={sessionUser?.admin ? "Add Disc" : "Request "}
            />
          </div>
        </div>
        <div className="disc_landing__main">
          {discs.map((disc) => (
            <OpenModalDiv
              className="disc-landing__title"
              key={disc.id}
              component={<DiscTile disc={disc} />}
              modalComponent={<DiscDetailsModal disc={disc} />}
            />
          ))}
        </div>
      </main>
    </>
  );
};

export default DiscsLandingPage;
