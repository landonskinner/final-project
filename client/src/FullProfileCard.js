import React, { useEffect, useState } from 'react'
import Carousel from 'react-material-ui-carousel'
import StraightenIcon from '@mui/icons-material/Straighten';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import BungalowIcon from '@mui/icons-material/Bungalow';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import styled from 'styled-components'

function FullProfileCard({match, type, setPhotoDelete}) {


    const handlePhotoDelete = (e) => {
        fetch(`/photos/${e.target.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: null
        })
        .then(resp => resp.json())
        .then((data) => {
            setPhotoDelete(true)
            // console.log(e.target.id)
        })
        
    
    }
    // useEffect(() => {
    //     fetch(`/users/${match.id}`)
    //     .then(resp => resp.json())
    //     .then((user) => setPhotos(user.profile.photos))
    // }, [])
    // const profilePhotos = match.profile.photos
    // const renderPhotos = profilePhotos.map(photo => {
    //     if (type === "self") {
    //         return (
    //             <div>
    //                 <button id={photo.id} key={photo.id} onClick={e => handlePhotoDelete(e)}>X</button>
    //                 <img src={photo.image} key={photo.image}/>
    //             </div>
            
    //         )
    //     } else {
    //         return (
    //             <div>
    //                 <img src={photo.image} key={photo.image}/>
    //             </div>
    //         )
    //     }
    // })
    
    return (
        <FullProfileCardStyle>
            <div className="profile-card">
                    <Carousel 
                        autoPlay={false} 
                        id="carousel"
                        navButtonsProps={{style: {display: 'none'}}}
                        navButtonsWrapperProps={{style: {display: 'none'}}}
                    >
                        {match.profile.photos.map((photo) => {
                            return <img src={photo.image} />
                        })}
                    </Carousel>
                    <div className="profile-info">
                    <ul>
                            <li><StraightenIcon fontSize="small" color="primary"/> <span>{match.profile.size}</span></li>
                            <li><EmojiEmotionsIcon fontSize="small" color="primary"/> <span>{match.profile.personality}</span></li>
                            <li><BungalowIcon fontSize="small" color="primary"/> <span>{match.profile.location}</span></li>
                        </ul>
                        <h1>{match.name}, {match.profile.age}</h1>
                        <p className="location"><LocationOnIcon fontSize="small" color="primary"/> miles away</p>
                        
                        <hr/>
                        <p className="bio">{match.profile.bio}</p>
                    </div>
                    
                </div>
        </FullProfileCardStyle>
    )
}

export default FullProfileCard

const FullProfileCardStyle = styled.div`

    margin-top: 2em;
    margin-bottom: 4em;

    .profile-card {
        border: 2px solid grey;
        border-radius: 1.1em;
        margin: auto;
        width: 50%;
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
        width: 100%;
        height: 50vw;
        object-fit: cover;
        border-radius: 1em 1em 0 0;
    }

    .match-alert {
        border: 1px solid grey;
        width: 60%;
        margin: auto;
        border-radius: 1em;
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