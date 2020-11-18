import React from 'react';

import Section from 'react-bulma-components/lib/components/section';
import Button from 'react-bulma-components/lib/components/button';
import Tile from 'react-bulma-components/lib/components/tile';

import { Board } from '../components';

// TODO: Remove after testing
import { Item, Obstacle, Player } from '../constants';

class Game extends React.Component {
  render() {
    let cells = [
      Obstacle.WALL,
      Player.DEFAULT,
      Item.KEY,
      Obstacle.WALL
    ]
    return (
      <Section>
      <Tile kind='ancestor'>
        <Tile size={8}>
          <Board cells={cells}/>
        </Tile>
        <Tile>
          <Button>Restart Level</Button>
          {/* Put score here? Level timer? */}
        </Tile>
      </Tile>
      </Section>
    );
  }
}

export default Game;
