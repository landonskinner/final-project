import React, { useState } from "react";
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
// import { Button, Error, Input, FormField, Label } from "./styles";

function LoginForm({ onLogin, chatEngineAuth, getLocation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate()

  const handleSubmit= async (e) => {
    e.preventDefault();
    setIsLoading(true);
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((user) => {
          onLogin(user)
          getLocation(user.id)
          chatEngineAuth(email, password)
          navigate('/home')
        });
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* <FormField> */}
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          autoComplete="off"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      {/* </FormField> */}
      {/* <FormField> */}
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
      {/* </FormField> */}
      {/* <FormField> */}
        <button type="submit">
          {isLoading ? "Loading..." : "Login"}
        </button>
      {/* </FormField> */}
      {/* <FormField> */}
        {/* {errors.map((err) => (
          <Error key={err}>{err}</Error>
        ))} */}
      {/* </FormField> */}
    </form>
  );
}

export default LoginForm;
