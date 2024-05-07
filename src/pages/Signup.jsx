/* eslint-disable no-unused-vars */
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import SlideButtonSU from "../components/SlideButtonSU";

function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    let newUser = {
      email: email,
      username: username,
      name: name,
      password: password,
    };

    axios
      .post(`${import.meta.env.VITE_API_URL}/auth/signup`, newUser)
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
    <div className="flex flex-row text-center justify-around bg-white_color items-center h-screen overflow-hidden -mt-12">
      <div className="flex flex-col  items-center ">
        <img src="../../signupimg.png" alt="" className="w-96" />
        <h1 className="text-olive_color text-6xl font-bold">
          Welcome to the family!
        </h1>
      </div>

      <div className="w-2/5 ">
        <form
          action=""
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 border-2 rounded-lg p-12 bg-white_color shadow-custom"
        >
          <label>
            <input
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Email"
              className="pl-4 w-3/4 h-12 border-olive_color_lighter rounded-lg border-2 focus:outline-olive_color text-xl "
            />
          </label>

          <label>
            <input
              type="text"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              placeholder="Username"
              className="pl-4 w-3/4 h-12 border-olive_color_lighter rounded-lg border-2 focus:outline-olive_color text-xl "
            />
          </label>

          <label>
            <input
              type="text"
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder="Name"
              className="pl-4 w-3/4 h-12 border-olive_color_lighter rounded-lg border-2 focus:outline-olive_color text-xl "
            />
          </label>

          <label>
            <input
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Password"
              className="pl-4 w-3/4 h-12 border-olive_color_lighter rounded-lg border-2 focus:outline-olive_color text-xl "
            />
          </label>

          <button className="bg-white_color text-brown_color text-md w-2/4 mx-auto  border-2 border-brown_color py-4 px-2 hover:bg-brown_color hover:text-white_color">
            Sign up
          </button>

          <hr className="mt-10 mb-6" />
          <h1 className="text-olive_color">Already have an account?</h1>
          <Link to='/login'>{<SlideButtonSU></SlideButtonSU>}</Link>

          {error && (
            <div className="bg-red-800 w-2/4 mx-auto p-2 rounded-lg text-white_color">
              <h1>{error.response.data.message}</h1>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Signup;
