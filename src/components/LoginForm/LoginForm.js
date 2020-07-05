import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

const LoginForm = ({ loginClicked, handleExit }) => {
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [user, setUser] = useState({});

  useEffect(() => {
    const errorMsg = document.querySelector('small');
    const loginSection = document.getElementById('login-section');
    if (loginSection) {
      loginClicked
        ? loginSection.classList.add('show-form')
        : loginSection.classList.remove('show-form');
      errorMsg.classList.remove('show-form');
    }
  }, [loginClicked]);

  const handleLogin = async () => {
    const errorMsg = document.querySelector('small');
    try {
      const userData = await axios.post(
        'https://potatofy.herokuapp.com/login',
        {
          email: emailInput,
          password: passwordInput,
        }
      );
      if (userData) {
        setEmailInput('');
        setPasswordInput('');
        errorMsg.classList.remove('show-form');
        setUser({
          id: userData.data.id,
          name: userData.data.name,
          entries: userData.data.entries,
        });
        handleExit();
      }
    } catch {
      errorMsg.classList.add('show-form');
    }
  };

  return user.name ? (
    <Redirect to={{ pathname: `/${user.name}`, state: user }} />
  ) : (
    <div id="login-section" className="form-section">
      <div className="x" onClick={handleExit}>
        x
      </div>
      <form action="" className="form">
        <div className="inputs">
          <label>Email</label>
          <input
            type="email"
            placeholder="Email"
            onChange={e => setEmailInput(e.target.value)}
            value={emailInput}
          />
        </div>
        <div className="inputs">
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            onChange={e => setPasswordInput(e.target.value)}
            value={passwordInput}
          />
        </div>
        <small>ERROR</small>
        <button
          onClick={e => {
            e.preventDefault();
            handleLogin();
          }}
          className="btn form-sign-up"
        >
          Log In
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
