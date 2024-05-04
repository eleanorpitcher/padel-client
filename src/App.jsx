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
import ScoreboardPage from "./pages/ScoreboardPage";
import EventResults from "./pages/EventResults";
import PrivateRoutes from "./components/PrivateRoutes";
import AnonRoutes from "./components/AnonRoutes";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route element={<Homepage />} path="/"></Route>
        <Route element={<AllEvents />} path="/events"></Route>

        <Route element={<OneEvent />} path="/events/:id"></Route>

        <Route
          element={
            <PrivateRoutes>
              <AddEvent />
            </PrivateRoutes>
          }
          path="/new-event"
        ></Route>

        <Route
          element={
            <AnonRoutes>
              <Login />
            </AnonRoutes>
          }
          path="/login"
        ></Route>
        <Route
          element={
            <AnonRoutes>
              <Signup />
            </AnonRoutes>
          }
          path="/signup"
        ></Route>
        <Route element={<UserProfile />} path="/profile/:id"></Route>
        <Route element={<ScoreboardPage />} path="/scoreboard"></Route>
        <Route element={<EventResults />} path="/events/:id/results"></Route>
      </Routes>
    </>
  );
}

export default App;
