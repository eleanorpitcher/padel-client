import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import dateFormat, { masks } from "dateformat";
import { AuthContext } from "../context/auth.context";


function AllEvents() {
  const [events, setEvents] = useState([]);
  const [selectedYear, setSelectedYear] = useState(2024)
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);


  const [upcomingEvents, setUpcomingEvents] = useState(true)
  const currentDate = new Date()
  // console.log(currentDate)

  const filteredEvents = upcomingEvents
  ? events.filter(event => new Date(event.date) > currentDate) : events.filter(event => new Date(event.date) < currentDate)
  

  useEffect(() => {
    axios
      .get("http://localhost:5005/api/events")
      .then((allEvents) => {
        setEvents(allEvents.data);
        const sortedDates = allEvents.data.map(event => event.date).map(date => new Date(date)).sort((a,b)=> a-b).map(date => date.toISOString().slice(0, 10))
        console.log(sortedDates) //figure out how to sort by events
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  

  return (
    <div className="p-4">
    <h1 className="text-2xl font-bold mb-4 text-center">{upcomingEvents ? 'Upcoming Events' : 'Past Events'}</h1>
    <div className="flex mb-4 justify-between">
      <div>
        <button onClick={() => setUpcomingEvents(true)}  className={`btn-green-1 px-4 py-2 rounded-lg mb-2 ${!upcomingEvents ? 'btn-white' : ''}`}>Upcoming Events</button>
        <button onClick={() => setUpcomingEvents(false)} className={`btn-green-1 px-4 py-2 rounded-lg mb-2 mx-2 ${upcomingEvents ? 'btn-white' : ''}`}>Past Events</button>
      </div>
      <div>
      {!upcomingEvents && (
        <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
        </select>
      )}
      </div>
      {isLoggedIn && (
        <Link to={'/new-event'}><button className={`btn-green-2 px-4 py-2 rounded-lg mb-2`}>Create your own event!</button></Link>
      )}
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {filteredEvents.map((oneEvent) => {
        return (
          <div
            key={oneEvent._id}
            className="border border-gray-400 p-4 rounded-lg"
          >
            <h1 className="text-xl font-bold mb-2">{oneEvent.name}</h1>
            <h2 className="text-gray-600 mb-2">{dateFormat(oneEvent.date, "fullDate")}</h2>
            <p className="text-gray-700 mb-2">{oneEvent.description}</p>
            <p className="text-gray-700 mb-2">Participants: {oneEvent.participants.length}</p>
            <Link to={`/events/${oneEvent._id}`}><button className="btn-white px-4 py-2 rounded-lg">Learn more</button></Link>
          </div>
        );
      })}
    </div>
  </div>
  
  );
}

export default AllEvents;
