import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllDiscs,
  allDiscs,
  getDiscsAwaitingApproval,
  awaitingApproval,
} from "../../store/discs";
import "./AdminDashboard.css";
import AdminDashboardTile from "../AdminDashboardTile";
import AdminDashboardCourseTile from "../AdminDashboardCourseTile";
import { Redirect } from "react-router-dom";
import {
  getAllCourses,
  allCourses,
  coursesAwaitingApproval,
  getCoursesAwaitingApproval,
} from "../../store/courses";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const discs = useSelector(allDiscs);
  const approvalDiscs = useSelector(awaitingApproval);
  const approvalCourses = useSelector(coursesAwaitingApproval);
  const courses = useSelector(allCourses);
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getAllDiscs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getDiscsAwaitingApproval());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllCourses());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCoursesAwaitingApproval());
  }, [dispatch]);

  if (!sessionUser?.admin) {
    return <Redirect to="/login" />;
  }

  return (
    <main className="admin__container">
      <h1>Admin Dashboard</h1>
      <div className="admin__main">
        <AdminDashboardTile header={"Manage Discs"} content={discs} />
        <AdminDashboardTile
          header={"Discs Awaiting Approval"}
          content={approvalDiscs}
          approve={true}
        />
        <AdminDashboardCourseTile header={"Manage Courses"} content={courses} />
        <AdminDashboardCourseTile
          header={"Courses Awaiting Approval"}
          content={approvalCourses}
          approve={true}
        />
      </div>
    </main>
  );
};

export default AdminDashboard;
