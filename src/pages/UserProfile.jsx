import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "../UserProfile.css";
import editIcon from '../../public/icons8-edit-50.png'
import saveIcon from '../../public/icons8-save-50.png'

function UserProfile() {
  const [imageUrl, setImageUrl] = useState(null);
  const { id } = useParams();
  const [user, setUser] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editableDescription, setEditableDescription] = useState("");


  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/users/${id}`)
      .then((oneUser) => {
        setUser(oneUser.data);
        setEditableDescription(oneUser.data.description || "");
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
  //

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };


  const handleDescriptionChange = (event) => {
    setEditableDescription(event.target.value);
  };


  const saveDescription = () => {
    axios.put(`${import.meta.env.VITE_API_URL}/api/users/${id}`, {
      description: editableDescription,
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      setUser(prevUser => ({ ...prevUser, description: editableDescription }));
      setIsEditing(false);
      console.log("Description updated successfully!");
    }).catch(err => {
      console.error("Error updating description:", err);
    });
  };
 



  const handleFileUpload = (e) => {
    console.log("The file to be uploaded is: ", e.target.files[0]);
    const uploadData = new FormData();
    uploadData.append("imageUrl", e.target.files[0]);

    axios
      .post(`${import.meta.env.VITE_API_URL}/api/upload`, uploadData)

      .then((response) => {
        console.log("Uploaded file URL:", response.data.fileUrl);
        const newProfilePhoto = response.data.fileUrl;
        setImageUrl(newProfilePhoto); // Update imageUrl state

        // Now update the user profile photo in the backend
        axios
          .put(`${import.meta.env.VITE_API_URL}/api/users/${id}/photo`, {
            profilePhoto: newProfilePhoto,
          })
          .then(() => {
            // Update local user state to reflect the new profile photo
            setUser((prevUser) => ({
              ...prevUser,
              profilePhoto: newProfilePhoto,
            }));
          })
          .catch((err) =>
            console.log("Error updating user profile photo:", err)
          );
      })
      .catch((err) => console.log("Error while uploading the file:", err));
  };

  return (
    <>
      {user && (
        <div className="flex flex-col  p-20 pb-4   w-4/5 mx-auto h-screen ">
          <div className=" flex items-center">
            <div className="flex flex-col">
              <label
                htmlFor="profilePhotoInput"
                className="w-60 h-60 rounded-full border-4 border-white  cursor-pointer "
              >
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
              <h1 className="text-5xl font-bold whitespace-nowrap">
                {user.name}
              </h1>
              <h2 className="text-2xl pt-2 pl-1 font-ligth">
                @{user.username}
              </h2>
            </div>
            <div className="flex justify-end gap-2 ml-16 text-4xl gap-x-16  mb-4 p-4  rounded-md shadow-md bg-[#ffffff] bg-opacity-70 ">
              <div className="flex  flex-col items-center">
                <h1 className="font-medium opacity-80">Total Score</h1>
                <p className="text-5xl mt-4 text-green2_color font-bold">
                  {user.totalScore}
                </p>
              </div>

              <div className="flex flex-col items-center">
                <h1 className="font-medium opacity-80">Events played</h1>
                <p className="text-5xl mt-4 text-green2_color font-bold">
                  {user.gamesPlayed.length}
                </p>
              </div>

              <div className="flex flex-col items-center">
                <h1 className="font-medium opacity-80">Position</h1>
                <p className="text-5xl mt-4 text-green2_color font-bold">0</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col mx-auto mt-12 rounded-md shadow-md bg-white pr-2 pl-2 bg-opacity-100 w-2/3">
            <div className="flex justify-between w-full">
              <h1 className="text-4xl text-green2_color font-bold opacity-100 pt-2 pl-4">About Me</h1>
              
                <img onClick={handleEditToggle} className="w-7 h-7 transition duration-500 transform hover:scale-125 mt-4 mr-7" src={editIcon}/>
               
            </div>
            {isEditing ? (
              <textarea
                value={editableDescription}
                onChange={handleDescriptionChange}
                className="text-1xl flex p-4 mr-2"
              />
            ) : (
              <p className="text-1xl flex p-4">{user.description || "No description available."}</p>
            )}
            {isEditing && (
              <img onClick={saveDescription} src={saveIcon} className="w-7 h-7  self-end transition duration-500 transform hover:scale-125 mb-4 mr-4 mt-2"/>
            )}
          </div>

          <div className="mt-20 flex gap-8 mx-auto rounded-md shadow-md mb-16 pl-12 pb-12 pr-12 pt-6 bg-white bg-opacity-100   ">

            <div className="flex flex-col items-center" >
              <h1 className="text-4xl font-bold text-green2_color mb-4">Events Played</h1>

              {

                user.gamesPlayed.length > 0 ? (user.gamesPlayed.map((oneEvent) => {
                  console.log(oneEvent);
                  console.log(new Date(oneEvent.date).getTime());
                  console.log(Date.now());

                  if (new Date(oneEvent.date).getTime() < Date.now()) {
                    return <div key={oneEvent._id}  >

                      <Link to={`/events/${oneEvent._id}`}>
                        <div className="w-[500px] h-96 mb-8 rounded-2xl overflow-hidden relative transition duration-500 hover:scale-105 ">
                          <img className="w-full h-full object-cover opacity-20" src={oneEvent.photo} alt={`Event photo for ${oneEvent.name}`} />
                          <div className="absolute inset-0 flex flex-col items-center justify-center text-black text-xl font-bold z-10">
                            <p className="text-4xl ">{oneEvent.name}</p>
                            <p className="opacity-100 text-green">{oneEvent.date}</p>
                            <div className=" bg-green2_color p-2 rounded-xl">
                              <p className="text-white">Score: {oneEvent.results[0].score}</p>
                            </div>

                          </div>
                        </div>
                      </Link>


                    </div>
                  }
                })
                ) : (
                  <Link to={`/events`}>
                  <div className="text-center text-xl text-white font-bold bg-green1_color bg-opacity-90 p-2 rounded-lg  transition duration-500 hover:scale-105">
                    <p className="text-2xl">No events available</p>
                    <p className="text-black">Click here to sign up for one</p>
                  </div>
                  </Link>
                )}
            </div>
            <div className="flex flex-col items-center" >

              <h1 className="text-4xl font-bold text-green2_color mb-4 ">Upcoming Events</h1>

              {user.gamesPlayed.some((oneEvent) => new Date(oneEvent.date).getTime() > Date.now()) ? (
                user.gamesPlayed.filter((oneEvent) => new Date(oneEvent.date).getTime() > Date.now())
                  .map((oneEvent) => (
                    <div key={oneEvent._id} className="w-[500px] h-96 mb-12 rounded-2xl overflow-hidden relative  transition duration-500 hover:scale-105 ">
                      <Link to={`/events/${oneEvent._id}`}>
                      <img className="w-full h-full object-cover opacity-20" src={oneEvent.photo} alt={`Event photo for ${oneEvent.name}`} />
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-black text-xl font-bold z-10">
                        <p className="text-4xl">{oneEvent.name}</p>
                        <p className="opacity-100 text-green">{oneEvent.date}</p>
                        <div className="bg-green2_color p-2 rounded-xl">
                          <p className="text-white">Score: {oneEvent.results[0].score}</p>
                        </div>
                      </div>
                      </Link>
                    </div>
                  ))
              ) : (
                <Link to={`/events`}>
                <div className="flex flex-col items-center justify-center text-center text-xl text-white font-bold bg-green1_color bg-opacity-90 w-[500px] h-96 rounded-lg transition duration-500 hover:scale-105">
                  <p className="text-5xl">No events available</p>
                  <p className="text-black">Click here to sign up for one</p>
                </div>
              </Link>
              )}
            </div>
          </div>
          <div className="text-white_color">Space</div>
        </div>
      )}
    </>
  );
}

export default UserProfile;
