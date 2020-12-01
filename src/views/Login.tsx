import React from 'react';
import { RouteComponentProps } from 'react-router';

import Button from 'react-bulma-components/lib/components/button';
import Card from 'react-bulma-components/lib/components/card';
import Columns from 'react-bulma-components/lib/components/columns';
import { Control, Field, Help, Input, Label } from 'react-bulma-components/lib/components/form';
import Heading from 'react-bulma-components/lib/components/heading';
import Message from 'react-bulma-components/lib/components/message';

import * as User from '../services/User';
import './Login.scss';

interface LoginProps extends RouteComponentProps {}
interface LoginState {
  username: string,
  password: string,
  usernameValid: boolean,
  error: string
}

class Login extends React.Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props);
    this.state = {
      username: '',
      password: '',
      usernameValid: true,
      error: ''
    }
  }

  usernameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value.includes(' ')) {
      this.setState({ usernameValid: false });
    } else {
      this.setState({ usernameValid: true });
    }
    this.setState({ username: value });
  }

  passwordHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    this.setState({ password: value });
  }

  submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    if (!this.state.usernameValid) {
      return;
    }

    if (this.state.username === '' || this.state.password === '') {
      this.setState({ error: 'Please enter a username and password' });
    }

    User.login(this.state.username, this.state.password)
      .then(() => {
        let page = { pathname: '/' };
        if (this.props.location.state) {
          page = { pathname: (this.props.location as any).state.prevPath };
        }
        this.props.history.push(page);
      }, error => this.setState({ error: 'Could not log in, check credentials' }));
  }

  render() {
    let usernameColor = null;
    let usernameHelp = null;
    if (!this.state.usernameValid) {
      usernameColor = 'danger';
      usernameHelp = <Help color='danger'>Username may not contain spaces</Help>;
    }

    let formStatus = null;
    if (this.state.error !== '') {
      formStatus = (
        <Message color='danger'>
          <Message.Body>
            {this.state.error}
          </Message.Body>
        </Message>
      );
    } else if ((this.props.location as any).state && (this.props.location as any).state.message) {
      formStatus = (
        <Message color='info'>
          <Message.Body>
            {(this.props.location as any).state.message}
          </Message.Body>
        </Message>
      );
    }

    return (
    <Columns className='is-centered login'>
      <Columns.Column size='two-fifths'>
        <Card>
          <Card.Header className='login-header'>
            <Card.Header.Title className='is-centered'>
              <Heading size={4} className='login-header-text'>Login</Heading>
            </Card.Header.Title>
          </Card.Header>

          <Card.Content>
            <form className='login-form' onSubmit={this.submitHandler}>
              <Field>
                <Label>Username</Label>
                <Control>
                  <Input type='text' name='username' title='username' placeholder='username' color={usernameColor} value={this.state.username} onChange={this.usernameHandler} required/>
                </Control>
                {usernameHelp}
              </Field>

              <Field>
                <Label>Password</Label>
                <Control>
                  <Input type='password' name='password' title='password' placeholder='password' value={this.state.password} onChange={this.passwordHandler} required/>
                </Control>
              </Field>

              <Field>
                <Control>
                  <Button type='submit' color='primary'>Login</Button>
                </Control>
              </Field>
              {formStatus}
            </form>
          </Card.Content>
        </Card>
      </Columns.Column>
    </Columns>
    );
  }
}

export default Login;
