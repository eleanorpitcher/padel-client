import "./App.css";
import Homepage from "./pages/Homepage";
import AllEvents from "./pages/AllEvents";
import OneEvent from "./pages/OneEvent";
import AddEvent from "./pages/AddEvent";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import UserProfile from "./pages/UserProfile";

import { Route, Routes } from "react-router-dom";
import Scoreboard from "./components/Scoreboard";
import ScoreboardPage from "./pages/ScoreboardPage";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route element={<Homepage />} path="/"></Route>
        <Route element={<AllEvents />} path="/events"></Route>
        <Route element={<OneEvent />} path="/events/:id"></Route>
        <Route element={<AddEvent />} path="/new-event"></Route>
        <Route element={<Login />} path="/login"></Route>
        <Route element={<Signup />} path="/signup"></Route>
        <Route element={<UserProfile />} path="/profile/:id"></Route>
        <Route element={<ScoreboardPage/>} path="/scoreboard"></Route>
      </Routes>
    </>
  );
}

export default App;
