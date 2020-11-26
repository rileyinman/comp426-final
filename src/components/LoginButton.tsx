import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import Button from 'react-bulma-components/lib/components/button';

const LoginButton = () => {
  const location = useLocation();
  return (
    <Link to={{ pathname: '/login', state: { prevPath: location.pathname } }}>Login</Link>
  );
}

export default LoginButton;
