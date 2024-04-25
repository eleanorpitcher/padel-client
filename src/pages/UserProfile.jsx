import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function UserProfile() {
  const [imageUrl, setImageUrl] = useState(null)
  const { id } = useParams();
  const [user, setUser] = useState("");
  useEffect(() => {
    axios
      .get(`https://padel-server.adaptable.app/api/users/${id}`)
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
  
    axios.post('https://padel-server.adaptable.app/api/upload', uploadData)
      .then(response => {
        console.log("Uploaded file URL:", response.data.fileUrl);
        const newProfilePhoto = response.data.fileUrl;
        setImageUrl(newProfilePhoto);  // Update imageUrl state
  
        // Now update the user profile photo in the backend
        axios.put(`https://padel-server.adaptable.app/api/users/${id}/photo`, { profilePhoto: newProfilePhoto })
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
        <div className="flex flex-col items-center p-20   bg-white_color h-screen">
          <div className="flex flex-row items-center  " >
            <div className="flex flex-col">

            <label htmlFor="profilePhotoInput" className="w-60 h-60 rounded-full border-4 border-white  cursor-pointer ">
            
            <input 
                type="file" 
                id="profilePhotoInput"
               className="hidden"
                onChange={handleFileUpload}
                accept="image/*"
              />
              
              <div className="relative ">
                <img
                  src={user.profilePhoto || imageUrl}
                  alt="Profile"
                  className="w-80 h-60 rounded-full  object-cover hover:opacity-50 "

                />
                <p className="absolute inset-0 rounded-full bg-white bg-opacity-50 flex items-center justify-center text-black font-bold text-3xl opacity-0 transition-opacity duration-300 hover:opacity-100">
    Change Photo
  </p>
                   </div>

                
              </label>


            
           </div>





           
            <div className="ml-14">
              <h1 className="text-6xl font-bold whitespace-nowrap">{user.name}</h1>
              <h2 className="text-2xl pt-2 pl-1 font-ligth">@{user.username}</h2>
              <p>{user.description}</p>
            </div>

            <div className="flex gap-2 ml-16 text-4xl gap-x-16 container mb-4 p-4 rounded-md shadow-md bg-[#ffffff] bg-opacity-70"
                >
            <div className="flex flex-col items-center">  
              <h1 className="font-medium opacity-80">Total Score</h1>
              <p className="text-5xl mt-4 text-green2_color font-bold">{user.totalScore}</p>
            </div>

            <div className="flex flex-col items-center">
              <h1 className="font-medium opacity-80">Events played</h1>
              <p className="text-5xl mt-4 text-green2_color font-bold">{user.gamesPlayed.length}</p>
            </div>

            <div className="flex flex-col items-center">
              <h1 className="font-medium opacity-80">Position</h1>
              <p className="text-5xl mt-4 text-green2_color font-bold">0</p>
            </div>
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
