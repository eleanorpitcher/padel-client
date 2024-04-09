import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function UserProfile() {
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
  return (
    <div className="flex justify-center items-center gap-4">
      <h1>{user.name}</h1>
      <h2>@{user.username}</h2>
      <img src={user.profilePhoto} alt="" className="w-20" />
    </div>
  );
}

export default UserProfile;
