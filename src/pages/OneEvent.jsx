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
    <div>
    {event && 
      <div key={event._id}>
        <h1>{event.name}</h1>
        <p>{event.date}</p>
        <p>{event.description}</p>
        <ul>
        {event.participants.map((oneParticipant, index)=>(
            <li key={index}>
              {oneParticipant.name}
            </li>
        ))}
        </ul>
      </div>
    }
  </div>
  )
}

export default OneEvent