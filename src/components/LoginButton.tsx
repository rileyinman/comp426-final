import React from 'react';
import { Link } from 'react-router-dom';

import Navbar from 'react-bulma-components/lib/components/navbar';

const LoginButton = () => {
  return (
    <Link to='/login'>
      <Navbar.Link arrowless={true}>Login</Navbar.Link>
    </Link>
  );
}

export default LoginButton;
