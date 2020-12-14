import React from 'react';

import Button from 'react-bulma-components/lib/components/button';
import Columns from 'react-bulma-components/lib/components/columns';
import { Control, Field, Input, Label } from 'react-bulma-components/lib/components/form';
import Heading from 'react-bulma-components/lib/components/heading';
import Section from 'react-bulma-components/lib/components/section';
import Table from 'react-bulma-components/lib/components/table';

import { Player } from '../constants';
import { PlayerSelector } from '../components';
import * as User from '../services/User';

interface ProfileProps {}
interface ProfileState {
  password?: string;
  player: Player;
  scores: number[];
  refresh: boolean;
}

class Profile extends React.Component<ProfileProps, ProfileState> {
  userData = User.localData();

  constructor(props: ProfileProps) {
    super(props);
    this.state = {
      password: undefined,
      player: this.userData.player,
      scores: [],
      refresh: false
    };
  }

  componentDidMount() {
    User.getUser(this.userData.username).then(user => {
      this.setState({ scores: user.scores });
    });
  }

  playerHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const player = event.target.value as Player;
    this.setState({ player });
  }

  passwordHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const password = event.target.value;
    this.setState({ password });
  }

  submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    console.log(this.state.password);
    console.log(this.state.player);

    const refresh = await User.update(this.userData.username, {
      password: this.state.password,
      player: this.state.player
    })

    this.setState({ refresh });
  }

  render() {
    if (this.state.refresh) {
      window.location.reload();
    }

    return (
      <Section>
        <Columns className='is-centered'>
          <Columns.Column size='half'>
            <Heading className='has-text-centered'>{this.userData.username}</Heading>
            <form onSubmit={this.submitHandler}>
              <Field>
                <Label>Player Sprite</Label>
                <Control>
                  <PlayerSelector parentForm={this}/>
                </Control>
              </Field>

              <Field>
                <Label>Edit password</Label>
                <Control>
                  <Input type='password' name='password' title='password' placeholder='password' value={this.state.password} onChange={this.passwordHandler}/>
                </Control>
              </Field>

              <Field>
                <Control>
                  <Button type='submit'>Save</Button>
                </Control>
              </Field>
            </form>

            <br/>

            <Table>
              <thead>
                <tr>
                  <th>Level</th>
                  <th>Best time</th>
                </tr>
              </thead>
              <tbody>
                {this.state.scores.map((score, index) => (
                  <tr key={index}>
                    <th>{index}</th>
                    <td>{score}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Columns.Column>
        </Columns>
      </Section>
    )
  }
}

export default Profile;
