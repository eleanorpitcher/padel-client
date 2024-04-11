import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    let newUser = {
      email: email,
      username: username,
      firstName: firstName,
      lastName: lastName,
      password: password,
    };

    axios
      .post("http://localhost:5005/api/users", newUser)
      .then((createdUser) => {
        console.log(createdUser.data);
        navigate("/login");
      })
      .catch((err) => {
        setError(err);
        console.log(err);
      });
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form action="" onSubmit={handleSubmit} className="flex flex-col">
        <label>
          Email
          <input
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </label>

        <label>
          Username
          <input
            type="text"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </label>

        <label>
          First Name
          <input
            type="text"
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
        </label>

        <label>
          Last Name
          <input
            type="text"
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
        </label>

        <label>
          Password
          <input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </label>

        <button>Submit</button>
      </form>
    </div>
  );
}

export default Signup;
