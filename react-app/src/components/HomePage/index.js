import React from "react";
import { useHistory } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  const history = useHistory();
  return (
    <div className="home__container">
      <div className="home__main">
        <div className="home__info">
          <h1>Welcome to KanDiscer</h1>
          <p>
            Want to discover new discs, check the flight paths, organize them
            into your bags? Want to explore and navigate new courses or keep
            scores at ones you already know? KanDiscer is the place for you!
          </p>
          <div className="home__info-btns">
            <button onClick={() => history.push("/discs")}>Browse Discs</button>
            <button onClick={() => history.push("/bags")}>Get Started</button>
          </div>
        </div>
        <div>
          <img
            className="home__img"
            src="https://res.cloudinary.com/dmkyocbqi/image/upload/v1695679466/diavolo-disc-golf-cary-nc-4_r4otk7.jpg"
            alt="Disc golf basket with forest backdrop"
          />
        </div>
      </div>
      <div className="home__courses">
        <h2>Courses coming soon...</h2>
      </div>
    </div>
  );
};

export default HomePage;
