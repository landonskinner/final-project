import React from 'react'
import SwipeContainer from './SwipeContainer'

function Home({userId}) {
    return (
        <div>
            <SwipeContainer userId={userId}/>
        </div>
    )
}

export default Home
