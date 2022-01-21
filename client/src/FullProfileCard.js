import React from 'react'

function FullProfileCard({match}) {

    // const profilePhotos = match.profile.photos
    // const renderPhotos = profilePhotos.map(photo => <img src={photo.image} />)
    

    return (
        <div>
            <div className="profile-photos">
                {/* {renderPhotos} */}
            </div>
            <div className="profile-info">
                <h1>{match.name}</h1>
                <h2>{match.profile.age}</h2>
                <p>{match.profile.size}, {match.profile.personality}</p>
                <p>{match.profile.bio}</p>
            </div>
        </div>
    )
}

export default FullProfileCard
