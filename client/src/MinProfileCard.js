import React, {useState, useEffect} from 'react'
import FullProfileCard from './FullProfileCard'
import styled from 'styled-components'

function MinProfileCard({match, user}) {
    
    // console.log(match.matcher.liker.id)

    const [matchProfile, setMatchProfile] = useState('')
    const [expandProfile, setExpandProfile] = useState(false)

    useEffect(() => {
        if (match.matcher.liker.id !== user.id) {
            setMatchProfile(match.matcher.liker)
        } else {
            setMatchProfile(match.matcher.liked)
        }
    }, [user])

    
    console.log(matchProfile)
    if (!matchProfile) return "Loading matches..."
    return (
        <MinProfileCardStyle>
        {expandProfile ? 
            <div>
                <button type="button" onClick={() => setExpandProfile(false)}>X</button>
                <FullProfileCard match={matchProfile} />
            </div>
            :
            <div className="min-card" onClick={() => setExpandProfile(true)}>
                {/* redo conditional logic below for default img */}
                <img className="min-photo" src={matchProfile.profile.photos[0].image} alt={matchProfile.name} />
                <div>{matchProfile.name}</div>
            </div>
        }
        </MinProfileCardStyle>
    )
}

export default MinProfileCard

const MinProfileCardStyle = styled.div`

    display: inline-block;
    /* .min-card {
        display: inline;
    } */

    .min-photo {
        width: 10%;
    }

`