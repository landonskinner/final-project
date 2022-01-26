import { useEffect, useState, useContext } from 'react';
import { ChatEngineContext, newChat, addPerson } from 'react-chat-engine';
import {Routes, Route, useNavigate} from 'react-router-dom';
import {useLoadScript} from '@react-google-maps/api';
import Home from './Home';
import Matches from './Matches';
import Login from './Login';
import Button from '@mui/material/Button'


import './App.css';
import ProfileForm from './ProfileForm';
import ProfilePage from './ProfilePage';
import NavBar from './NavBar';
import FullProfileCard from './FullProfileCard';

import {ChatEngine, ChatList} from  'react-chat-engine';
import ChatFeed from './components/ChatFeed';

function App() {
  const [user, setUser] = useState(null);
  const [matchUpdate, setMatchUpdate] = useState(false)
  const [chatProps, setChatProps] = useState({})
  const [matchChat, setMatchChat] = useState(false)
  const [distances, setDistances] = useState({})
  const [refresh, setRefresh] = useState(false)
  const [authCreds, setAuthCreds] = useState({
    username: "",
    password: ""
  })
  console.log(authCreds)

  const navigate = useNavigate()
  // const libraries = ["places"]

  // const {isLoaded, loadError} =  useLoadScript({
  //   // googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  //   googleMapsApiKey: 'AIzaSyBhDtGcEOvImN19q4Zvye6G9O1VIkrkn5g',
  //   libraries
  // })

  

  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setUser(user)
          getLocation(user.id)
        });
      }
    });
    
  }, []);

  const handleLogoutClick = () => {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        sessionStorage.clear()
        setUser(null);
        navigate('/')
      }
    });
  }

  const { connecting, conn } = useContext(ChatEngineContext)
  console.log(connecting, conn)
  const createMatchChat = (matched_user) => {
    console.log(conn)
    if (!connecting && conn) {
    newChat(
      conn,
      { title: `${matched_user.name} & ${user.name}`},
      (chat) => {
        addPerson(
          conn,
          chat.id,
          matched_user.email,
          () => {
            addPerson(
              conn,
              chat.id,
              user.email,
              () => {console.log('done')}
            )
          }
        )
      }
    )
    }
  }

  const getLocation = (userId) => {
    navigator.geolocation.getCurrentPosition((position) => {
      fetch(`/profiles/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            lat: position.coords.latitude,
            lng: position.coords.longitude
        })
      })
      .then(resp => resp.json())
      .then(data => {
        console.log(data)
      })
    }, () => null)
  }

  if (!user) return (
    <>
    {/* <header className="app-header-login">unLeashed</header> */}
      <Login onLogin={setUser} setDistances={setDistances} setAuthCreds={setAuthCreds} getLocation={getLocation} />
  </>
  )
  if (user.profile === null) return (
    <div className="signup-background">
      <ProfileForm user={user} setUser={setUser} getLocation={getLocation}/>
    </div>
  )
  
  const userId = user.id

  return (
    <div className="App">
      <header className="app-header">unLeashed</header>
      <div className="navbar">
      <NavBar handleLogoutClick={handleLogoutClick}/>
      </div>
      <Routes>
        <Route 
          path="/home"
          element={<Home userId={userId} setRefresh={setRefresh} loggedInUser={user} matchUpdate={matchUpdate} setMatchUpdate={setMatchUpdate} createMatchChat={createMatchChat}/>}
        />
        <Route 
          path="/matches"
          element={<Matches user={user} matchUpdate={matchUpdate} setMatchUpdate={setMatchUpdate} setChatProps={setChatProps} authCreds={authCreds}/>}
        />
        <Route 
          path="/profile"
          element={<ProfilePage user={user} setUser={setUser}/>}
        />
        
      </Routes>
      <div style={{display: 'none'}}>
        <ChatEngine 
                height="80vh"
                projectID="bdccd118-daa8-45d2-b72f-297005ad398a"
                userName={sessionStorage.getItem('username')}
                userSecret={sessionStorage.getItem('password')}
                renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
                renderChatList={(chatAppProps) => <ChatList {...chatAppProps} />}
            />
      </div>
    </div>
  );
}

export default App;
