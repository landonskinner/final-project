import React, {useEffect, useState} from 'react'
import MinProfileCard from './MinProfileCard'
import {ChatEngine, ChatList} from  'react-chat-engine';
import ChatFeed from './components/ChatFeed';


function Matches({userId, matchUpdate, authCreds}) {

    const [matches, setMatches] = useState([])
    
    useEffect(() => {
        fetch(`/own_matches/${userId}`)
        .then(resp => resp.json())
        .then(setMatches)
    }, [userId, matchUpdate])
    console.log(matchUpdate)

    const displayMatches = () => {
        if (matches[0] !== undefined) {
            return matches.map(match => <MinProfileCard key={match.id} match={match} userId={userId} />)
        } else {
            return ''
        }
    }

    return (
        <div>
            {displayMatches()}
            <ChatEngine 
                height="100vh"
                projectID="bf817150-60ae-4184-8c44-560074764477"
                userName={sessionStorage.getItem('username')}
                userSecret={sessionStorage.getItem('password')}
                renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
                renderChatList={(chatAppProps) => <ChatList {...chatAppProps} />}
                renderChatHeader={() => <div />}
                renderChatForm={() => <div />}
            />
        </div>
    )
}

export default Matches
