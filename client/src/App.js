import { useEffect, useState, useContext } from 'react';
import { ChatEngineContext, newChat, addPerson } from 'react-chat-engine';
import {Routes, Route, useNavigate} from 'react-router-dom';
import {useLoadScript} from '@react-google-maps/api';
import Home from './Home';
import Matches from './Matches';
import Login from './Login';


import './App.css';
import ProfileForm from './ProfileForm';
import ProfilePage from './ProfilePage';
import NavBar from './NavBar';


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
        r.json().then((user) => setUser(user));
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

  const { conn } = useContext(ChatEngineContext)

  const createMatchChat = (matched_user) => {
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

  if (!user) return <Login onLogin={setUser} setDistances={setDistances} setAuthCreds={setAuthCreds} />;
  if (user.profile === null) return <ProfileForm user={user} setUser={setUser}/>

  const userId = user.id

  return (
    <div className="App">
      <button onClick={handleLogoutClick}>Logout</button>
      <NavBar />
      <Routes>
        <Route 
          path="/home"
          element={<Home userId={userId} setRefresh={setRefresh} loggedInUser={user} matchUpdate={matchUpdate} setMatchUpdate={setMatchUpdate} createMatchChat={createMatchChat}/>}
        />
        <Route 
          path="/matches"
          element={<Matches userId={userId} matchUpdate={matchUpdate} setMatchUpdate={setMatchUpdate} setChatProps={setChatProps} authCreds={authCreds}/>}
        />
        <Route 
          path="/profile"
          element={<ProfilePage user={user} setUser={setUser}/>}
        />
      </Routes>
    </div>
  );
}

export default App;
