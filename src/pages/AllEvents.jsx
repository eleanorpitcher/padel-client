import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import dateFormat, { masks } from "dateformat";
import createImage from "../assets/Eleanor2.2.png";

function AllEvents() {
  const [events, setEvents] = useState([]);
  const [eventsAll, setEventsAll] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState(true);
  const currentDate = new Date();
  const [years, setYears] = useState([
    { value: "default", label: "All Years" },
    { value: "2024", label: "2024" },
    { value: "2023", label: "2023" },
    { value: "2022", label: "2022" },
  ]);

  const filteredEvents = upcomingEvents
    ? events.filter((event) => new Date(event.date) > currentDate)
    : events.filter((event) => new Date(event.date) < currentDate);
  const sortByDate = (event1, event2) => {
    const date1 = new Date(event1.date);
    const date2 = new Date(event2.date);
    return date1 - date2;
  };
  const chronologicalEvents = filteredEvents.sort(sortByDate);

  const sortByYear = (selectedYear) => {
    let filteredEvents;

    if(!upcomingEvents) {
      if (selectedYear === "default") {
        filteredEvents = eventsAll;
      } else {
        filteredEvents = eventsAll.filter(
          (event) =>
            event.date &&
            new Date(event.date).getFullYear().toString() === selectedYear
        );
      }
    }

    console.log("Filtered events:", filteredEvents);
    setEvents(filteredEvents);
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/events`)
      .then((allEvents) => {
        setEvents(allEvents.data);
        setEventsAll(allEvents.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(()=> {
    if(upcomingEvents) {
      setEvents(eventsAll)
    }
  },[upcomingEvents])
  

  return (
    <div className="p-4" style={{ backgroundColor: "#F5FBEF" }}>
      <h1 className="text-center text-4xl px-10 py-10">
        {upcomingEvents ? "Upcoming Events" : "Past Events"}
      </h1>
      <div className="flex mb-4 flex-col">
        <div className="flex flex-row">
          <div className="justify-start">
            <button
              onClick={() => setUpcomingEvents(true)}
              className={`btn-green-1 px-4 py-2 rounded-lg mb-2 ${
                !upcomingEvents ? "btn-white" : ""
              }`}
            >
              Upcoming Events
            </button>
            <button
              onClick={() => setUpcomingEvents(false)}
              className={`btn-green-1 px-4 py-2 rounded-lg mb-2 mx-2 ${
                upcomingEvents ? "btn-white" : ""
              }`}
            >
              Past Events
            </button>
          </div>
          <div className="justify-end">
              <Link to={"/new-event"}>
                <button
                  className={`btn-green-3 px-4 py-2 rounded-lg mb-2 mx-20 justify-end`}
                  style={{ width: "200px" }}
                > Create New event
                </button>
              </Link>
          </div>
        </div>
        <div className="flex flex-row">
            {!upcomingEvents && (
              <div className="year-dropdown">
                <select
                  id="dropdownMenu"
                  onChange={(e) => sortByYear(e.target.value)}
                  className="text-1xl text-left text-center p-1 border-2 year-btn"
                >
                  {years.map((oneYear) => (
                    <option
                      key={oneYear.value}
                      value={oneYear.value}
                      label={oneYear.label}
                    >
                      {oneYear.default}
                    </option>
                  ))}
                </select>
              </div>
            )}
        </div>
          
      </div>
      <div>
        {upcomingEvents && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {chronologicalEvents.map((oneEvent) => {
              return (
                <div
                  key={oneEvent._id}
                  className="border border-gray-400 shadow-md p-4 rounded-lg"
                >
                  <h1 className="text-xl font-bold mb-2 text-center">
                    {oneEvent.name}
                  </h1>
                  <h2 className="text-gray-600 mb-2 text-center">
                    {dateFormat(oneEvent.date, "fullDate")}
                  </h2>
                  <p className="text-gray-700 my-3 text-center">
                    <strong>Participants:</strong>{" "}
                    {oneEvent.participants.length}
                  </p>

                  <p className="text-gray-700 my-5">{oneEvent.description}</p>
                  <Link to={`/events/${oneEvent._id}`}>
                    <button className="btn-green-3 px-4 py-2 rounded-lg">
                      Learn more
                    </button>
                  </Link>
                </div>
              );
            })}
          </div>
        )}
        {!upcomingEvents && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filteredEvents.map((oneEvent) => {
              return (
                <div
                  key={oneEvent._id}
                  className="border border-gray-400 shadow-md p-4 rounded-lg"
                >
                  <h1 className="text-xl font-bold mb-2 text-center">
                    {oneEvent.name}
                  </h1>
                  <h2 className="text-gray-600 mb-2 text-center">
                    {dateFormat(oneEvent.date, "fullDate")}
                  </h2>
                  <p className="text-gray-700 my-3 text-center">
                    <strong>Participants:</strong>{" "}
                    {oneEvent.participants.length}
                  </p>

                  <p className="text-gray-700 my-5">{oneEvent.description}</p>
                  <Link to={`/events/${oneEvent._id}`}>
                    <button className="btn-green-3 px-4 py-2 rounded-lg">
                      Learn more
                    </button>
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default AllEvents;
