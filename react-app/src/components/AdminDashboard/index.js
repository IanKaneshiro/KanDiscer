import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllDiscs,
  allDiscs,
  getDiscsAwaitingApproval,
  awaitingApproval,
} from "../../store/discs";
import AdminDiscTile from "../AdminDiscTile";
import "./AdminDashboard.css";
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
        <div>
          {discs.map((disc) => (
            <AdminDiscTile key={disc.id} disc={disc} />
          ))}
        </div>
        <div></div>
        <div></div>
        <div>
          {approvalDiscs.map((disc) => (
            <AdminDiscTile key={disc.id} disc={disc} approve={true} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default AdminDashboard;
