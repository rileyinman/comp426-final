import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import Button from 'react-bulma-components/lib/components/button';
import Navbar from 'react-bulma-components/lib/components/navbar';

const LoginButton = () => {
  const location = useLocation();
  return (
    <Link to={{ pathname: '/login', state: { prevPath: location.pathname } }}>
      <Navbar.Link arrowless={true}>Login</Navbar.Link>
    </Link>
  );
}

export default LoginButton;
