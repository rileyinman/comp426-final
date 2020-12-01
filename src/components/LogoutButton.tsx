import React from 'react';
import { Link } from 'react-router-dom';

import Navbar from 'react-bulma-components/lib/components/navbar';

import * as User from '../services/User';

const LogoutButton = () => {
  return (
    <Link to='#' onClick={User.logout}>
      <Navbar.Link arrowless={true}>Logout</Navbar.Link>
    </Link>
  );
}

export default LogoutButton;
