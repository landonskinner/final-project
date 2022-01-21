import React, {useState} from 'react'
import './styles/ProfileCard.css'
import SwipeButtons from './SwipeButtons'

function ProfileCard({user, userId, loggedInUser, matchUpdate, setMatchUpdate, createMatchChat, addUser, setRefresh}) {

    const [swiped, setSwiped] = useState(false)
    const [matched, setMatched] = useState(false)

    const handleSwipe = (e) => {
        console.log(e.target.className, e.target.id, user)

        // create object to post based on user like/dislike
        const likeObj = () => {
            if (e.target.className === 'dislike-button') {
                return {
                    liker_id: userId,
                    liked_id: user.id,
                    matched: false
                }
            } else if (e.target.className === 'like-button') {
                return {
                    liker_id: userId,
                    liked_id: user.id,
                    matched: true
                }
            }
        }

        // pass object to likes table
        fetch('/likes', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(likeObj())
        })
        .then(resp => resp.json())
        .then(like => {
            // if the user liked, check to see if there is a match
            if (like.matched === true) {
                fetch('/matched', {
                    method: 'POST',
                    headers: {
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify({
                        liker_id: like.liker.id,
                        liked_id: like.liked.id
                    })
                })
                .then(resp => resp.json())
                .then(match => {
                    // console.log(match)
                    if (match.id) {
                        setMatchUpdate(!matchUpdate)
                        createMatchChat(user)
                        setMatched(true)
                    }
                    // handle match functionality here
                })
            }
            setSwiped(true)
            
        })
    }

    const calculateDistance = () => {
        
        const lat = loggedInUser.profile.lat
        const lng = loggedInUser.profile.lng
        const rad_per_deg = Math.PI/180
        const rm = 3963
        const lat_rad = lat * rad_per_deg
        const lat_1 = user.profile.lat
        const lng_1 = user.profile.lng
        const dlat = (lat_1 - lat) * rad_per_deg
        const dlng = (lng_1 - lng) * rad_per_deg
        const lat_rad_1 = lat_1 * rad_per_deg
        const a = Math.sin(dlat/2)**2 + Math.cos(lat_rad) * Math.cos(lat_rad_1) * Math.sin(dlng/2)**2
        const d = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
        return Math.round(rm * d)
    }

    console.log(user)
    return (
        <div>
            {matched ?
                <>
                    <div>{`You have matched with ${user.name}!`}</div>
                    <button type="button" onClick={() => setRefresh(true)} >OK</button>
                </>
                :
                <div className="profile-card" style={swiped ? {display:'none'} : {display: ''}}>
                    <h1>{user.name}</h1>
                    {/* <img src={!!user.profile.photos ? user.profile.photos[0].image : null} /> */}
                    <p>{calculateDistance()} miles away</p>
                    <h3>{user.profile.age}</h3>
                    <p>{user.profile.bio}</p>
                    <SwipeButtons id={user.id} handleSwipe={handleSwipe}/>
                </div>
            }
        </div>
        
    )
}

export default ProfileCard
