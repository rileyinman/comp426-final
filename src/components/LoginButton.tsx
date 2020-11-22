import React from 'react';
import Button from 'react-bulma-components/lib/components/button';

import { Link } from 'react-router-dom';

const LoginButton = () => {
  return (
    <Link to='/login'>Login</Link>
  );
}

export default LoginButton;
