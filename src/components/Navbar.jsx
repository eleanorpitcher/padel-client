import { Link, NavLink } from "react-router-dom";
import { useState, useContext } from "react";
import logo from "../assets/Logo1Transparent2.png";
import { AuthContext } from "../context/auth.context";

function Navbar() {
  const { isLoggedIn, user } = useContext(AuthContext);

  return (
    <div className="bg-green3_color  flex w-full sticky top-0 justify-between flex-wrap pt-4">
      <img src={logo} className="w-40 pl-7 " />
      <div className="xl:flex xl:pt-4 xl:mr-24 xl:gap-28 xl:mt-4">
        {isLoggedIn && (
          <>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/events">Events</NavLink>
            <NavLink to="/new-event">Add an event</NavLink>
            <NavLink to="/profile/:id">User Profile</NavLink>
            <button>Log out</button>
          </>
        )}

        {!isLoggedIn && (
          <>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/events">Events</NavLink>
            <NavLink to="/login">Log In</NavLink>
            <NavLink to="/signup">Sign Up</NavLink>
          </>
        )}
      </div>

      <div></div>
    </div>
  );
}

export default Navbar;
