import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import DiscsLandingPage from "./components/DiscsLandingPage";
import HomePage from "./components/HomePage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AdminDashboard from "./components/AdminDashboard";
import BagsNavigationBar from "./components/BagsNavigationBar";
import { Toaster } from "react-hot-toast";
import CoursesLandingPage from "./components/CoursesLandingPage";
import CourseRound from "./components/CourseRounds";
import CreateCoursePage from "./components/CreateCoursePage";
import CourseInfoPage from "./components/CourseInfoPage";
import CourseDetails from "./components/CourseDetails";
import UpdateCoursePage from "./components/UpdateCoursePage";
import Layout from "./components/Layout";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      <Layout>
        {isLoaded && (
          <>
            <Switch>
              <Route exact path="/">
                <HomePage />
              </Route>
              <Route path="/admin">
                <AdminDashboard />
              </Route>
              <Route path="/login">
                <LoginFormPage />
              </Route>
              <Route path="/signup">
                <SignupFormPage />
              </Route>
              <Route path="/discs">
                <DiscsLandingPage />
              </Route>
              <Route exact path="/courses">
                <CoursesLandingPage />
              </Route>
              <ProtectedRoute exact path="/courses/new">
                <CreateCoursePage />
              </ProtectedRoute>
              <ProtectedRoute exact path="/courses/:courseId/rounds">
                <CourseRound />
              </ProtectedRoute>
              <Route exact path="/courses/:courseId/view">
                <CourseDetails />
              </Route>
              <ProtectedRoute exact path="/courses/:courseId/update">
                <UpdateCoursePage />
              </ProtectedRoute>
              <ProtectedRoute exact path="/courses/:courseId/review">
                <UpdateCoursePage />
              </ProtectedRoute>
              <Route path="/courses/:courseId">
                <CourseInfoPage />
              </Route>
              <ProtectedRoute path="/bags">
                <BagsNavigationBar />
              </ProtectedRoute>
            </Switch>
          </>
        )}
      </Layout>
      <Toaster />
    </>
  );
}

export default App;
