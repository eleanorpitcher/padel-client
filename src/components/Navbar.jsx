import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/Logo1Transparent2.png";

function Navbar() {
  return (
    <div className="bg-green3_color flex w-full sticky top-0 justify-between flex-wrap pt-4">
      <img src={logo} className="w-48 ml-8 md:w-64 lg:w-96" />
      <div className="xl:flex xl:pt-4 xl:mr-24 xl:gap-28 xl:mt-4">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/events">Events</NavLink>
        <NavLink to="/new-event">Add an event</NavLink>

        <NavLink to="/profile/:id">User Profile</NavLink>

        <NavLink to="/login">Log In</NavLink>

        <NavLink to="/signup">Sign Up</NavLink>
      </div>

      <div></div>
    </div>
  );
}

export default Navbar;
