import React from 'react';
import { RouteComponentProps } from 'react-router';

import Button from 'react-bulma-components/lib/components/button';
import Card from 'react-bulma-components/lib/components/card';
import Columns from 'react-bulma-components/lib/components/columns';
import { Control, Field, Help, Input, Label } from 'react-bulma-components/lib/components/form';
import Heading from 'react-bulma-components/lib/components/heading';
import Message from 'react-bulma-components/lib/components/message';

import { images } from '../assets';
import { Player } from '../constants';
import { register } from '../services';
import './Register.scss';

interface RegisterProps extends RouteComponentProps {}
interface RegisterState {
  username: string,
  password: string,
  player: string,
  usernameValid: boolean,
  error: string
}

class Register extends React.Component<RegisterProps, RegisterState> {
  constructor(props: RegisterProps) {
    super(props);
    this.state = {
      username: '',
      password: '',
      player: Player.PLAYER1,
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

  playerHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    this.setState({ player: value });
  }

  submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    if (!this.state.usernameValid) {
      return;
    }

    if (this.state.username === '' || this.state.password === '') {
      this.setState({ error: 'Please enter a username and password' });
    }

    register(this.state.username, this.state.password, this.state.player)
      .then(() => {
        this.props.history.push({
          pathname: '/login',
          state: { message: 'Successfully registered. Please log in.' }
        });
      }, error => this.setState({ error: 'Could not register user.' }));
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
      )
    }

    return (
    <Columns className='is-centered register'>
      <Columns.Column size='two-fifths'>
        <Card>
          <Card.Header className='register-header'>
            <Card.Header.Title className='is-centered'>
              <Heading size={4} className='register-header-text'>Register</Heading>
            </Card.Header.Title>
          </Card.Header>

          <Card.Content>
            <form className='register-form' onSubmit={this.submitHandler}>
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

              <Field kind='group'>
                <Control className='player-selector'>
                  <Label>Player sprite</Label>
                  {Object.values(Player).map((player, index) => (
                    <div key={index} className='player-radio'>
                      <input
                        type='radio'
                        checked={this.state.player === player}
                        id={player}
                        value={player}
                        name='player'
                        onChange={this.playerHandler}
                      />
                      <Label className='player' htmlFor={player} style={{ backgroundImage: `url(${images[player]})` }}></Label>
                    </div>
                  ))}
                </Control>
              </Field>

              <Field>
                <Control>
                  <Button type='submit' color='primary'>Register</Button>
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

export default Register;
