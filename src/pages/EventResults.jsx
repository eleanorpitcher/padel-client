import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function EventResults() {
  const navigate = useNavigate();
  const { user, isLoading } = useContext(AuthContext);

  const [matchScoreForUser1, setMatchScoreForUser1] = useState(0);
  const [matchScoreForUser2, setMatchScoreForUser2] = useState(0);
  const [matchScoreForUser3, setMatchScoreForUser3] = useState(0);
  const [matchScoreForUser4, setMatchScoreForUser4] = useState(0);
  const [matchScoreForUser5, setMatchScoreForUser5] = useState(0);
  const [matchScoreForUser6, setMatchScoreForUser6] = useState(0);
  const [matchScoreForUser7, setMatchScoreForUser7] = useState(0);
  const [matchScoreForUser8, setMatchScoreForUser8] = useState(0);

  // const [matchScores, setMatchScores] = useState([{
  //     matchScoreforUser1:0,
  //     matchScoreforUser2:0,
  //     matchScoreforUser3:0,
  // }])

  const [matchScores, setMatchScores] = useState([]);
  // const [playerScore, setPlayerScore] = useState(0)

  // const [totalScore, setTotalScore ] = useState(0)
  const [event, setEvent] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/events/${id}`)
      .then((event) => {
        if (user?._id !== event.data.organizer._id) {
          navigate(`/events/${id}`);
        }
        setEvent(event.data);
        console.log(event.data.participants);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let arrayToBePosted = [];

    let combinedScores = [
      matchScoreForUser1,
      matchScoreForUser2,
      matchScoreForUser3,
      matchScoreForUser4,
      matchScoreForUser5,
      matchScoreForUser6,
      matchScoreForUser7,
      matchScoreForUser8,
    ];
    for (let i = 0; i < event.participants.length; i++) {
      const playerScore = event.participants[i].totalScore;

      matchScores.push(playerScore);

      const userId = event.participants[i]._id;
      const score = combinedScores[i];

      let objectToBePushed = { player: userId, score };

      arrayToBePosted.push(objectToBePushed);
    }
    axios
      .put(
        `${import.meta.env.VITE_API_URL}/api/events/${id}/results`,
        arrayToBePosted
      )
      .then((response) => {
        console.log(response);
      });
  };

  return (
    <div>
      {event && (
        <form action="" onSubmit={handleSubmit} className="text-center">
          <div className=" flex justify-center gap-12 mt-32 ">
            <div className="flex flex-col ">
              <label>
                <h1 className="font-bold text-3xl mb-4 text-green2_color">
                  Players
                </h1>
              </label>
              {event.participants.map((oneParticipant, index) => {
                return (
                  <div
                    key={oneParticipant._id}
                    className="text-brown_color text-xl mb-2 text-left"
                  >
                    <span className="font-semibold ">
                      {index + 1}. {oneParticipant.name}
                    </span>{" "}
                    <span className="text-sm text-gray-500">
                      (@{oneParticipant.username})
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col gap-1 ">
              <label>
                <h1 className="font-bold text-3xl mb-4 text-green2_color">
                  Scores
                </h1>
              </label>
              <div className="text-olive_color text-lg">
                1.{" "}
                <input
                  type="number"
                  placeholder="Insert Score"
                  onChange={(e) => setMatchScoreForUser1(e.target.value)}
                  min={0}
                  className="border-2 border-olive_color_lighter   rounded-lg   focus:border-olive_color focus:outline-none pl-1"
                />
              </div>
              <div className="text-olive_color text-lg">
                2.{" "}
                <input
                  type="number"
                  placeholder="Insert Score"
                  onChange={(e) => setMatchScoreForUser2(e.target.value)}
                  min={0}
                  className="border-2 border-olive_color_lighter   rounded-lg   focus:border-olive_color focus:outline-none pl-1"
                />
              </div>
              <div className="text-olive_color text-lg">
                3.{" "}
                <input
                  type="number"
                  placeholder="Insert Score"
                  onChange={(e) => setMatchScoreForUser3(e.target.value)}
                  min={0}
                  className="border-2 border-olive_color_lighter   rounded-lg   focus:border-olive_color focus:outline-none pl-1"
                />
              </div>
              <div className="text-olive_color text-lg">
                4.{" "}
                <input
                  type="number"
                  placeholder="Insert Score"
                  onChange={(e) => setMatchScoreForUser4(e.target.value)}
                  min={0}
                  className="border-2 border-olive_color_lighter   rounded-lg   focus:border-olive_color focus:outline-none pl-1"
                />
              </div>
              <div className="text-olive_color text-lg">
                5.{" "}
                <input
                  type="number"
                  placeholder="Insert Score"
                  onChange={(e) => setMatchScoreForUser5(e.target.value)}
                  min={0}
                  className="border-2 border-olive_color_lighter   rounded-lg   focus:border-olive_color focus:outline-none pl-1"
                />
              </div>
              <div className="text-olive_color text-lg">
                6.{" "}
                <input
                  type="number"
                  placeholder="Insert Score"
                  onChange={(e) => setMatchScoreForUser6(e.target.value)}
                  min={0}
                  className="border-2 border-olive_color_lighter   rounded-lg   focus:border-olive_color focus:outline-none pl-1"
                />
              </div>
              <div className="text-olive_color text-lg">
                7.{" "}
                <input
                  type="number"
                  placeholder="Insert Score"
                  onChange={(e) => setMatchScoreForUser7(e.target.value)}
                  min={0}
                  className="border-2 border-olive_color_lighter   rounded-lg   focus:border-olive_color focus:outline-none pl-1"
                />
              </div>
              <div className="text-olive_color text-lg">
                8.{" "}
                <input
                  type="number"
                  placeholder="Insert Score"
                  onChange={(e) => setMatchScoreForUser8(e.target.value)}
                  min={0}
                  className="border-2 border-olive_color_lighter   rounded-lg   focus:border-olive_color focus:outline-none pl-1"
                />
              </div>
            </div>
          </div>

          <button className="text-green1_color hover:before:bg-redborder-red-500 relative h-[50px] w-40 overflow-hidden border border-green1_color bg-white px-3  shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-green1_color before:transition-all before:duration-500 hover:text-white hover:shadow-green1_color hover:before:left-0 hover:before:w-full mt-12 font-bold text-lg">
            <span className="relative z-10">Submit results</span>
          </button>
        </form>
      )}
    </div>
  );
}

// onChange={(e) => setMatchScores(matchScores.map((oneScore)=>{
//     return(
//         setPlayerScore(oneScore += e.target.value)
//     )
// }))}

export default EventResults;
