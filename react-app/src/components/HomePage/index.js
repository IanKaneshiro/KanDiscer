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
      <div className="home__info_container">
        <div className="home__courses_img">
          <img
            src="https://res.cloudinary.com/dmkyocbqi/image/upload/v1698600968/Screenshot_2023-10-29_103542_g1mtvx.png"
            alt="Course map"
          />
        </div>
        <div className="home__courses">
          <h1>Courses</h1>
          <p>
            Check out brand-new score-keeping feature, allowing you to
            meticulously track your rounds and improve your game. It's the
            ultimate companion for disc golf enthusiasts, offering an immersive
            and interactive way to play
          </p>
          <div className="home__courses-btns">
            <button onClick={() => history.push("/courses")}>
              Browse Courses
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
