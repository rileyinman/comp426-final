import React from 'react';
import Button from 'react-bulma-components/lib/components/button';

import { Link } from 'react-router-dom';

const LogoutButton = () => {
  return (
    <Link to='/logout'>Logout</Link>
  );
}

export default LogoutButton;
