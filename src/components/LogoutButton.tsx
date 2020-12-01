import React from 'react';
import { Link } from 'react-router-dom';

import Navbar from 'react-bulma-components/lib/components/navbar';

import { logout } from '../services';

const LogoutButton = () => {
  return (
    <Link to='#' onClick={logout}>
      <Navbar.Link arrowless={true}>Logout</Navbar.Link>
    </Link>
  );
}

export default LogoutButton;
