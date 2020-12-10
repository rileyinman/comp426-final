import React from 'react';

import { Floor, Item, Obstacle, Player } from '../constants';

import Box from 'react-bulma-components/lib/components/box';

import './DBox.scss';
import { images } from '../assets';

interface DialogueProps {
  text: string;  
};

class DialogueBox extends React.Component<DialogueProps> {
  render() {
    return (
      <div>
        <img className='npc' src={images[Obstacle.NPC]} alt={`Tile of npc`}/>
        <Box>Bea</Box>
        <Box>
          <p className='dialogue'>{this.props.text}</p>
        </Box>

      </div>

    );
  }
}

export default DialogueBox;