import { useState } from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import axios from "axios";
import {useLoadScript} from '@react-google-maps/api';
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import PetsIcon from '@mui/icons-material/Pets';
import styled from 'styled-components'
// import Header from "./Header";

function Login({ onLogin, setDistances, user, setAuthCreds, getLocation }) {
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
      //    'password': password
      //  })
      sessionStorage.setItem('username', email);
      sessionStorage.setItem('password', password)
      // try to implement without password in local storage

    } catch (error) {
        console.log('Incorrect credentials!')
    }
  }

  const libraries = ["places"]

  // const {isLoaded, loadError} =  useLoadScript({
  //   // googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  //   googleMapsApiKey: 'AIzaSyBhDtGcEOvImN19q4Zvye6G9O1VIkrkn5g',
  //   libraries
  // })

  


  return (
    <LoginStyle style={{backgroundColor: '#E68282', height: '100vh'}}>
      <div className="header-parent">
        <div className="app-header-login">unLeashed</div>
      </div>
      <div className="login">
        <Paper elevation={4} variant="outlined">
        {showLogin ? (
          <>
            <h1><PetsIcon sx={{fontSize: 40}}/> Login</h1>
            <LoginForm onLogin={onLogin} chatEngineAuth={chatEngineAuth} getLocation={getLocation} />
            <p>
              <Divider className="account-create">
                <Chip label="Don't have an account?" />
              </Divider>
              <Button variant="outlined" onClick={() => setShowLogin(false)}>
                Sign Up
              </Button>
            </p>
          </>
        ) : (
          <>
            <h1><PetsIcon sx={{fontSize: 40}}/> Sign Up</h1>
            <SignUpForm onLogin={onLogin} chatEngineAuth={chatEngineAuth} getLocation={getLocation} user={user}/>
            <div>
              <Divider className="account-create">
                <Chip label="Already have an account?" />
              </Divider>
                <Button variant="outlined" onClick={() => setShowLogin(true)}>
                  Login
                </Button>
            </div>
          </>
        )}
        </Paper>
      </div>
    </LoginStyle>
  );
}

export default Login;

const LoginStyle = styled.div`

  .login:nth-child(2) {
    margin: auto;
    width: 60%;
    position: relative;
    top: 3.5em;
  }

  h1 {
    color: #E68282;
    font-size: 2.5em;
    font-family: 'Fredoka One', cursive;
    letter-spacing: 0.05em;
    margin-top: 0.25em;
  }

  h1 svg {
    position: relative;
    top: 0.1em;
  }

  div {
    text-align: center;
  }

  hr {
    margin: 1em;
  }

  div button {
    margin: 1.5em;
  }

`