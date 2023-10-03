import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCourses, allCourses } from "../../store/courses";
import { Link } from "react-router-dom";
import CourseLandingTile from "../CourseLandingTile";
import "./CoursesLandingPage.css";

const CoursesLandingPage = () => {
  const dispatch = useDispatch();
  const courses = useSelector(allCourses);

  useEffect(() => {
    dispatch(getAllCourses());
  }, [dispatch]);

  return (
    <div className="course-landing__container">
      {courses.map((course) => (
        <Link key={`course${course.id}`} to={`/courses/${course.id}`}>
          <CourseLandingTile course={course} />
        </Link>
      ))}
    </div>
  );
};

export default CoursesLandingPage;
