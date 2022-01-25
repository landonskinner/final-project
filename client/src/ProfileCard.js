import React, {useState, useEffect} from 'react'

import SwipeButtons from './SwipeButtons'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Carousel from 'react-material-ui-carousel'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StraightenIcon from '@mui/icons-material/Straighten';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import BungalowIcon from '@mui/icons-material/Bungalow';
import Backdrop from '@mui/material/Backdrop';
import styled from 'styled-components'

function ProfileCard({user, userId, loggedInUser, matchUpdate, setMatchUpdate, createMatchChat, addUser, setRefresh}) {

    const [swiped, setSwiped] = useState(false)
    const [matched, setMatched] = useState(false)
    const [distance, setDistance] = useState('')


    useEffect(() => {
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
            setDistance(Math.round(rm * d))
    }, [])

    const handleSwipe = (e, button) => {
        console.log(e.target.name, e.target.id, user)

        // create object to post based on user like/dislike
        const likeObj = () => {
            if (button === 'dislike-button') {
                return {
                    liker_id: userId,
                    liked_id: user.id,
                    matched: false
                }
            } else if (button === 'like-button') {
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

    const handleClose = () => {
        setMatched(false)
    }

    console.log(user)
    return (
        <ProfileCardStyle>
            {matched ?
                <Backdrop onClick={handleClose} open={matched}>
                <div className="match-alert">
                    <h3>{`You have matched with ${user.name}!`}</h3>
                    <IconButton color="primary"><CheckCircleIcon/></IconButton>
                </div>
                </Backdrop>
                :
                <div className="profile-card" style={swiped ? {display:'none'} : {display: ''}}>
                    <Carousel 
                        autoPlay={false} 
                        id="carousel"
                        navButtonsProps={{style: {display: 'none'}}}
                        navButtonsWrapperProps={{style: {display: 'none'}}}
                    >
                        {user.profile.photos.map((photo) => {
                            return <img src={photo.image} />
                        })}
                    </Carousel>
                    <div className="profile-info">
                    <ul>
                            <li><StraightenIcon fontSize="small" color="primary"/> <span>{user.profile.size}</span></li>
                            <li><EmojiEmotionsIcon fontSize="small" color="primary"/> <span>{user.profile.personality}</span></li>
                            <li><BungalowIcon fontSize="small" color="primary"/> <span>{user.profile.location}</span></li>
                        </ul>
                        <h1>{user.name}, {user.profile.age}</h1>
                        <p className="location"><LocationOnIcon fontSize="small" color="primary"/>{distance} miles away</p>
                        
                        <hr/>
                        <p className="bio">{user.profile.bio}</p>
                    </div>
                    <SwipeButtons id={user.id} handleSwipe={handleSwipe}/>
                </div>
            }
        </ProfileCardStyle>
        
    )
}

export default ProfileCard

const ProfileCardStyle = styled.div`
    .profile-card {
        border: 2px solid grey;
        border-radius: 1.1em;
        margin: auto;
        width: 50%;
    }

    .profile-card:first-child {
        z-index: 2;
    }

    .profile-info {
        text-align: left;
        width: 85%;
        margin: auto;
    }

    .location {
        margin-top: 0.25em;
    }

    svg {
        vertical-align: middle;
    }

    hr {
        margin-top: 1em;
        margin-bottom: 1em;
        border-top: 1px solid grey;
    }

    .bio {
        margin-bottom: 1em;
    }

    img {
        flex-shrink: 0;
        min-width: 100%;
        height: 50vw;
        object-fit: cover;
        border-radius: 1em 1em 0 0;
    }

    .match-alert {
        border: 1px solid grey;
        width: 60%;
        margin: auto;
        border-radius: 1em;
        background-color: white;
        z-index: 10;
    }

    .match-alert h3 {
        margin: 0.5em;
        margin-bottom: 0.25em;
    }

    .match-alert button {
        margin-bottom: 0.1em;
    }

    h1 {
        color: black;
    }

    ul {
        list-style: none;
        float: right;
    }

    li {
        margin-bottom: 0.25em;
    }

    span {
        margin-left: 0.3em;
    }
`
