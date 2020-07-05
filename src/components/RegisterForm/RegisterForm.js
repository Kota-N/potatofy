import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import './RegisterForm.css';

const RegisterForm = ({ registerClicked, handleExit }) => {
  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [user, setUser] = useState({});

  useEffect(() => {
    const errorMsg = document.querySelector('small');
    const registerSection = document.getElementById('register-section');
    registerClicked
      ? registerSection.classList.add('show-form')
      : registerSection.classList.remove('show-form');
    errorMsg.classList.remove('show-form');
  }, [registerClicked]);

  const handleRegister = async () => {
    const errorMsg = document.querySelector('small');
    try {
      const userData = await axios.post(
        'https://potatofy.herokuapp.com/register',
        {
          name: nameInput,
          email: emailInput,
          password: passwordInput,
        }
      );
      if (userData.data.name) {
        setNameInput('');
        setEmailInput('');
        setPasswordInput('');
        setUser({
          id: userData.data.id,
          name: userData.data.name,
          entries: userData.data.entries,
        });
        errorMsg.classList.remove('show-form');
      } else {
        errorMsg.classList.add('show-form');
      }
    } catch {
      errorMsg.classList.add('show-form');
    }
  };

  return user.name ? (
    <Redirect to={{ pathname: `/${user.name}`, state: user }} />
  ) : (
    <div id="register-section" className="form-section">
      <div className="x" onClick={handleExit}>
        x
      </div>
      <form action="" className="form" id="form">
        <div className="inputs">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Username"
            onChange={e => setNameInput(e.target.value)}
            value={nameInput}
          />
        </div>
        <div className="inputs">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            onChange={e => setEmailInput(e.target.value)}
            value={emailInput}
          />
        </div>
        <div className="inputs">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            onChange={e => setPasswordInput(e.target.value)}
            value={passwordInput}
          />
        </div>
        <small>ERROR</small>
        <button
          onClick={e => {
            e.preventDefault();
            handleRegister();
          }}
          className="btn form-sign-up"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
