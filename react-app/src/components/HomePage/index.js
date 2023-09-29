import React from "react";
import { useHistory } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  const history = useHistory();
  return (
    <div className="home__container">
      <div className="home__main">
        <div className="home__info_container">
          <div className="home__info">
            <h1>Welcome to KanDiscer</h1>
            <p>
              Your one-stop shop for disc golf. Discover new discs, check their
              flight paths, and organize them into your bags. Explore and
              navigate new courses, or keep scores at ones you already know.
              KanDiscer has everything you need to improve your game and have
              more fun on the course.
            </p>
            <div className="home__info-btns">
              <button onClick={() => history.push("/discs")}>
                Browse Discs
              </button>
              <button onClick={() => history.push("/bags")}>Get Started</button>
            </div>
          </div>
        </div>
        <div className="home__info_img">
          <img
            className="home__img"
            src="https://res.cloudinary.com/dmkyocbqi/image/upload/v1695679466/diavolo-disc-golf-cary-nc-4_r4otk7.jpg"
            alt="Disc golf basket with forest backdrop"
          />
        </div>
      </div>
      <div className="home__courses">
        <h2 className="courses-overlay">Courses coming soon...</h2>
        <img
          src="https://res.cloudinary.com/dmkyocbqi/image/upload/v1695947974/Champoeg_nmslqb.jpg"
          alt="Course map"
        />
      </div>
    </div>
  );
};

export default HomePage;
