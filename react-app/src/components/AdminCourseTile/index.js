import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "./AdminCourseTile.css";
import OpenModalButton from "../OpenModalButton";
import DeleteModal from "../DeleteModal";
import { deleteCourse } from "../../store/courses";
import { useModal } from "../../context/Modal";

const AdminCourseTile = ({ course, approve }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();

  const handleDelete = () => {
    dispatch(deleteCourse(course.id));
    closeModal();
  };

  const handleUpdate = () => {
    return history.push(
      `/courses/${course.id}/${approve ? "review" : "update"}`
    );
  };

  return (
    <div className="admin-disc__main">
      <h3>{course.name}</h3>
      <div className="admin-disc__edit">
        <button onClick={handleUpdate}>{approve ? "Review" : "Update"}</button>
        <OpenModalButton
          buttonText={"Delete"}
          modalComponent={
            <DeleteModal value={course} handleDelete={handleDelete} />
          }
        />
      </div>
    </div>
  );
};

export default AdminCourseTile;
