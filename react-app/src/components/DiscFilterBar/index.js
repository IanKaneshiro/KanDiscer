import React from "react";
import "./DiscFilterBar.css";
import { manufactures } from "../../utils/seederData";

const DiscFilterBar = ({ filters, setFilters }) => {
  return (
    <div>
      <select
        value={filters.manufacturer}
        onChange={(e) =>
          setFilters((prev) => {
            return { ...prev, manufacturer: e.target.value };
          })
        }
      >
        <option value={""}>None</option>
        {manufactures.map((man) => (
          <option key={man} value={man}>
            {man}
          </option>
        ))}
      </select>
      <div className="disc-filters speed">
        <label>speed (Min)</label>
        <select
          value={filters.speed_min}
          onChange={(e) =>
            setFilters((prev) => {
              return { ...prev, speed_min: e.target.value };
            })
          }
        >
          <option value={""}>None</option>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15].map((speed) => (
            <option value={speed}>{speed}</option>
          ))}
        </select>
        <label>speed(Max)</label>
        <select
          value={filters.speed_max}
          onChange={(e) =>
            setFilters((prev) => {
              return { ...prev, speed_max: e.target.value };
            })
          }
        >
          <option value={""}>None</option>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15].map((speed) => (
            <option value={speed}>{speed}</option>
          ))}
        </select>
      </div>
      <div className="disc-filters glide">
        <label>glide (Min)</label>
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
            <option value={glide}>{glide}</option>
          ))}
        </select>
        <label>glide(Max)</label>
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
            <option value={glide}>{glide}</option>
          ))}
        </select>
      </div>
      <div className="disc-filters turn">
        <label>turn (Min)</label>
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
            <option value={turn}>{turn}</option>
          ))}
        </select>
        <label>turn(Max)</label>
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
            <option value={turn}>{turn}</option>
          ))}
        </select>
      </div>
      <div className="disc-filters fade">
        <label>fade (Min)</label>
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
            <option value={fade}>{fade}</option>
          ))}
        </select>
        <label>fade(Max)</label>
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
            <option value={fade}>{fade}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default DiscFilterBar;
