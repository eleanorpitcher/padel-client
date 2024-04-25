import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"


function EventResults() {
    const navigate = useNavigate()
    const [matchScoreForUser1, setMatchScoreForUser1] = useState(0)
    const [matchScoreForUser2, setMatchScoreForUser2] = useState(0)
    const [matchScoreForUser3, setMatchScoreForUser3] = useState(0)
    const [matchScoreForUser4, setMatchScoreForUser4] = useState(0)
    const [matchScoreForUser5, setMatchScoreForUser5] = useState(0)
    const [matchScoreForUser6, setMatchScoreForUser6] = useState(0)
    const [matchScoreForUser7, setMatchScoreForUser7] = useState(0)
    const [matchScoreForUser8, setMatchScoreForUser8] = useState(0)


    // const [matchScores, setMatchScores] = useState([{
    //     matchScoreforUser1:0,
    //     matchScoreforUser2:0,
    //     matchScoreforUser3:0,
    // }])

    const [matchScores, setMatchScores] = useState([])
    // const [playerScore, setPlayerScore] = useState(0)

    // const [totalScore, setTotalScore ] = useState(0)
    const [event, setEvent] = useState(null)
    const {id} = useParams()

    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_API_URL}/api/events/${id}`)
        .then((event)=>{
            setEvent(event.data)
            console.log(event.data.participants)
        })
        .catch((err)=>{
            console.log(err)
        })
    },[id])

    const handleSubmit =(e)=>{
        e.preventDefault()
        let arrayToBePosted = []

    let combinedScores = [matchScoreForUser1,matchScoreForUser2,matchScoreForUser3,matchScoreForUser4,matchScoreForUser5,matchScoreForUser6,matchScoreForUser7,matchScoreForUser8]
        for(let i=0; i<event.participants.length; i++ ){
            const playerScore = event.participants[i].totalScore
            
            matchScores.push(playerScore)

        
            const userId = event.participants[i]._id;
            const score = combinedScores[i]

            let objectToBePushed = {player:userId,score};

            arrayToBePosted.push(objectToBePushed)

            
        }
        axios.put(`${import.meta.env.VITE_API_URL}/api/events/${id}/results`, arrayToBePosted)
        .then((response)=>{
            console.log(response)
        })

    }


  return (
    <div className="flex flex-row">
        {event && (
            
            <form action="" className='text-center' onSubmit={handleSubmit}>
            <div className="flex flex-col">
            <label>Player</label>
            {event.participants.map((oneParticipant, index)=>{
                return(
                <div key={oneParticipant._id}>
                   {index+1} {oneParticipant.username}
                </div>
                )
            })}
            </div>
            
            <div className="flex flex-col">
            <label>Scores</label>
           1. <input type="number" placeholder="Insert Score" onChange={(e)=>setMatchScoreForUser1(e.target.value)}/>
           2. <input type="number" placeholder="Insert Score" onChange={(e)=>setMatchScoreForUser2(e.target.value)}/>
           3. <input type="number" placeholder="Insert Score" onChange={(e)=>setMatchScoreForUser3(e.target.value)}/>
           4. <input type="number" placeholder="Insert Score" onChange={(e)=>setMatchScoreForUser4(e.target.value)}/>
           5. <input type="number" placeholder="Insert Score" onChange={(e)=>setMatchScoreForUser5(e.target.value)}/>
           6. <input type="number" placeholder="Insert Score" onChange={(e)=>setMatchScoreForUser6(e.target.value)}/>
           7. <input type="number" placeholder="Insert Score" onChange={(e)=>setMatchScoreForUser7(e.target.value)}/>
           8. <input type="number" placeholder="Insert Score" onChange={(e)=>setMatchScoreForUser8(e.target.value)}/>
            </div>
            <button>Submit Results</button>
            </form>
            
        )}
    </div>
    
  )
}


// onChange={(e) => setMatchScores(matchScores.map((oneScore)=>{
//     return(
//         setPlayerScore(oneScore += e.target.value)
//     )
// }))} 

export default EventResults