
import React, { useState } from "react";
import { useNavigate } from "react-router";
import ProfileForm from "./ProfileForm";
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
      'PRIVATE-KEY': '{{08f20fb5-2954-4d90-9e81-021b9bb38069}}'
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
          fetch('/profiles', {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({user_id: user.id})
          })
          .then(resp => resp.json())
          .then(() => {
            getLocation(user.id)
          })
          fetch('https://api.chatengine.io/users/', configObj)
          .then(r => {
            if (r.ok) {
              r.json().then(user => {
                chatEngineAuth(email, password)
                navigate('/home')
              })
            } else {
              r.json().then((err) => console.log(err))
            }
          })
        });
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
    <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          autoComplete="off"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          autoComplete="off"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">
          {isLoading ? "Loading..." : "Login"}
        </button>
        {errors.map((err) => (
          <div key={err}>{err}</div>
        ))}
    </form>
  );
}

export default SignUpForm;
