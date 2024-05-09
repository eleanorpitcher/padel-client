/* eslint-disable no-unused-vars */
import React from "react";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import arrow from "../assets/icons8-arrow-right-50.png";
import createEvent from "../assets/Eleanor1.2 (1).png";
import ReactPlayer from "react-player";
import video from "../../public/video.mp4";

function Homepage() {
  const [events, setEvents] = useState([]);
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const [players, setPlayers] = useState([]);
  const navigate = useNavigate();
  const currentDate = new Date();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/events`)
      .then((response) => {
        const fetchedEvents = response.data;
        const filteredEvents = fetchedEvents.filter(
          (event) => new Date(event.date) > currentDate
        );
        const sortByDate = (event1, event2) =>
          new Date(event1.date) - new Date(event2.date);
        const sortedEvents = filteredEvents.sort(sortByDate);
        setEvents(sortedEvents.slice(0, 3)); // Assuming you want to show only the first 3
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/users/`)
      .then((response) => {
        const allPlayers = response.data;
        // console.log('all players', allPlayers)

        const playersWhoHaveParticipated = allPlayers.filter(
          (player) => player.gamesPlayed.length > 0
        );
        console.log(playersWhoHaveParticipated);
        const scoresSorted = [...playersWhoHaveParticipated].sort(
          (a, b) => b.totalScore - a.totalScore
        );
        setPlayers(scoresSorted.slice(0, 3));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div
      className="w-full flex flex-col"
      style={{ backgroundColor: "#F5FBEF" }}
    >
      <div className={`flex flex-col  ${isLoggedIn ? "p-8 pt-1" : "p-0"}`}>
        <h1 className="text-4xl px-10 pt-10">
          Find and Compete in Americano tournaments at Barcelona's Most Social
          Padel Club
        </h1>
        <p className="text-2xl pt-3 pl-10">
          Browse upcoming events, play with friends, and work your way up the
          leaderboard
        </p>
        {!isLoggedIn && (
          <div className="p-10 pb-0 ">
            <Link to={"/signup"}>
              <button className="text-xl text-center p-3 border-2 login-btn">
                Join Padel4All
              </button>
            </Link>
          </div>
        )}
      </div>

      <div
        className="flex justify-center items-center  mx-auto relative overflow-hidden mt-7 mb-14"
        style={{
          height: `50vh`,
          width: "50vw",
        }}
      >
        <video width="1024" height="768" controls>
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* <div 
     className="flex justify-center items-center  mx-auto relative overflow-hidden mt-7 mb-7"
     style={{
      height: `50vh`,  
       width: "50vw",
     }}>
  <ReactPlayer
    url="https://www.youtube.com/watch?v=NtnT6r0PlKE"
    className="react-player"
    playing
    width="100%"  // Player will take full width of the container
    height="100%" // Player will take full height of the container
    controls={true}
  />
</div> */}

      <div className="flex flex-col w-full px-20">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-3xl">Upcoming events. Book now!</h2>
          <div className="flex flex-row items-center">
            <h1 className="text-3xl ">See more events</h1>
            <Link to={"/events"}>
              <img className="arrow-img" src={arrow} alt="" />
            </Link>
          </div>
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-7"
          style={{ minHeight: "300px" }}
        >
          {events.length > 0 ? (
            events.map((event) => (
              <div
                key={event._id}
                className="border border-gray-400 shadow-md p-4 rounded-lg relative"
                style={{
                  backgroundImage: `url(${event.photo})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.6)",
                  }}
                ></div>

                <div className="relative z-10">
                  <div className="flex flex-row justify-between">
                    <h2 className="text-2xl text-left">{event.name}</h2>
                    <h3 className="pt-1 pl-10 ">
                      {new Date(event.date).toLocaleDateString()}
                    </h3>
                  </div>
                  <p className="mb-2">{event.description}</p>
                  <p>
                    <strong>Participants:</strong> {event.participants.length}
                  </p>
                  <div className="flex justify-center">
                    <Link to={`/events/${event._id}`}>
                      <button className="p-3 mt-5 join-btn">Join</button>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No upcoming events found.</p>
          )}
        </div>
      </div>

      <div className="rounded-lg">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl px-20 py-10">
            Who's Topping the Leaderboard this Week?
          </h2>
          <div className="flex items-center px-20 py-10">
            <h2 className="text-2xl ">Go to Scoreboard</h2>
            <Link to={"/scoreboard"}>
              <img className="arrow-img" src={arrow} alt="" />
            </Link>
          </div>
        </div>
        <div className="flex justify-center items-center h-full">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg lg:w-3/4">
            {/* <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white">
                    <label htmlFor="table-search" className="sr-only">Search</label>
                </div> */}
            <table className="w-full text-sm text-left rtl:text-right ">
              <thead
                className="text-xs text-gray-700 uppercase"
                style={{ backgroundColor: "#A4B7A4" }}
              >
                <tr>
                  <th scope="col" className="px-6 py-3">
                    #
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Player
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Score
                  </th>
                </tr>
              </thead>
              <tbody>
                {players.map((player, index) => (
                  <tr
                    className={`border-b border-gray-700 ${
                      index === 0
                        ? "bg-green-600 text-white_color"
                        : "text-black"
                    }`}
                    key={player.id}
                  >
                    <td className="px-6 py-4 items-center">{index + 1}</td>
                    <td
                      scope="row"
                      className="flex items-center px-6 py-4 whitespace-nowrap "
                    >
                      <img
                        className="w-10 h-10 rounded-full"
                        src={player.profilePhoto}
                        alt={`${player.name} image`}
                      />
                      <div className="ps-3">
                        <div className="text-base font-semibold">
                          {player.name}
                        </div>
                        <div className="font-normal text-gray-500">
                          @{player.username}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 items-center">
                      {player.totalScore}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div>
        <div className="flex flex-col">
          <div
            className="flex flex-col m-20 p-10 rounded-lg justify-center items-center"
            style={{ backgroundColor: "#A4B7A4" }}
          >
            <div className="px-10">
              <h3 className="text-center text-2xl text-white ">
                Bring the padel community together at your own event!
              </h3>
            </div>
            {isLoggedIn && (
              <div className="px-10 mt-2">
                <Link to={"/new-event"}>
                  {/* <button
                    className="text-lg p-3 border-2 rounded-lg"
                    style={{ width: "200px" }}
                  >
                    Create an event!
                  </button> */}

                  <img
                    src={createEvent}
                    style={{ height: "150px", width: "150px" }}
                    className="create-img"
                  />
                </Link>
              </div>
            )}

            {!isLoggedIn && (
              <div className="pt-5 font-white text-xl">
                <Link to="login">
                  <button className="px-4 m-2 border rounded-lg hover:bg-white_color hover:text-olive_color">
                    Log in
                  </button>
                </Link>{" "}
                or{" "}
                <Link to="signup">
                  <button className="px-4 m-2 border rounded-lg hover:bg-white_color hover:text-olive_color">
                    {" "}
                    Sign up
                  </button>
                </Link>{" "}
                to create an event.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
