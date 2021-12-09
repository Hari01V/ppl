import React from "react";
import { signOut, getAuth } from 'firebase/auth';

import { Link } from 'react-router-dom';

import { Icon, Button, Container } from 'semantic-ui-react';

import '../styles/Navbar.css';

const Navbar = () => {

  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      console.log("SIGNED OUT!");
    }).catch((err) => {
      console.log(err);
    });
  }

  return (
    <Container className="navbar">
      <Link to="/">
        <span className="logo">
          <Icon name='playstation' size='huge' color='purple' />
        </span>
      </Link>
      <ul className="navbar-list">
        <li className="navbar-list-item">
          <Link to="/">People</Link>
        </li>
        <li className="navbar-list-item">
          <Link to="/myppl">My People</Link>
        </li>
        <li className="navbar-list-item">
          <Button color='youtube'
            onClick={handleSignOut} >
            <Icon name='sign-out' /> Sign Out
          </Button>
        </li>
      </ul>
    </Container>
  )
}

export default Navbar;