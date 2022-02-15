import React, {useState} from 'react';
import FullProfileCard from './FullProfileCard';
import ProfileForm from './ProfileForm';
import Button from '@mui/material/Button';

function ProfilePage({user, setUser}) {

    const [editClick, setEditClick] = useState(false)

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
                    <FullProfileCard user={user} />
                </>
            }
            
        </div>
    )
}

export default ProfilePage;
