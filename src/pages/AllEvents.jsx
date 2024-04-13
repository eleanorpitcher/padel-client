import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function AllEvents() {
  const [events, setEvents] = useState([]);
  // const [tabIsActive, setTabIsActive] = useState(false)

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

    const [upcomingEvents, setUpcomingEvents] = useState(true)
    const currentDate = new Date()
    console.log(currentDate)

    const filteredEvents = upcomingEvents
    ? events.filter(event => new Date(event.date) > currentDate) : events
  

  return (
    <div className="p-4">
    <h1 className="text-2xl font-bold mb-4 text-center">{upcomingEvents ? 'Upcoming Events' : 'Past Events'}</h1>
      <button onClick={() => setUpcomingEvents(true)}  className={`btn-green-1 px-4 py-2 rounded-lg mb-2 ${!upcomingEvents ? 'btn-white' : ''}`}>Upcoming Events</button>
      <button onClick={() => setUpcomingEvents(false)} className={`btn-green-1 px-4 py-2 rounded-lg mb-2 mx-2 ${upcomingEvents ? 'btn-white' : ''}`}>Past Events</button>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {filteredEvents.map((oneEvent) => {
        return (
          <div
            key={oneEvent._id}
            className="border border-gray-400 p-4 rounded-lg"
          >
            <h1 className="text-xl font-bold mb-2">{oneEvent.name}</h1>
            <h2 className="text-gray-600 mb-2">{oneEvent.date}</h2>
            <p className="text-gray-700 mb-2">{oneEvent.description}</p>
            <p className="text-gray-700 mb-2">Participants: {oneEvent.participants.length}</p>
            <Link to={`/events/${oneEvent._id}`}><button className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500">Sign up</button></Link>
          </div>
        );
      })}
    </div>
  </div>
  
  );
}

export default AllEvents;
