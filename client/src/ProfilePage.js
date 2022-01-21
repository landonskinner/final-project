import React from 'react';
import FullProfileCard from './FullProfileCard';
import ProfileForm from './ProfileForm';

function ProfilePage({user, setUser}) {
console.log(user)


  return (
    <div>
        {user.name}
        {user.profile.bio}
        {user.profile.age}
        <FullProfileCard match={user} />
        <ProfileForm user={user} type="edit" setUser={setUser} />
    </div>
  )
}

export default ProfilePage;
