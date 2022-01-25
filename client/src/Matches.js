import React, {useEffect, useState} from 'react'
import MinProfileCard from './MinProfileCard'
import {ChatEngine, ChatList} from  'react-chat-engine';
import ChatFeed from './components/ChatFeed';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import styled from 'styled-components'



function Matches({user, matchUpdate, authCreds}) {

    const [matches, setMatches] = useState([])
    
    useEffect(() => {
        fetch(`/own_matches/${user.id}`)
        .then(resp => resp.json())
        .then(setMatches)
    }, [user, matchUpdate])
    console.log(matchUpdate)

    const displayMatches = () => {
        if (matches[0] !== undefined) {
            return matches.map(match => <MinProfileCard key={match.id} match={match} user={user} />)
        } else {
            return ''
        }
    }

    if (!sessionStorage.getItem('username')) return <CircularProgress color="primary" />

    return (
        <MatchesStyle>
            <div className="match-list">
                {displayMatches()}
            </div>
            <ChatEngine 
                height="100vh"
                projectID="bdccd118-daa8-45d2-b72f-297005ad398a"
                userName={sessionStorage.getItem('username')}
                userSecret={sessionStorage.getItem('password')}
                renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
                renderChatList={(chatAppProps) => <ChatList {...chatAppProps} />}
                renderChatHeader={() => <div />}
                renderChatForm={() => <div />}
            />
        </MatchesStyle>
    )
}

export default Matches

const MatchesStyle = styled.div`

    .match-list {
        border: 2px solid black;
        width: 60%;
        margin: auto;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

`