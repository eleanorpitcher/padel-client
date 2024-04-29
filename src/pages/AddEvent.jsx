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
  const [photo, setPhoto] = useState("");

  const photoOptions = [
    "/public/PE1.png",
    "/public/PE2.png",
    "/public/PE3.png",
    "/public/PE4.png"
  ];

  const newEvent = {
    name,
    date,
    description,
    organizer: user._id,
    participants: [user._id],
    photo
  };

  function handlePhotoSelect(photoUrl) {
    setPhoto(photoUrl);
  }

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post(`${import.meta.env.VITE_API_URL}/api/events`, newEvent)
      .then((event) => {
        navigate(`/events/${event.data._id}`);
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
        <input type="date" onChange={(e) => setDate(e.target.value)} />
      </div>
      <div>
        <label>Description</label>
        <input type="text" onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div>
        <label>Photo</label>
        <div className="photo-selection flex">
          {photoOptions.map((photoUrl, index) => (
            <img
              key={index}
              src={photoUrl}
              alt={`Event Photo ${index + 1}`}
              className={`photo-option ${photo === photoUrl ? 'selected' : ''}`}
              onClick={() => handlePhotoSelect(photoUrl)}
              style={{ width: '100px', margin: '5px', cursor: 'pointer', border: photo === photoUrl ? '2px solid blue' : 'none' }}
            />
          ))}
        </div>
      </div>
      <div>
        <button type="submit">Submit event</button>
      </div>
    </form>
  );
}

export default AddEvent;