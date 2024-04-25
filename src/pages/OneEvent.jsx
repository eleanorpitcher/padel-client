/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";
import dateFormat, { masks } from "dateformat";

function OneEvent() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const [event, setEvent] = useState(null);
  const { id } = useParams();
  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/events/${id}`)
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
        `${import.meta.env.VITE_API_URL}/api/events/${id}/join`,
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
    <div className="flex" style={{ backgroundColor: "#F5FBEF" }}>
      {event && (
        <div className="w-screen px-10">
          <div className="flex flex-row justify-between py-5">

            <div className="flex flex-col text-lg px-4 py-2 rounded-lg shadow-md" style={{ backgroundColor: "#E8EDE8", width: '20%' }}>
              <strong>Organised by: </strong>
              {event.organizer.name}
              <br></br>@{event.organizer.username}
            </div>
           
              {storedToken && (
                <p className="font-bold text-2xl" style={{ color: "#748B75" }}>
                  You're already signed up!
                </p>
              )}
              {!storedToken && (
                <button
                  onClick={joinEvent}
                  className="btn-green-3 text-2xl rounded-md mx-2"
                >
                  Sign up
                </button>
              )}
                
          </div>
          <div key={event._id}>
            <div className="flex flex-col text-center">
              <h1 className="text-6xl pt-10 pb-5 font-bold">{event.name}</h1>
              <h2 className="text-lg font-bold pb-4">{dateFormat(event.date, "fullDate")}</h2>
              <div className="text-center flex flex-col">
                <h2 className="text-3xl pt-10 font-bold">Details</h2>
                <div>
                  <p className="py-5 text-lg">{event.description}</p>
                </div>
                <div className="pt-5">
                  {isLoggedIn && (
                    <>
                      <h2 className="text-3xl font-bold pb-5">
                        Who's participating? ({event.participants.length})
                      </h2>
                      <div>
                        <ul className="flex flex-row justify-center ">
                          {event.participants.map((oneParticipant, index) => (
                            <li
                              key={index}
                              className="mx-2 p-10 bg-white text-lg rounded-lg shadow-lg"
                              style={{width:'300px', backgroundColor: '#A4B7A4', color: 'white'}}
                            >
                              {oneParticipant.name}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  )}
                  {!isLoggedIn && (
                    <div className="flex flex-row pt-3">
                      <h2 className="text-lg font-bold">
                        How many players are participating?
                      </h2>
                      <ul>
                        <li>{event.participants.length}</li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              {event && (
                <div className="flex flex-col text-center">
                  <h2 className="mb-2 text-2xl pt-10">
                    {event.organizer.name}, input the results for this match
                  </h2>
                  <Link to={`/events/${id}/results`}>
                    <button className={`btn-green-1 px-6 py-2 rounded-lg mb-2 btn-green-3`}>
                      Results
                    </button>
                  </Link>
                </div>
              )}
            </div>
            
            {/*event photo*/}
          </div>
        </div>
      )}
    </div>
  );
}

export default OneEvent;
