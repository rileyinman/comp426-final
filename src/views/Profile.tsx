import React from 'react';

import { Control, Field, Help, Input, Label } from 'react-bulma-components/lib/components/form';

import { Player } from '../constants';
import { Cell } from '../components';
import * as User from '../services/User';

interface ProfileProps {}
interface ProfileState {
  player: Player
}

class Profile extends React.Component<ProfileProps, ProfileState> {
  constructor(props: ProfileProps) {
    super(props);
    this.state = {
      player: User.localData().player
    };
  }

  render() {
    return (
      <Cell contains={this.state.player}/>
    )
  }
}

/* const Profile = () => ( */
/*   <div>Placeholder</div> */
/* ) */

export default Profile;
