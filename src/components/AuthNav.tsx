import React from 'react';

import Navbar from 'react-bulma-components/lib/components/navbar';

import LoginOutButton from './LoginOutButton';

const AuthNav = () => (
  <Navbar.Container position='end'>
    <Navbar.Item renderAs='div'>
      <Navbar.Link arrowless={true}>
        <LoginOutButton/>
      </Navbar.Link>
    </Navbar.Item>
  </Navbar.Container>
)

export default AuthNav;
