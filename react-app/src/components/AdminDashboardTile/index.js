import React, { useState } from "react";
import AdminDiscTile from "../AdminDiscTile";
import "./AdminDashboardTile.css";

const AdminDashboardTile = ({ header, content, approve }) => {
  const [filterName, setFilterName] = useState("");

  return (
    <div className="admin-tile__container">
      <div className="admin-tile__header">
        <h2>{header}</h2>
        <div>
          <label htmlFor="search">Search</label>
          <input
            id="search"
            placeholder="Search by name..."
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
            type="text"
          />
        </div>
      </div>
      {content
        ?.filter((disc) =>
          disc.name.toLowerCase().includes(filterName.toLowerCase())
        )
        .sort((a, b) => b.id - a.id)
        .map((disc) => (
          <AdminDiscTile key={disc.id} disc={disc} approve={approve} />
        ))}
    </div>
  );
};

export default AdminDashboardTile;
