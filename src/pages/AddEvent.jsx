import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function AddEvent() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState("");
  const [error, setError] = useState(null);

  const photoOptions = [
    "/public/PE1.png",
    "/public/PE2.png",
    "/public/PE3.png",
    "/public/PE4.png",
  ];

  const newEvent = {
    name,
    date,
    description,
    organizer: user._id,
    participants: [user._id],
    photo,
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
        setError(err);
        console.log(err);
      });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center text-center gap-5 mt-5"
    >
      <div>
        <label className="font-semibold text-lg">Name</label>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          className="border-2 border-olive_color_lighter  text-md rounded-lg  block p-2.5 focus:border-olive_color focus:outline-none w-60"
        />
      </div>
      <div>
        <label className="font-semibold text-lg">Date</label>
        <input
          type="date"
          onChange={(e) => setDate(e.target.value)}
          className="border-2 border-olive_color_lighter  text-md rounded-lg block w-60 p-2.5 focus:border-olive_color focus:outline-none"
        />
      </div>
      <div>
        <label className="font-semibold text-lg">Description</label>
        <textarea
          cols="50"
          onChange={(e) => setDescription(e.target.value)}
          className="border-2 border-olive_color_lighter  text-md rounded-lg  block p-2.5 focus:border-olive_color focus:outline-none"
        />
      </div>
      <div className="font-semibold text-lg">
        <label>Choose your event's picture</label>
        <div className="photo-selection flex">
          {photoOptions.map((photoUrl, index) => (
            <img
              key={index}
              src={photoUrl}
              alt={`Event Photo ${index + 1}`}
              className="rounded-lg"
              onClick={() => handlePhotoSelect(photoUrl)}
              style={{
                width: "20em",
                margin: "5px",
                cursor: "pointer",
                border: photo === photoUrl ? "4px solid #A4B7A4" : "none",
              }}
            />
          ))}
        </div>
      </div>
      <div>
        <button
          type="submit"
          className="px-8 py-4 text-xl bg-white_color border-2 border-olive_color rounded-lg text-olive_color font-bold hover:bg-olive_color hover:text-white_color"
        >
          Create event
        </button>
      </div>
      {error && (
        <div className="bg-red-800 w-2/4 mx-auto p-2 rounded-lg text-white_color">
          <h1>{error.response.data.message}</h1>
        </div>
      )}
    </form>
  );
}

export default AddEvent;
