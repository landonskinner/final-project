import React, {useEffect, useState} from 'react'
import ProfileCard from './ProfileCard'

function SwipeContainer({userId}) {

    const [userStack, setUserStack] = useState([])

    useEffect(() => {
        fetch('/users')
        .then(resp => resp.json())
        .then(users => setUserStack(users))
    }, [])

    const renderUserStack = userStack.map((user) => <ProfileCard key={user.id} user={user} userId={userId} />)

    return (
        <div>
            {renderUserStack}
        </div>
    )
}

export default SwipeContainer
