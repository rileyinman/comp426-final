import React from 'react';

import * as User from '../services/User';

import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';

const LoginOutButton = () => {
  return User.isAuthenticated() ? <LogoutButton/> : <LoginButton/>;
}

export default LoginOutButton;
