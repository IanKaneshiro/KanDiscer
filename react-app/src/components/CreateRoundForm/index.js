import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllUsers, selectAllUsers } from "../../store/users";
import { getAllCourses, allCourses } from "../../store/courses";
import { useModal } from "../../context/Modal";

import "./CreateRoundForm.css";

const CreateRoundForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const allUsers = useSelector(selectAllUsers);
  const courses = useSelector(allCourses);
  const { closeModal } = useModal();
  const [course, setCourse] = useState("");
  const [users, setUsers] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Start!");
    closeModal();
    history.push(`/courses/${course}/rounds`);
  };

  const handleCheckboxChange = (e) => {
    const userId = e.target.value;
    setUsers((prev) => {
      if (prev[userId]) {
        const updateUser = { ...prev };
        delete updateUser[userId];
        return updateUser;
      } else {
        return { ...prev, [userId]: allUsers[userId - 1].firstName };
      }
    });
  };

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getAllCourses());
  }, [dispatch]);
  return (
    <div className="create-round__container">
      <form className="create-round__main" onSubmit={handleSubmit}>
        <h1>Round Details</h1>
        <label htmlFor="course">Pick your course</label>
        <select
          id="course"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          required
        >
          <option value="" disabled>
            Select a course...
          </option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.name}
            </option>
          ))}
        </select>
        <label>Select Players</label>
        <div className="create-round__users">
          {allUsers.map((user) => (
            <>
              <label key={user.id} htmlFor={user.id}>
                {user.firstName}
              </label>
              <input
                id={user.id}
                type="checkbox"
                value={user.id}
                onChange={handleCheckboxChange}
              />
            </>
          ))}
        </div>

        <button>Start Round</button>
      </form>
    </div>
  );
};

export default CreateRoundForm;
