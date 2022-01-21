import { useState } from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import axios from "axios";
import {useLoadScript} from '@react-google-maps/api';
// import Header from "./Header";

function Login({ onLogin, setDistances, user, setAuthCreds }) {
  const [showLogin, setShowLogin] = useState(true);
  

  const chatEngineAuth = (email, password) => {
    
    const authObject = {
      'Project-ID': 'bf817150-60ae-4184-8c44-560074764477',
      'User-Name': email,
      'User-Secret': password
    }

    // login request to ChatEngine
    try {
       axios.get('https://api.chatengine.io/chats', {headers: authObject})
      //  setAuthCreds({
      //    'username': email,
      //    'password':
      //  })
      sessionStorage.setItem('username', email);
      sessionStorage.setItem('password', password)
      // try to implement without password in local storage

    } catch (error) {
        console.log('Incorrect credentials!')
    }
  }

  const libraries = ["places"]

  const {isLoaded, loadError} =  useLoadScript({
    // googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    googleMapsApiKey: 'AIzaSyBhDtGcEOvImN19q4Zvye6G9O1VIkrkn5g',
    libraries
  })

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


  return (
    <>
      <h1>Log In</h1>
      {showLogin ? (
        <>
          <LoginForm onLogin={onLogin} chatEngineAuth={chatEngineAuth} getLocation={getLocation} />
          <p>
            <div className="account-create">
            Don't have an account? &nbsp;
            </div>
            <button onClick={() => setShowLogin(false)}>
              Sign Up
            </button>
          </p>
        </>
      ) : (
        <>
          <SignUpForm onLogin={onLogin} chatEngineAuth={chatEngineAuth} getLocation={getLocation} user={user}/>
          <p>
            <div className="account-create">
            Already have an account? &nbsp;
            </div>
            <button onClick={() => setShowLogin(true)}>
              Log In
            </button>
          </p>
        </>
      )}
      </>
  );
}

export default Login;
