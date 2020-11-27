import React from 'react';

import Navbar from 'react-bulma-components/lib/components/navbar';

import MainNav from './MainNav';
import AuthNav from './AuthNav';

// TODO: Replace logo
import logo from '../logo.svg';

interface NavBarProps {}
interface NavBarState {
  active: boolean
}

class NavBar extends React.Component<NavBarProps, NavBarState> {
  constructor(props: NavBarProps) {
    super(props);
    this.state = {
      active: false
    };
  }

  toggleActive = () => {
    this.setState({ active: !this.state.active });
  }

  render() {
    return (
      <Navbar color='light' fixed='top' active={this.state.active} onClick={this.toggleActive}>
        <Navbar.Brand>
          <Navbar.Item renderAs='div'>
            <img src={logo} alt='Placeholder logo' style={{ width: 40 }}/>
          </Navbar.Item>
          <Navbar.Burger/>
        </Navbar.Brand>
        <Navbar.Menu>
          <MainNav/>
          <AuthNav/>
        </Navbar.Menu>
      </Navbar>
    )
  }
}

export default NavBar;
