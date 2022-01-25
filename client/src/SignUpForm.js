
import React, { useState } from "react";
import { useNavigate } from "react-router";
import ProfileForm from "./ProfileForm";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import styled from 'styled-components'
// import { Button, Error, Input, FormField, Label } from "./styles";

function SignUpForm({ onLogin, chatEngineAuth, getLocation, user }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate()

  const chatAccountData = {
    "username": email,
    "secret": password,
    "first_name": name
  }

  // object sent to create User account on ChatEngine platform
  const configObj = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      'PRIVATE-KEY': '{{dc8ac88a-ee8a-4c29-b623-46c3305c4c1c}}'
    },
    body: JSON.stringify(chatAccountData)
  }

  function handleSubmit(e) {
    e.preventDefault();
    setErrors([])
    setIsLoading(true);
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    }).then((r) => {
      // setIsLoading(false);
      if (r.ok) {
        r.json().then((user) => {
          onLogin(user)
          // fetch('/profiles', {
          //   method: "POST",
          //   headers: {
          //     "Content-Type": "application/json"
          //   },
          //   body: JSON.stringify({user_id: user.id})
          // })
          // .then(r => {
          //   if (r.ok) {
          //     r.json().then(() => getLocation(user.id))
          //   } else {
          //     r.json().then((err) => setErrors(err.errors))
          //   }
          // })
          fetch('https://api.chatengine.io/users/', configObj)
          .then(r => {
            if (r.ok) {
              r.json().then(user => {
                chatEngineAuth(email, password)
                navigate('/profile')
              })
            } else {
              r.json().then((err) => setErrors(err.errors))
            }
          })
        });
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
    <SignUpFormStyle>
    <form onSubmit={handleSubmit} className="signup-form">
        <TextField
        required
        label="Name"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        margin="normal"
        fullWidth
      />
      <TextField
        required
        label="Email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        margin="normal"
        fullWidth
      />
      <TextField
        required
        type="password"
        label="Password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        margin="normal"
        fullWidth
      />
      {errors.map((err) => {
          return <Alert severity="error" key={err}>{err}</Alert>
      })}
      <div className="button-container">
        <Button type="submit" variant="contained">
          {isLoading ? "Loading..." : "Sign Up"}
        </Button>
      </div>
    </form>
    </SignUpFormStyle>
  );
}

export default SignUpForm;

const SignUpFormStyle = styled.div`

  form {
    margin: auto;
    width: 60%;
    margin-bottom: 1em;
  }

`