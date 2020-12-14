import React from 'react';
import { Link } from 'react-router-dom';

import Navbar from 'react-bulma-components/lib/components/navbar';

import * as User from '../services/User';

import LogoutButton from './LogoutButton';

// TODO: Replace logo
import logo from '../logo.svg';
import './NavBar.scss';

interface NavBarProps {}

interface NavBarState {
  active: boolean;
  authenticated: boolean;
}

class NavBar extends React.Component<NavBarProps, NavBarState> {
  constructor(props: NavBarProps) {
    super(props);
    this.state = {
      active: false,
      authenticated: User.isAuthenticated()
    };
  }

  componentDidUpdate() {
    if (this.state.authenticated !== User.isAuthenticated()) {
      this.setState({ authenticated: User.isAuthenticated() });
    }
  }

  toggleActive = () => {
    this.setState({ active: !this.state.active });
  }

  collapse = () => {
    this.setState({ active: false });
  }

  render() {
    let authNav = null;
    let endNav = (
      <>
        <Navbar.Item renderAs='div'>
          <Link to='/register' onClick={this.collapse}>
            <Navbar.Link arrowless={true}>Register</Navbar.Link>
          </Link>
        </Navbar.Item>

        <Navbar.Item renderAs='div'>
          <Link to='/login' onClick={this.collapse}>
            <Navbar.Link arrowless={true}>Login</Navbar.Link>
          </Link>
        </Navbar.Item>
      </>
    );

    if (this.state.authenticated) {
      authNav = (
        <Navbar.Item renderAs='div'>
          <Link to='/profile' onClick={this.collapse}>
            <Navbar.Link arrowless={true}>Profile</Navbar.Link>
          </Link>
        </Navbar.Item>
      );

      endNav = (
        <Navbar.Item renderAs='div'>
          <div onClick={this.collapse}>
            <LogoutButton/>
          </div>
        </Navbar.Item>
      );
    }

    return (
      <Navbar color='dark' fixed='top' active={this.state.active}>
        <Navbar.Brand>
          <Navbar.Item renderAs='div'>
            <img src={logo} alt='Placeholder logo' style={{ width: 40 }}/>
          </Navbar.Item>
          <Navbar.Burger onClick={this.toggleActive}/>
        </Navbar.Brand>
        <Navbar.Menu>
          <Navbar.Container>
            <Navbar.Item renderAs='div'>
              <Link to='/' onClick={this.collapse}>
                <Navbar.Link arrowless={true}>Home</Navbar.Link>
              </Link>
            </Navbar.Item>

            <Navbar.Item renderAs='div'>
              <Link to='/scores' onClick={this.collapse}>
                <Navbar.Link arrowless={true}>Scoreboard</Navbar.Link>
              </Link>
            </Navbar.Item>

            {authNav}
          </Navbar.Container>

          <Navbar.Container position='end'>
            {endNav}
          </Navbar.Container>
        </Navbar.Menu>
      </Navbar>
    )
  }
}

export default NavBar;
