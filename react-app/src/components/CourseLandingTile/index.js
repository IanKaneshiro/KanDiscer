import React from "react";
import "./CourseLandingTile.css";

const CourseLandingTile = ({ course }) => {
  return (
    <div className="course-landing-tile__container">
      <h1>{course.name}</h1>
      <p>{course.headline}</p>
      <p>{course.holeCount} hole course</p>
      {/* <img src={course.images[0].url} alt={course.description} /> */}
    </div>
  );
};

export default CourseLandingTile;
