import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const reqBody = {
      email,
      password,
    };

    axios
      .post("http://localhost:5005/auth/login", reqBody)
      .then((result) => {
        console.log("jwt token", result.data.authToken);
        navigate("/");
      })
      .catch((err) => {
        setError(err);
        console.log(err);
      });
  };

  return (
    <div>
      <h1>Log In</h1>
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

export default Login;
