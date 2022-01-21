import React, {useState} from 'react'
import {getOrCreateChat, addPerson} from 'react-chat-engine'

function ChatList(props, value) {
    // const [state, setState] = useState({
    //     value: '',
    //     others: []
    // })
    console.log(value)
    
    const newMatchChat = () => {
        getOrCreateChat(
            props,
            {
                title: 'pls work test !!!'
            }
        )
        // get id of created chat
        const chatsId = props.chats[Object.keys(props.chats)[Object.keys(props.chats).length - 1]].id
        const username = 'carlisle@gmail.com'
        addPerson(
            props.conn,
            chatsId,
            username,
            () => {
                // setState({...state, value: ''})
            }
        )
    }

    // newChat(
    //     props,
    //     {title: 'chat success'}
    // )
    return (
        <div>
            {/* {newMatchChat()} */}
        </div>
    )
}

export default ChatList
