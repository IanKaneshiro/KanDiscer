import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDiscs, getFilteredDiscs } from "../../store/discs";
import { allDiscs } from "../../store/discs";
import DiscTile from "../DiscTile";
import OpenModalDiv from "../OpenModalDiv";
import DiscDetailsModal from "../DiscDetailsModal";
import OpenModalButton from "../OpenModalButton";
import CreateDiscForm from "../CreateDiscForm";
import DiscFilterBar from "../DiscFilterBar";
import { useDebounce } from "../../utils/useDebounce";
import "./DiscsLandingPage.css";

const DiscsLandingPage = () => {
  const dispatch = useDispatch();
  const discs = useSelector(allDiscs);
  const sessionUser = useSelector((state) => state.session.user);
  const [nameFilter, setNameFilter] = useState("");
  const [filters, setFilters] = useState({
    manufacturer: null,
    speed_max: null,
    speed_min: null,
    glide_max: null,
    glide_min: null,
    turn_max: null,
    turn_min: null,
    fade_max: null,
    fade_min: null,
  });
  const query = useDebounce(nameFilter, 500);

  useEffect(() => {
    dispatch(getAllDiscs());
  }, [dispatch]);

  useEffect(() => {
    let returnFilters = filters;
    if (query) {
      returnFilters.name = query;
      return dispatch(getFilteredDiscs(returnFilters));
    } else {
      returnFilters.name = "";
      dispatch(getFilteredDiscs(returnFilters));
    }
  }, [dispatch, filters, query]);

  return (
    <>
      <input
        className="disc_landing__search"
        type="text"
        value={nameFilter}
        placeholder="Search by name..."
        onChange={(e) => setNameFilter(e.target.value)}
      />
      <main className="disc_landing__container">
        <div className="disc_landing__filters">
          <DiscFilterBar filters={filters} setFilters={setFilters} />
          <div className="disc_landing__submit">
            {!sessionUser?.admin && <h3>Don't see your disc?</h3>}
            <OpenModalButton
              modalComponent={<CreateDiscForm />}
              buttonText={sessionUser?.admin ? "Add Disc" : "Request "}
            />
          </div>
        </div>
        <div className="disc_landing__main">
          {discs.length ? (
            discs.map((disc) => (
              <OpenModalDiv
                className="disc-landing__title"
                key={disc.id}
                component={<DiscTile disc={disc} />}
                modalComponent={<DiscDetailsModal disc={disc} />}
              />
            ))
          ) : (
            <h1>Cant seem to find that disc</h1>
          )}
        </div>
      </main>
    </>
  );
};

export default DiscsLandingPage;
