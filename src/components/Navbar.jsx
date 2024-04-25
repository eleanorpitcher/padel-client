/* eslint-disable no-unused-vars */
import { Link, NavLink } from "react-router-dom";
import { useState, useContext } from "react";
import logo from "../assets/Logo1Transparent2.png";
import { AuthContext } from "../context/auth.context";
import userProfileIcon from "../assets/icons8-user-48.png";
import logoutIcon from "../assets/icons8-logout-64.png";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  const navLinkClasses =
    "relative w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-olive_color after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center";

  return (
    <div className="bg-green2_color  flex w-full sticky z-50 top-0  flex-wrap navbar border-b-2 border-green2_color  shadow-md">
      <div className="xl:flex xl:pt-4 xl:mr-12 xl:gap-28 xl:mt-4 text-white_color font-bold text-xl w-full">
        {isLoggedIn && (
          <div className="flex flex-row items-center justify-between w-full">
            <div className="flex gap-2">
              <Link to="/">
                <img
                  src={logo}
                  className="w-40 pl-7 transform transition duration-500 hover:scale-125"
                />
              </Link>
            </div>

            <div className="flex gap-16">
              <NavLink to="/events" className={navLinkClasses}>
                Events
              </NavLink>
              <NavLink to="/new-event" className={navLinkClasses}>
                Add an event
              </NavLink>

              <NavLink to="/scoreboard" className={navLinkClasses}>
                Scoreboard
              </NavLink>
            </div>

            <div className="flex gap-6">
              <NavLink
                to={`/profile/${user._id}`}
                className="transform transition duration-500 hover:scale-125"
              >
                <img src={userProfileIcon} alt="" className="w-8" />
              </NavLink>
              <NavLink
                to="/"
                className="transform transition duration-500 hover:scale-125"
              >
                <button onClick={logOutUser}>
                  <img src={logoutIcon} alt="" className="w-8" />
                </button>
              </NavLink>
            </div>
          </div>
        )}

        {!isLoggedIn && (
          <div className="flex flex-row items-center  w-full">
            <Link to="/">
              <img
                src={logo}
                className="w-40 pl-7 transform transition duration-500 hover:scale-125"
              />
            </Link>

            <div className="flex mx-auto gap-16">
              <NavLink to="/events" className={navLinkClasses}>
                Events
              </NavLink>
              <NavLink to="/login" className={navLinkClasses}>
                Log In
              </NavLink>
              <NavLink to="/signup" className={navLinkClasses}>
                Sign Up
              </NavLink>
            </div>
          </div>
        )}
      </div>

      <div></div>
    </div>
  );
}

export default Navbar;
