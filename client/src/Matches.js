import React, {useEffect, useState} from 'react'
import MinProfileCard from './MinProfileCard'

function Matches({userId}) {

    const [matches, setMatches] = useState([])

    useEffect(() => {
        fetch(`/own_matches/${userId}`)
        .then(resp => resp.json())
        .then(setMatches)
    }, [userId])
    console.log(matches)

    const displayMatches = matches.map(match => <MinProfileCard key={match.id} match={match} userId={userId} />)

    return (
        <div>
            {displayMatches}
        </div>
    )
}

export default Matches
