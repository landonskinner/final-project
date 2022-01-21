import React, {useState, useEffect} from 'react'
import FullProfileCard from './FullProfileCard'

function MinProfileCard({match, userId}) {
    
    // console.log(match.matcher.liker.id)

    const [matchProfile, setMatchProfile] = useState('')
    const [expandProfile, setExpandProfile] = useState(false)

    useEffect(() => {
        if (match.matcher.liker.id !== userId) {
            setMatchProfile(match.matcher.liker)
        } else {
            setMatchProfile(match.matcher.liked)
        }
    }, [userId])

    
    console.log(matchProfile)
    if (!matchProfile) return "Loading matches..."
    return (
        <div>
        {expandProfile ? 
            <div>
                <button type="button" onClick={() => setExpandProfile(false)}>X</button>
                <div>hello</div>
                <FullProfileCard match={matchProfile} />
            </div>
            :
            <div onClick={() => setExpandProfile(true)}>
                {/* redo conditional logic below for default img */}
                {/* <img src={!!matchProfile.profile ? matchProfile.profile.photos[0].image : ''} alt={matchProfile.name} /> */}
                <div>{matchProfile.name}</div>
            </div>
        }
        </div>
    )
}

export default MinProfileCard
