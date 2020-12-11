import React from 'react';

import { Control, Field, Input, Label } from 'react-bulma-components/lib/components/form';
import Heading from 'react-bulma-components/lib/components/heading';
import Section from 'react-bulma-components/lib/components/section';
import Tile from 'react-bulma-components/lib/components/tile';

import { Player } from '../constants';
import { PlayerSelector } from '../components';
import * as User from '../services/User';

interface ProfileProps {}
interface ProfileState {
  player: Player
}

class Profile extends React.Component<ProfileProps, ProfileState> {
  userData = User.localData();

  constructor(props: ProfileProps) {
    super(props);
    this.state = {
      player: this.userData.player
    };
  }

  playerHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value as Player;
    this.setState({ player: value });
  }

  submitHandler = () => {}

  render() {
    return (
      <Section>
        <Heading className='has-text-centered'>{this.userData.username}</Heading>
        <form onSubmit={this.submitHandler}>
          <Tile kind='ancestor'>
            <Field>
              <Label>Player Sprite</Label>
              <Control>
                <PlayerSelector parentForm={this}/>
              </Control>
            </Field>
          </Tile>
        </form>
      </Section>
    )
  }
}

export default Profile;
