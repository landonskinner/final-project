import React from 'react'
import SwipeContainer from './SwipeContainer'

function Home({userId, matchUpdate, setMatchUpdate, createMatchChat, addUser, loggedInUser, setRefresh}) {
    return (
        <div>
            <SwipeContainer userId={userId} setRefresh={setRefresh} loggedInUser={loggedInUser} matchUpdate={matchUpdate} setMatchUpdate={setMatchUpdate} createMatchChat={createMatchChat} addUser={addUser}/>
        </div>
    )
}

export default Home
