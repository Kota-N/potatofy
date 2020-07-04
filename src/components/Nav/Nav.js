import React, { useState } from 'react';
import './Nav.css';
import RegisterForm from '../RegisterForm/RegisterForm';
import LoginForm from '../LoginForm/LoginForm';

const Nav = () => {
  const [loginClicked, setLoginClicked] = useState(false);
  const [registerClicked, setRegisterClicked] = useState(false);

  const handleExit = () => {
    setLoginClicked(false);
    setRegisterClicked(false);
  };

  return (
    <div className="nav">
      <ul>
        <li
          onClick={() => {
            setLoginClicked(true);
            setRegisterClicked(false);
          }}
        >
          Log In
        </li>
        <li
          onClick={() => {
            setLoginClicked(false);
            setRegisterClicked(true);
          }}
        >
          Register
        </li>
      </ul>
      <LoginForm loginClicked={loginClicked} handleExit={handleExit} />
      <RegisterForm registerClicked={registerClicked} handleExit={handleExit} />
    </div>
  );
};

export default Nav;
