import React, {useEffect, useState} from 'react'
import ProfileCard from './ProfileCard'

function SwipeContainer({userId, matchUpdate, setMatchUpdate, createMatchChat, addUser, loggedInUser, setRefresh}) {

    const [userStack, setUserStack] = useState('')

    useEffect(() => {
        fetch('/users')
        .then(resp => resp.json())
        .then(users => setUserStack(users))
    }, [userId])
    console.log(userStack)
    const renderUserStack = () => {
        if (!userStack) {
            return null
        } else {
            return userStack.map((user) => <ProfileCard key={user.id} setRefresh={setRefresh} loggedInUser={loggedInUser} user={user} userId={userId} matchUpdate={matchUpdate} setMatchUpdate={setMatchUpdate} createMatchChat={createMatchChat} addUser={addUser}/>)
        }
    }
    
    return (
        <div>
            {renderUserStack()}
        </div>
    )
}

export default SwipeContainer
