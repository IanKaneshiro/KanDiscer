import React, { useState } from "react";
import AdminCourseTile from "../AdminCourseTile";
import "./AdminDashboardCourseTile.css";

const AdminDashboardCourseTile = ({ header, content, approve }) => {
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
        ?.filter((course) =>
          course.name.toLowerCase().includes(filterName.toLowerCase())
        )
        .sort((a, b) => b.id - a.id)
        .map((course) => (
          <AdminCourseTile key={course.id} course={course} approve={approve} />
        ))}
    </div>
  );
};

export default AdminDashboardCourseTile;
