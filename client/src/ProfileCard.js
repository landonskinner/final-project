import React, {useState} from 'react'
import './styles/ProfileCard.css'
import SwipeButtons from './SwipeButtons'

function ProfileCard({user, userId}) {

    const [swiped, setSwiped] = useState(false)
    const [matched, setMatched] = useState(false)

   
    const userName = 'bentley'

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
                        // console.log(match.id)
                        setMatched(true)
                    }
                    // handle match functionality here
                })
            }
            setSwiped(true)
        })
    }
    console.log(user)
    return (
        <div>
            {matched ?
                `You have matched with ${user.name}!`
                :
                <div className="profile-card" style={swiped ? {display:'none'} : {display: ''}}>
                    <h1>{user.name}</h1>
                    {/* <h3>{user.profile.age}</h3>
                    <p>{user.profile.bio}</p> */}
                    <SwipeButtons id={user.id} handleSwipe={handleSwipe}/>
                </div>
            }
        </div>
        
    )
}

export default ProfileCard
