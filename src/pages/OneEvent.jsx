import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import dateFormat from "dateformat";
import DeleteBtn from "../assets/icons8-delete-48.png";
import LikeBtn from '../assets/icons8-thumbs-up-50.png';
import LikeBtnFilled from '../assets/icons8-thumbs-up-50 (1).png';
import { AuthContext } from "../context/auth.context";

function OneEvent() {
  const { isLoggedIn, user } = useContext(AuthContext);
  const { id } = useParams();
  const storedToken = localStorage.getItem("authToken");
  const [event, setEvent] = useState(null);
  const [currentParticipant, setCurrentParticipant] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isPastEvent, setIsPastEvent] = useState(false);
  const currentDate = new Date();

  const [errorMax, setErrorMax] = useState("");

  const navigate = useNavigate()

  function getEvent() {
    console.log(user);
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/events/${id}`)
      .then((response) => {
        const oneEvent = response.data;
        setEvent(oneEvent);

        if (user) {

          const foundParticipant = oneEvent.participants.find(
            (participant) => participant._id === user._id
          );
          setCurrentParticipant(!!foundParticipant);
        }


        if (new Date(oneEvent.date) > currentDate) {
          setIsPastEvent(false);
        } else {
          setIsPastEvent(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }


  useEffect(() => {
    getEvent();
  }, [id]);

  function getEvent() {
    axios.get(`${import.meta.env.VITE_API_URL}/api/events/${id}`, {
      headers: { Authorization: `Bearer ${storedToken}` }
    })
    .then((response) => {
      const oneEvent = response.data;
      setEvent(oneEvent);
      setIsPastEvent(new Date(oneEvent.date) <= currentDate);

      const foundParticipant = oneEvent.participants.some(p => p._id === user?._id);
      setCurrentParticipant(foundParticipant);
    })
    .catch((err) => {
      console.error("Error fetching event:", err);
    });
  }

  function joinEvent() {
    if (event.participants.length >= 8) {
      setErrorMax("Sorry Americano is full, Only 8 players per Americano. Check out our other tournaments");
      return;
    }
    
    axios.put(`${import.meta.env.VITE_API_URL}/api/events/${id}/join`, {}, { headers: { Authorization: `Bearer ${storedToken}` } })
    .then(() => {
      getEvent(); // Refresh the event data
    })
    .catch((err) => {
      console.error("Error joining event:", err);
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) {
      setError("Please provide a message.");
      return;
    }
    const newComment = { name: user.name, username: user.username, message, event: id };
    axios.post(`${import.meta.env.VITE_API_URL}/api/comments`, newComment, { headers: { Authorization: `Bearer ${storedToken}` } })
    .then(() => {
      setMessage("");
      getEvent(); // Refresh the event to include new comment
    })
    .catch((err) => {
      console.error("Error posting comment:", err);
    });
  };

  const handleDeleteComment = (commentID) => {
    axios.delete(`${import.meta.env.VITE_API_URL}/api/comments/${commentID}`, { headers: { Authorization: `Bearer ${storedToken}` } })
    .then(() => {
      getEvent(); // Refresh event data
    })
    .catch((err) => {
      console.error("Error deleting comment:", err);
    });
  };

  const handleLikeComment = (commentId) => {
    axios.put(`${import.meta.env.VITE_API_URL}/api/comments/${commentId}/like`, { userId: user._id }, { headers: { Authorization: `Bearer ${storedToken}` } })
    .then(() => {
      getEvent(); // Refresh event data
    })
    .catch((err) => {
      console.error("Error liking comment:", err);
    });
  };

  const handleUnLikeComment = (commentId) => {
    axios.put(`${import.meta.env.VITE_API_URL}/api/comments/${commentId}/unlike`, { userId: user._id }, { headers: { Authorization: `Bearer ${storedToken}` } })
    .then(() => {
      getEvent(); // Refresh event data
    })
    .catch((err) => {
      console.error("Error unliking comment:", err);
    });
  };



  const deleteEvent = () => {
    axios.delete(`${import.meta.env.VITE_API_URL}/api/events/${id}`)
    .then((deletedEvent)=>{
      console.log(deletedEvent)
      navigate('/events')
    })
    .catch((err) => {
      console.log(err)
    })
  }



  return (
    <div className="flex" style={{ backgroundColor: "#F5FBEF" }}>
      {event && (
        <div className="w-screen h-screen">
          <div className="flex flex-row justify-between p-5">
            <div className="flex flex-col text-lg px-4 rounded-lg shadow-md" style={{ backgroundColor: "#E8EDE8", width: "20%" }}>
              <strong>Organised by:</strong> {event.organizer.name}<br />@{event.organizer.username}
            </div>

            {isPastEvent ? (
              <p>This event has already taken place.</p>
            ) : (
              <>
                
                {isLoggedIn && currentParticipant ? (
                  <p className="text-2xl font-bold" style={{ color: "#748B75" }}>
                    You're already signed up for this event!
                  </p>
                ) : isLoggedIn ? (
                  <button onClick={joinEvent} className="btn-green-3 text-2xl rounded-md px-6">
                    Sign up!
                  </button>
                ) : (
                  <Link to="/login">
                    <button className="btn-green-3 text-2xl rounded-md px-6 py-6">
                      Sign up!
                    </button>
                  </Link>
                )}
              </>
            )}
          </div>

          {errorMax && (
  <div className="flex items-center justify-center mx-auto">
    <p className="text-red-500 font-bold bg-white p-2 rounded-xl ">
      {errorMax}
    </p>
  </div>
)}



          <div className="flex flex-col text-center" key={event._id}>
            <h1 className="text-6xl pt-10 pb-5 font-bold">{event.name}</h1>
            <h2 className="text-lg font-bold pb-4">{dateFormat(event.date, "fullDate")}</h2>
            <div className="text-center flex flex-col">
              <h2 className="text-3xl pt-10 font-bold">Details</h2>
              <div>{!event.description ? <p className="py-5 text-lg">No description provided.</p> : <p className="py-5 text-lg">{event.description}</p>}</div>
              <div className="pt-5">
                {isLoggedIn && (
                  <>
                    <h2 className="text-3xl font-bold pb-5">Who's participating? ({event.participants.length})</h2>
                    <div>
                      <ul className="flex flex-row flex-wrap justify-center p-10">
                        {event.participants.map((oneParticipant, index) => (

                          <li key={index} className="flex items-center mx-2 my-2 p-5 bg-white text-lg rounded-lg shadow-lg" style={{ backgroundColor: "#E8EDE8", width: "20%" }}>
                            <Link to={`/profile/${oneParticipant._id}`}>
                              <img src={oneParticipant.profilePhoto} alt="" className="w-30 h-20 rounded-full hover:opacity-50" />

                          <li
                            key={index}
                            className="flex items-center mx-2 my-2 p-5 bg-white text-lg rounded-lg shadow-lg"
                            style={{
                              backgroundColor: "#E8EDE8",
                              width: "20%",
                              minWidth: "170px",
                            }}
                          >
                            
                            <Link to={`/profile/${oneParticipant._id}`}>
                              <img
                                src={oneParticipant.profilePhoto}
                                alt=""
                                className="participant-image rounded-full hover:opacity-50 mr-5"
                              />

                            </Link>
                            
                            <div className="flex-1">

                              <h3 className="text-left font-bold">
                                {oneParticipant.name}
                              </h3>
                              <h3 className="text-left text-sm">
                                @{oneParticipant.username}
                              </h3>

                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}
                {!isLoggedIn && (
                  <div className="flex flex-col pt-3">
                    <h2 className="text-3xl font-bold pb-5">How many players are participating?</h2>
                    <p className="text-2xl pb-5 text-center">{event.participants.length}</p>
                  </div>
                )}
              </div>
            </div>



            {event && user?._id === event.organizer._id && (
              <div
                className="flex flex-col text-center py-10"
                style={{ backgroundColor: "#A4B7A4" }}
              >
                <h2 className="text-2xl py-3">
                  {event.organizer.name}, input the results for this match
                </h2>

                {user?._id === event.organizer._id && (

                  <Link to={`/events/${id}/results`}>
                    <button className="before:ease relative h-12 w-40 overflow-hidden border rounded-md border-brown_color text-brown_color font-bold shadow-2xl transition-all before:absolute before:top-1/2 before:h-0 before:w-64 before:origin-center before:-translate-x-20 before:rotate-45 before:bg-brown_color before:duration-300 hover:text-white_color hover:shadow-olive_color hover:before:h-64 hover:before:-translate-y-32">
                      <span className="relative z-10">Results</span>
                    </button>
                  </Link>
                )}

              </div>
            )}

            <div className="text-left p-10">
              <h2 className="text-2xl py-3">What do other players have to say about this event?</h2>
              {event.comments.map((oneComment) => (
                <div key={oneComment._id} className="flex items-center mb-2 border border-black rounded-md" style={{ backgroundColor: "white", width: "40%" }}>
                  <div className="flex-shrink-0 mr-4">
                    <img src={oneComment.profilePhoto} className="w-20 h-20 rounded-full" alt="Profile" />
                  </div>
                  <div className="flex flex-col flex-grow">
                    <p className="text-lg">{oneComment.message}</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-md mr-2"><strong>{oneComment.username}</strong></p>
                        <p className="text-sm">(@{oneComment.username})</p>
                      </div>
                      {user && user.username === oneComment.username ? (
                        <div className="flex items-center mr-4">
                          <img src={DeleteBtn} alt="Delete" style={{ cursor: "pointer", height: "25px", verticalAlign: "middle" }} onClick={() => handleDeleteComment(oneComment._id)} />
                        </div>
                      ) : (
                        <div className="flex items-center mr-4">
                          {oneComment.likes.some(like => like.user.userId === user._id) ? (
                            <img src={LikeBtnFilled} alt="Unlike" style={{ cursor: "pointer", height: "25px", verticalAlign: "middle" }} onClick={() => handleUnLikeComment(oneComment._id)} />
                          ) : (
                            <img src={LikeBtn} alt="Like" style={{ cursor: "pointer", height: "25px", verticalAlign: "middle" }} onClick={() => handleLikeComment(oneComment._id)} />
                          )}
                          <span>{oneComment.likes.length}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
              ))}


              {isLoggedIn && (
                <>
                  <h2 className="text-2xl py-3">Add a comment</h2>
                  <form onSubmit={handleSubmit}>
                    <div className="flex flex-col">
                      <textarea type="text" placeholder="Enter your comment" onChange={(e) => setMessage(e.target.value)} value={message} style={{ width: "50%", height: "100px" }} className="border border-black rounded-md" />
                      {error && <div className="w-1/2 text-center"><h1 className="text-red-500 font-bold mt-1">{error}</h1></div>}
                    </div>
                    <button className="bg-olive_color hover:text-white_color rounded-md py-2 px-4 mt-1">Send</button>
                  </form>
                </>
              )}
              
              {user?._id === event.organizer._id && 
              <div className="flex flex-row justify-end">
                <button className="rounded-md py-4 px-6 mt-1 delete-btn text-lg" onClick={deleteEvent}>Delete Event</button>
              </div>
              }

              {!isLoggedIn && (
                <h2>
                  <Link to="/login" className="hover:bg-olive_color hover:text-white_color hover:p-2 rounded-md font-bold">Log in</Link> or
                  <Link to="/signup" className="hover:bg-olive_color hover:text-white_color hover:p-2 rounded-md font-bold">Sign up</Link> to comment.
                </h2>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OneEvent;