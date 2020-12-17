import React from 'react';

import { Label } from 'react-bulma-components/lib/components/form';

import * as images from '../assets';
import { Player } from '../constants';

import './PlayerSelector.scss';

interface PlayerSelectorProps {
  parentForm: any;
}

class PlayerSelector extends React.Component<PlayerSelectorProps> {
  render() {
    return (
      <div className='player-selector'>
        {Object.values(Player).map((player, index) => (
          <div key={index} className='player-radio'>
            <input
              type='radio'
              checked={this.props.parentForm.state.player === player}
              id={player}
              value={player}
              name='player'
              onChange={this.props.parentForm.playerHandler}
            />
            <Label className='player' htmlFor={player} style={{ backgroundImage: `url(${images[player]})` }}></Label>
          </div>
        ))}
      </div>
    )
  }
}

export default PlayerSelector;
