import React, { useState } from "react";
import axios from 'axios';
import styled from 'styled-components';

const LoginDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid black;
  width: 50%;
  margin: auto;
  padding: 2%;
`

export default class Login extends React.Component {
  state = {
    credentials: {
      username: 'Lambda School',
      password: 'i<3Lambd4'
    }
  };

  handleChange = e => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value
      }
    });
  };

  handleLogin = e => {
    e.preventDefault();
    axios
      .post('http://localhost:5000/api/login', this.state.credentials)
      .then(res => {
        localStorage.setItem('token', res.data.payload);
        this.props.history.push('/bubble-page');
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <LoginDiv>
        <h1>Login</h1>
        <form onSubmit={this.handleLogin} >
          <input 
            type="text"
            name="username"
            placeholder="Username"
            value={this.state.credentials.username}
            onChange={this.handleChange}
          />
          <input 
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.credentials.password}
            onChange={this.handleChange}
          />
          <button type='submit'>Log In</button>
        </form>
      </LoginDiv>
    )
  }
}
