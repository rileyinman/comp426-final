import React from 'react';

import Box from 'react-bulma-components/lib/components/box';
import Heading from 'react-bulma-components/lib/components/heading';
import Section from 'react-bulma-components/lib/components/section';

import { images } from '../assets';
import { Obstacle } from '../constants';
import Cell from './Cell';

interface DialogueProps {
  text: string;
};

class DialogueBox extends React.Component<DialogueProps> {
  render() {
    return (
      <Section>
        <Box>
          <Cell contains={Obstacle.NPC} size={180}/>
          <Heading className='has-text-centered'>Bea</Heading>
        </Box>
        <Box>
          <Heading>{this.props.text}</Heading>
        </Box>
      </Section>
    );
  }
}

export default DialogueBox;
