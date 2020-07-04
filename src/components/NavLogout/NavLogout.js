import React from 'react';

const Nav = ({ logOut }) => {
  return (
    <div className="nav">
      <ul>
        <li onClick={logOut}>Log Out</li>
      </ul>
    </div>
  );
};

export default Nav;
