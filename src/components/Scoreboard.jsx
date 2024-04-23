import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Scoreboard() {

    const [players, setPlayers] = useState([])

    useEffect(()=>{
        axios.get(`http://localhost:5005/api/users/`)
        .then((response)=>{
            const allPlayers = response.data

            const playersWhoHaveParticipated = allPlayers.filter(player => player.gamesPlayed.length > 0)
            setPlayers(playersWhoHaveParticipated)
            console.log(allPlayers)

            const scoresSorted = [...playersWhoHaveParticipated].sort((a,b)=>b.totalScore-a.totalScore)
            setPlayers(scoresSorted) 

        })
        .catch((err)=>{
            console.log(err)
        })
    },[])

    return (
        <div className='flex justify-center mt-8 text-center'>
            <div>
                <h1>Scoreboard</h1>
            </div>
            <div className="w-full lg:w-3/4">
                <table className='w-full border-collapse border border-gray-400'>
                <thead>
                <tr className="border border-gray-400 px-4 py-2">
                    <th>#</th>
                    <th>Username</th>
                    <th>Score</th>
                </tr>
                </thead>
                <tbody>
                {players.map((player, index) => (
                    <tr key={player.id} className="border border-gray-400 px-4 py-2">
                        <td>{index + 1}</td>
                        <td>{player.username}</td>
                        <td>{player.totalScore}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        </div>
      );
      
}

export default Scoreboard