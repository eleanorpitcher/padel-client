import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

function OneEvent() {

  const [event,setEvent] = useState(null)
  const {id} = useParams()

  useEffect(()=>{
    axios.get(`http://localhost:5005/api/events/${id}`)
    .then((oneEvent)=>{
      setEvent(oneEvent.data)
    })
    .catch((err)=>{
      console.log(err)
    })
  },[id])

  return (
    <div className="flex">
      {event &&
      <div className="w-2/3 p-4">
          <div key={event._id}>
            <h1 className='font-bold text-5xl mb-2' >{event.name}</h1>
            <p className='text-2xl mb-2'>{event.description}</p>
            <button>Sign up</button>
          </div>
      </div>
      }
      {event && 
      <div className="w-1/3 p-4">
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <h2 className="text-lg font-bold mb-2">Organised by:</h2>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <h2 className="text-lg font-bold mb-2">{event.date}</h2>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-lg font-bold mb-2">Participants</h2>
          <ul>
              {event.participants.map((oneParticipant, index)=>(
                <li key={index}>
                  {oneParticipant.name}
                  {/* {oneParticipant.profilePhoto} */}
                </li>
              ))}
            </ul>
        </div>

      </div>
      }
    </div>
  );
  
}

export default OneEvent