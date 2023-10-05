import React from "react";
import "./CourseLandingTile.css";

const CourseLandingTile = ({ course }) => {
  return (
    <div className="course-landing-tile__container">
      <h1>{course.name}</h1>
      <p>{course.holeCount} hole course</p>
      <p>{course.headline}</p>
    </div>
  );
};

export default CourseLandingTile;
