import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCourses, allCourses } from "../../store/courses";
import { Link, useHistory } from "react-router-dom";
import CourseLandingTile from "../CourseLandingTile";
import LoadingSpinner from "../LoadingSpinner";
import "./CoursesLandingPage.css";

const CoursesLandingPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const courses = useSelector(allCourses);
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getAllCourses());
  }, [dispatch]);

  if (!courses.length) return <LoadingSpinner />;

  return (
    <div className="course-landing__container">
      <div className="course-landing-start-round">
        {sessionUser && (
          <>
            <button onClick={() => history.push("/courses/new")}>
              Add Course
            </button>
          </>
        )}
      </div>
      <div className="course-landing__main">
        {courses.map((course) => (
          <Link key={`course${course.id}`} to={`/courses/${course.id}`}>
            <CourseLandingTile course={course} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CoursesLandingPage;
