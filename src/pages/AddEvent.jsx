/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function AddEvent() {
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const newEvent = {
    name,
    date,
    description,
    organizer: user._id,
    participants: [user._id],
  };

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post(`http://localhost:5005/api/events`, newEvent)
      .then((event) => {
        navigate(`/events/${event.data._id}`);
        console.log(event);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input type="text" onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label>Date</label>
        <input
          type="date"
          onChange={(e) => {
            setDate(e.target.value);
            console.log(e.target.value);
          }}
        />
      </div>
      <div>
        <label>Description</label>
        <input type="text" onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div>
        <button>Submit event</button>
      </div>
    </form>
  );
}

export default AddEvent;
