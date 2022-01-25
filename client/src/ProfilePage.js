import React, {useEffect, useState} from 'react';
import FullProfileCard from './FullProfileCard';
import ProfileForm from './ProfileForm';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress'

function ProfilePage({user, setUser}) {
console.log(user)

    const [editClick, setEditClick] = useState(false)
    const [photoDelete, setPhotoDelete] = useState(false)
    if (!user.profile.photos) {
        fetch(`/users/${user.id}`)
        .then(resp => resp.json())
        .then(setUser)
        return <div style={{position: 'relative', top: '12em'}}><CircularProgress color="primary" /></div>
    }
    
  return (
    <div>
        
        {
            editClick 
            ?
            <ProfileForm user={user} type="edit" setUser={setUser} setEditClick={setEditClick}/>
            :
            <>
                <Button type="button" variant="contained" onClick={() => setEditClick(true)}>
                    Edit Profile
                </Button>
                <FullProfileCard match={user} type="self" setPhotoDelete={setPhotoDelete} />
            </>
        }
        
    </div>
  )
}

export default ProfilePage;
