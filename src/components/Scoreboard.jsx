import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Scoreboard() {

    const [players, setPlayers] = useState([])

    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_API_URL}/api/users/`)
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

            <div className='flex flex-col items-center min-h-screen' style={{backgroundColor: '#F5FBEF'}}>
            <div className='text-center'>
                <h1 className='text-6xl pt-10 pb-5 font-bold'>Scoreboard</h1>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg lg:w-3/4">
                {/* <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white">
                    <label htmlFor="table-search" className="sr-only">Search</label>
                </div> */}
                <table className="w-full text-sm text-left rtl:text-right ">
                    <thead className="text-xs text-gray-700 uppercase" style={{backgroundColor: '#A4B7A4'}}>
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                #
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Player
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Score
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {players.map((player, index) => (
                            <tr className={`border-b border-gray-700 ${index === 0 ? 'bg-green-600' : ''}`} key={player.id}>
                                <td className="px-6 py-4 items-center">
                                    {index + 1}
                                </td>
                                <td scope="row" className="flex items-center px-6 py-4 whitespace-nowrap dark:text-white">
                                    <img className="w-10 h-10 rounded-full" src={player.profilePhoto} alt={`${player.name} image`} />
                                    <div className="ps-3">
                                        <div className="text-base font-semibold">{player.name}</div>
                                        <div className="font-normal text-gray-500">@{player.username}</div>
                                    </div>  
                                </td>
                                <td className="px-6 py-4 items-center">
                                    {player.totalScore}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            </div>
      );
      
}

export default Scoreboard