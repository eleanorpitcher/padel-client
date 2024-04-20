import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

function Homepage() {

  const [events, setEvents] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:5005/api/events')
      .then((response) => {
        setEvents(response.data)
        const sortedEvents = response.data.sort((a, b) => new Date(a.date) - new Date(b.date));
        setEvents(sortedEvents.slice(0, 3));


      })
      .catch((error) => {
        console.error('Error fetching events:', error);
      });

  }, [])


  return (
    <div className='bg-green4_color w-screen flex flex-col items-center  '>

      <div className='w-3/6 flex flex-col justify-center items-center '>
        <h1 className='text-4xl font-extrabold pt-10'>Who we are</h1>
        <p className='text-center mt-4'>Join us at Padel4All in Barcelona for thrilling round-robin padel tournaments!
          Our club is the perfect place to sharpen your skills, meet new friends, and enjoy
          the spirit of competition in a vibrant social setting. Dive into the action and experience
          the camaraderie of our welcoming padel community. Whether you're here to compete or connect,
          every game at Padel4All brings people together. Come play with us!</p>
      </div>

      <div className='w-3/6 flex flex-col justify-center items-center '>
        <h1 className='text-4xl font-extrabold pt-10 pb-5'>Coming soon</h1>
        <div className='w-full'>
          {events.length > 0 ? (
            events.map((event) => (
              <div key={event._id} className="container border-4 border-black mb-4 py-4 text-center">
                <h2>{event.name}</h2>
                <h3>{new Date(event.date).toLocaleDateString()}</h3>
                <p>{event.description}</p>
                <p>Participants: {event.participants.length}</p>
                <Link to={`/events/${event._id}`}>
                  <button className="bg-gray-400 px-3 py-1 rounded-lg">Join</button>
                </Link>
              </div>
            ))
          ) : (
            <p>No upcoming events found.</p>
          )}

        </div>
        <Link to={'/events'}>
          <h1 className='text-4xl font-extrabold pt-2 pb-10'>See more events</h1>
        </Link>


      </div>

      <div className='w-3/6 flex flex-col justify-center items-center pb-10 '>
        <Link to={'/new-event'}>
          <button className='text-4xl font-extrabold pt-4 px-3 py-4 bg-blue-50 rounded-lg hover:bg-blue-600  border-2 border-black'>Create you own event</button>
        </Link>
        <p className='text-center mt-4'>
          At Padel4All, you can create your own padel event with ease!
          Set up the date, time, and participant list through our user-friendly platform.
          Whether for competition or social play, manage and customize your event to enjoy padel your way.
          Start planning today and bring the padel community together at your own event!</p>
      </div>


    </div>
  )
}

export default Homepage