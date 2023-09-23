import React from "react";
import "./DiscFilterBar.css";
import { manufactures } from "../../utils/seederData";

const DiscFilterBar = ({ filters, setFilters }) => {
  return (
    <div className="disc-filters">
      <h1>Filter Discs</h1>
      <label>
        Manufacturer
        <select
          value={filters.manufacturer}
          onChange={(e) =>
            setFilters((prev) => {
              return { ...prev, manufacturer: e.target.value };
            })
          }
        >
          <option value="">None</option>
          {manufactures.map((man) => (
            <option key={man} value={man}>
              {man}
            </option>
          ))}
        </select>
      </label>
      <div className="disc-filters speed">
        <label>
          Speed (min)
          <select
            value={filters.speed_min}
            onChange={(e) =>
              setFilters((prev) => {
                return { ...prev, speed_min: e.target.value };
              })
            }
          >
            <option value="">None</option>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15].map((speed) => (
              <option key={speed} value={speed}>
                {speed}
              </option>
            ))}
          </select>
        </label>
        <label>
          Speed (max)
          <select
            value={filters.speed_max}
            onChange={(e) =>
              setFilters((prev) => {
                return { ...prev, speed_max: e.target.value };
              })
            }
          >
            <option value="">None</option>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15].map((speed) => (
              <option key={speed} value={speed}>
                {speed}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="disc-filters glide">
        <label>
          Glide (min)
          <select
            value={filters.glide_min}
            onChange={(e) =>
              setFilters((prev) => {
                return { ...prev, turn_min: e.target.value };
              })
            }
          >
            <option value={""}>None</option>
            {[1, 2, 3, 4, 5, 6, 7].map((glide) => (
              <option key={glide} value={glide}>
                {glide}
              </option>
            ))}
          </select>
        </label>
        <label>
          Glide (max)
          <select
            value={filters.glide_max}
            onChange={(e) =>
              setFilters((prev) => {
                return { ...prev, glide_max: e.target.value };
              })
            }
          >
            <option value={""}>None</option>
            {[1, 2, 3, 4, 5, 6, 7].map((glide) => (
              <option key={glide} value={glide}>
                {glide}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="disc-filters turn">
        <label>
          Turn (min)
          <select
            value={filters.turn_min}
            onChange={(e) =>
              setFilters((prev) => {
                return { ...prev, turn_min: e.target.value };
              })
            }
          >
            <option value={""}>None</option>
            {[-5, -4, -3, -2 - 1, 0, 1, 2].map((turn) => (
              <option key={turn} value={turn}>
                {turn}
              </option>
            ))}
          </select>
        </label>
        <label>
          Turn (max)
          <select
            value={filters.turn_max}
            onChange={(e) =>
              setFilters((prev) => {
                return { ...prev, turn_max: e.target.value };
              })
            }
          >
            <option value={""}>None</option>
            {[-5, -4, -3, -2 - 1, 0, 1, 2].map((turn) => (
              <option key={turn} value={turn}>
                {turn}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="disc-filters fade">
        <label>
          Fade (min)
          <select
            value={filters.fade_min}
            onChange={(e) =>
              setFilters((prev) => {
                return { ...prev, fade_min: e.target.value };
              })
            }
          >
            <option value={""}>None</option>
            {[0, 1, 2, 3, 4, 5, 6].map((fade) => (
              <option key={fade} value={fade}>
                {fade}
              </option>
            ))}
          </select>
        </label>
        <label>
          Fade (max)
          <select
            value={filters.fade_max}
            onChange={(e) =>
              setFilters((prev) => {
                return { ...prev, fade_max: e.target.value };
              })
            }
          >
            <option value={""}>None</option>
            {[0, 1, 2, 3, 4, 5, 6].map((fade) => (
              <option key={fade} value={fade}>
                {fade}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
};

export default DiscFilterBar;
