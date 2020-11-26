import React from 'react';

import { isAuthenticated } from '../auth/UserService';

import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';

const LoginOutButton = () => {
  // TODO: Use once authentication is implemented
  return isAuthenticated() ? <LogoutButton/> : <LoginButton/>;
}

export default LoginOutButton;
