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
  const [currentParticipant, setCurrentParticipant] = useState(false);
  const [message, setMessage] = useState('')

  
  // console.log(user.username)

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/events/${id}`)
      .then((response) => {
        const oneEvent = response.data;
        setEvent(oneEvent);
        const foundParticipant = oneEvent.participants.find(participant => participant._id === user._id);
        console.log(foundParticipant)
        setCurrentParticipant(!!foundParticipant);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id, user]);

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

  const handleSubmit = (e) => {
    e.preventDefault()
    const newComment = {
      // username: user.username,
      name: user.name,
      username: user.username,
      message,
      event: id
    };
    axios.post(`${import.meta.env.VITE_API_URL}/api/comments`, newComment)
    .then((comment)=>{
      setEvent(comment.data)
      console.log(comment)
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  console.log(user)

  return (
    <div className="flex" style={{ backgroundColor: "#F5FBEF" }}>
      {event && (
        <div className="w-screen h-screen">
          <div className="flex flex-row justify-between p-5">

            <div className="flex flex-col text-lg px-4 rounded-lg shadow-md" style={{ backgroundColor: "#E8EDE8", width: '20%' }}>
              <strong>Organised by: </strong>
              {event.organizer.name}
              <br></br>@{event.organizer.username}
            </div>
           
            {currentParticipant ? (
              <p className="text-2xl font-bold" style={{color: '#748B75'}}>You're already signed up for this event!</p>
            ) : (
              <button onClick={joinEvent} className="btn-green-3 text-2xl rounded-md px-6">
                Sign up!
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
                        <ul className="flex flex-row justify-center p-10">
                          {event.participants.map((oneParticipant, index) => (
                            <li
                              key={index}
                              className="flex items-center mx-2 p-5 bg-white text-lg rounded-lg shadow-lg"
                              style={{ backgroundColor: "#E8EDE8", width: '20%' }}
                            >
                              <img src={oneParticipant.profilePhoto} alt="" className="w-30 h-20 rounded-full hover:opacity-50" />
                              <div className="flex-1">
                                <h3 className="mx-10 text-left font-bold">{oneParticipant.name}</h3>
                                <h3 className="mx-10 text-left">@{oneParticipant.username}</h3>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  )}
                  {!isLoggedIn && (
                    <div className="flex flex-col pt-3 ">
                      <h2 className="text-3xl font-bold pb-5">
                        How many players are participating?
                      </h2>
                        <p className="text-2xl pb-5 text-center">{event.participants.length}</p>
                    </div>
                  )}
                </div>
              </div>
              {event && (
                <div className="flex flex-col text-center py-10" style={{backgroundColor: '#A4B7A4'}}>
                  <h2 className="text-2xl py-3">
                    {event.organizer.name}, input the results for this match
                  </h2>
                  <Link to={`/events/${id}/results`}>
                    <button className={`btn-green py-4 px-6 rounded-lg mb-2 btn-green-3`}>
                      Results
                    </button>
                  </Link>
                </div>
              )}

            <div className="text-left p-10">
              <h2 className="text-2xl py-3">What do other plays have to say about this event?</h2>
              
              {event.comments.map((oneComment)=>{
                return(
                <div key={oneComment._id} className="flex items-center mb-2 border border-black rounded-md" style={{backgroundColor: 'white', width: '40%'}}>
                  <div className="flex-shrink-0 mr-4">
                    <img src={oneComment.profilePhoto} className="w-20 h-20 rounded-full "/>
                  </div>
                  <div className="flex flex-col">
                      <p className="text-lg">{oneComment.message}</p>
                      <div className="flex flex-row items-center">
                        <p className="text-md mr-2"><strong>{oneComment.username}</strong></p>
                        <p className="text-sm">(@{oneComment.username})</p>
                      </div>
                  </div>
                </div>
                )
              })}
              <h2 className="text-2xl py-3">Add a comment</h2>
              <form onSubmit={handleSubmit}>
                {/* <div className="flex flex-row">
                  <label className="mr-3" htmlFor="">Username</label>
                  <input type="text" placeholder="Enter your comment" onChange={(e) => setUsername(e.target.value)} />
                </div> */}
                <div className="flex flex-row">
                  <textarea type="text" placeholder="Enter your comment" onChange={(e) => setMessage(e.target.value)} style={{width: '50%', height: '100px'}} className="border border-black rounded-md"/>
                </div>
                <button className="btn-green-2 rounded-md py-2 px-4 mt-4">Send</button>
              </form>
            </div>
          </div>
            
            {/*event photo*/}
          </div>
        </div>
      )}
    </div>
  );
}

export default OneEvent;
