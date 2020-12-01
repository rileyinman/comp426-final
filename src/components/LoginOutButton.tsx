import React from 'react';

import { isAuthenticated } from '../services';

import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';

const LoginOutButton = () => {
  return isAuthenticated() ? <LogoutButton/> : <LoginButton/>;
}

export default LoginOutButton;
