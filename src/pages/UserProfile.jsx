import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function UserProfile() {
  const [imageUrl, setImageUrl] = useState(null)
  const { id } = useParams();
  const [user, setUser] = useState("");
  useEffect(() => {
    axios
      .get(`http://localhost:5005/api/users/${id}`)
      .then((oneUser) => {
        setUser(oneUser.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // 

  const handleFileUpload = (e) => {
    console.log("The file to be uploaded is: ", e.target.files[0]);
    const uploadData = new FormData();
    uploadData.append("imageUrl", e.target.files[0]);
  
    axios.post('http://localhost:5005/api/upload', uploadData)
      .then(response => {
        console.log("Uploaded file URL:", response.data.fileUrl);
        const newProfilePhoto = response.data.fileUrl;
        setImageUrl(newProfilePhoto);  // Update imageUrl state
  
        // Now update the user profile photo in the backend
        axios.put(`http://localhost:5005/api/users/${id}/photo`, { profilePhoto: newProfilePhoto })
          .then(() => {
            // Update local user state to reflect the new profile photo
            setUser(prevUser => ({ ...prevUser, profilePhoto: newProfilePhoto }));
          })
          .catch(err => console.log("Error updating user profile photo:", err));
      })
      .catch(err => console.log("Error while uploading the file:", err));
  };



  return (
    <>
      {user && (
        <div className="flex flex-col justify-center items-center gap-4">
          <div className="flex flex-row items-center w-full">
            <div className="flex flex-col">
            <img src={user.profilePhoto} alt="" className="w-32" />
           <label htmlFor=""> <input   type="file"   onChange={(e)=>{handleFileUpload(e)}}/></label>
           </div>
            <div>
              <h1>{user.name}</h1>
              <h2 className="text-sm">@{user.username}</h2>
              <p>{user.description}</p>
            </div>
          </div>

          <div className="flex gap-2">
            <div className="flex flex-col items-center">
              <h1>Total Score</h1>
              <p className="text-5xl">{user.totalScore}</p>
            </div>

            <div className="flex flex-col items-center">
              <h1>Events played</h1>
              <p className="text-5xl">{user.gamesPlayed.length}</p>
            </div>

            <div className="flex flex-col items-center">
              <h1>Position</h1>
              <p className="text-5xl">0</p>
            </div>
          </div>

          <div className="mt-10 flex gap-8">
            <div>
              <h1>Events Played</h1>
              {user.gamesPlayed.map((oneEvent) => {
                console.log(oneEvent);
                console.log(new Date(oneEvent.date).getTime());
                console.log(Date.now());

                if (new Date(oneEvent.date).getTime() > Date.now()) {
                  return <p key={oneEvent._id}>{oneEvent.name}</p>;
                } else if (new Date(oneEvent.date).getTime() < Date.now()) {
                  return <p key={oneEvent._id}>{oneEvent.name}</p>;
                }
              })}
            </div>

            <h1>Upcoming Events</h1>
          </div>
        </div>
      )}
    </>
  );
}

export default UserProfile;
