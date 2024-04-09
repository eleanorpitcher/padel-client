import { useState, useEffect } from "react";
import axios from "axios";

function AllEvents() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5005/api/events")
      .then((allEvents) => {
        setEvents(allEvents.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h1>All Events</h1>
      {events.map((oneEvent) => {
        return (
          <div
            key={oneEvent._id}
            className="container border-4 border-black mb-4 py-4"
          >
            <h1> {oneEvent.name}</h1>
            <h2>{oneEvent.date}</h2>
            <p>{oneEvent.description}</p>
            <p>{oneEvent.participants.length}</p>
            <button className="bg-gray-400 px-3 py-1 rounded-lg">Join</button>
          </div>
        );
      })}
    </div>
  );
}

export default AllEvents;
