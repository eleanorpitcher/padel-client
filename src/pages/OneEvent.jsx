import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function OneEvent() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const [event, setEvent] = useState(null);
  const { id } = useParams();
  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    axios
      .get(`http://localhost:5005/api/events/${id}`)
      .then((oneEvent) => {
        setEvent(oneEvent.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  function joinEvent() {
    axios
      .put(
        `http://localhost:5005/api/events/${id}/join`,
        {},
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((updatedEvent) => {
        setEvent(updatedEvent.data);
        console.log("success");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="flex">
      {event && (
        <div className="w-2/3 p-4">
          <div key={event._id}>
            <h1 className="font-bold text-5xl mb-2">{event.name}</h1>
            <p className="text-2xl mb-2">{event.description}</p>
            {storedToken && <p>You're already signed up!</p>}
            {!storedToken && <button onClick={joinEvent}>Sign up</button>}
          </div>
        </div>
      )}
      {event && (
        <div className="w-1/3 p-4">
          <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <h2 className="text-lg font-bold mb-2">
              Organised by: {event.organizer.username}
            </h2>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <h2 className="text-lg font-bold mb-2">{event.date}</h2>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-lg font-bold mb-2">Participants</h2>

            {isLoggedIn && (
              <ul>
                {event.participants.map((oneParticipant, index) => (
                  <li key={index}>{oneParticipant.username}</li>
                ))}
              </ul>
            )}
            {!isLoggedIn && (
              <ul>
                <li>{event.participants.length}</li>
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default OneEvent;
