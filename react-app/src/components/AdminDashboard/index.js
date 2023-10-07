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
import { Redirect } from "react-router-dom";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const discs = useSelector(allDiscs);
  const approvalDiscs = useSelector(awaitingApproval);
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getAllDiscs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getDiscsAwaitingApproval());
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
          header={"Awaiting Approval"}
          content={approvalDiscs}
          approve={true}
        />
        <AdminDashboardTile header={"Manage Courses"} />
        <AdminDashboardTile header={"Manage Users"} />
      </div>
    </main>
  );
};

export default AdminDashboard;
