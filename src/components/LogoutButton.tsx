import React from 'react';
import { Link } from 'react-router-dom';

import Button from 'react-bulma-components/lib/components/button';

import { logout } from '../services';

const LogoutButton = () => {
  return (
    <Link to='#' onClick={logout}>Logout</Link>
  );
}

export default LogoutButton;
