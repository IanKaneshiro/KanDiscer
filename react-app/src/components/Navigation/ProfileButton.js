import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import { useHistory } from "react-router-dom";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    closeMenu();
    history.push("/");
  };

  const handleLogin = () => {
    history.push("/login");
    closeMenu();
  };

  const handleSignUp = () => {
    history.push("/signup");
    closeMenu();
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      {user ? (
        <button className="profile-btn" onClick={openMenu}>
          {user?.imageUrl ? (
            <img style={{ width: "50px" }} src={user.imageUrl} alt={user.id} />
          ) : (
            <div className="profile-icon">
              <i className="fa-solid fa-user fa-xl"></i>
            </div>
          )}
        </button>
      ) : (
        <button className="profile-login" onClick={openMenu}>
          Login
        </button>
      )}
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li>
              <h3>Welcome {user.username}</h3>
            </li>
            <li>
              <div className="profile-manage-options">
                {user.admin && (
                  <button
                    onClick={() => {
                      history.push("/admin");
                      closeMenu();
                    }}
                  >
                    Manage
                  </button>
                )}
                <button onClick={handleLogout}>Log Out</button>
              </div>
            </li>
          </>
        ) : (
          <>
            <li>
              <h3>Lets get started!</h3>
            </li>
            <div className="profile-login-signup">
              <button onClick={handleLogin}>Log In</button>
              <button onClick={handleSignUp}>Sign Up</button>
            </div>
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
