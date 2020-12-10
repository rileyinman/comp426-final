import React from 'react';

import Heading from 'react-bulma-components/lib/components/heading';
import Media from 'react-bulma-components/lib/components/media';
import Message from 'react-bulma-components/lib/components/message';
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
        <Message.Header>Bea says:</Message.Header>
        <Message.Body>
          <Media>
            <Media.Item renderAs='figure' position='left'>
              <Cell contains={Obstacle.NPC} size={180}/>
            </Media.Item>
            <Media.Item>
              <Heading subtitle size={5}>{this.props.text}</Heading>
            </Media.Item>
          </Media>
        </Message.Body>
      </Section>
    );
  }
}

export default DialogueBox;
