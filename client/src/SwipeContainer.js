import React, {useEffect, useState} from 'react'
import ProfileCard from './ProfileCard'
import CircularProgress from '@mui/material/CircularProgress';
import styled from 'styled-components'

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
            return <div style={{position: 'relative', top: '12em'}}><CircularProgress color="primary" /></div>
        } else if (userStack.length === 0) {
            return <div>You've seen all users! Try updating your preferences for more.</div>
        } else {
            return userStack.map((user) => <ProfileCard key={user.id} setRefresh={setRefresh} loggedInUser={loggedInUser} user={user} userId={userId} matchUpdate={matchUpdate} setMatchUpdate={setMatchUpdate} createMatchChat={createMatchChat} addUser={addUser}/>)
        }
    }
    
    return (
        <SwipeContainerStyle>
        <div className="user-stack">
            {renderUserStack()}
        </div>
        </SwipeContainerStyle>
    )
}

export default SwipeContainer

const SwipeContainerStyle = styled.div`

    
/* 
    .full-card {
        display: block;
    }

    .full-card ~ .full-card {
        display: none;
    } */

`