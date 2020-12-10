import React from 'react';
import { Link, Redirect } from 'react-router-dom';

import Navbar from 'react-bulma-components/lib/components/navbar';

import * as User from '../services/User';

interface LogoutButtonProps {};
interface LogoutButtonState {
  redirect: boolean;
}

class LogoutButton extends React.Component<LogoutButtonProps, LogoutButtonState> {
  constructor(props: LogoutButtonProps) {
    super(props);
    this.state = {
      redirect: false
    };
  }

  logout = () => {
    User.logout();
    this.setState({ redirect: true });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to='/'/>;
    }

    return (
      <Link to='#' onClick={this.logout}>
        <Navbar.Link arrowless={true}>Logout</Navbar.Link>
      </Link>
    );
  }
}

export default LogoutButton;
