import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import SlideButton from "../components/SlideButton";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { authenticateUser } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    const reqBody = {
      email,
      password,
    };

    axios
      .post(`${import.meta.env.VITE_API_URL}/auth/login`, reqBody)
      .then((result) => {
        localStorage.setItem("authToken", result.data.authToken);
        authenticateUser();
        navigate("/");
      })
      .catch((err) => {
        setError(err);
        console.log(err);
      });
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="flex flex-row text-center justify-around bg-white_color items-center h-screen overflow-hidden -mt-16">
      <div className="flex flex-col  items-center ">
        <img src="../../public/loginimg.png" alt="" className="w-96" />
        <h1 className="text-olive_color text-6xl font-bold">
          Together we play better!
        </h1>
      </div>
      <div className="w-2/5 ">
        <form
          action=""
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 border-2 rounded-lg p-20 bg-white_color shadow-custom"
        >
          <label>
            <input
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Email"
              className="pl-4 w-3/4 h-14 border-olive_color_lighter rounded-lg border-2 focus:outline-olive_color text-xl "
            />
          </label>

          <label>
            <input
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Password"
              className="pl-4 w-3/4 h-14 border-olive_color_lighter rounded-lg border-2 focus:outline-olive_color text-xl "
            />
          </label>

          {<SlideButton></SlideButton>}

          <hr className="mt-10 mb-6" />
          <h1 className="text-brown_color">Don't have an account?</h1>
          <Link to="/signup">
            <button className="bg-white_color text-brown_color text-md w-2/4 mx-auto  border-2 border-brown_color py-2 px-2 hover:bg-brown_color hover:text-white_color">
              Sign up
            </button>
          </Link>

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

export default Login;
