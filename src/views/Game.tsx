import React from 'react';

import Section from 'react-bulma-components/lib/components/section';
import Button from 'react-bulma-components/lib/components/button';
import Tile from 'react-bulma-components/lib/components/tile';

import { Board } from '../components';

// TODO: Remove after testing
import { Item, Obstacle, Floor, Player } from '../constants';

class Game extends React.Component {
  render() {
    let cells = [
      Obstacle.WALL, Obstacle.WALL, Obstacle.WALL, Obstacle.WALL, Obstacle.WALL, Obstacle.DOOR5, Obstacle.WALL, Obstacle.WALL, Obstacle.WALL, Obstacle.WALL,
      Obstacle.WALL, Item.KEY2, Floor.DEFAULT, Floor.DEFAULT, Floor.DEFAULT, Floor.DEFAULT, Floor.DEFAULT, Obstacle.WALL, Item.KEY5, Obstacle.WALL,
      Obstacle.WALL, Floor.DEFAULT, Obstacle.WALL, Obstacle.WALL, Obstacle.WALL, Obstacle.WALL, Obstacle.WALL, Obstacle.WALL, Floor.DEFAULT, Obstacle.WALL,
      Obstacle.WALL, Obstacle.DOOR3, Obstacle.WALL, Floor.DEFAULT, Floor.DEFAULT, Item.KEY3, Floor.DEFAULT, Obstacle.WALL, Obstacle.DOOR3, Obstacle.WALL,
      Obstacle.WALL, Floor.DEFAULT, Floor.DEFAULT, Floor.DEFAULT, Floor.DEFAULT, Floor.DEFAULT, Floor.DEFAULT, Floor.DEFAULT, Floor.DEFAULT, Obstacle.WALL,
      Obstacle.WALL, Floor.DEFAULT, Floor.DEFAULT, Floor.DEFAULT, Floor.DEFAULT, Floor.DEFAULT, Floor.DEFAULT, Floor.DEFAULT, Floor.DEFAULT, Obstacle.WALL,
      Obstacle.WALL, Floor.DEFAULT, Floor.DEFAULT, Floor.DEFAULT, Floor.DEFAULT, Floor.DEFAULT, Floor.DEFAULT, Floor.DEFAULT, Floor.DEFAULT, Obstacle.WALL,
      Obstacle.WALL, Obstacle.WALL, Obstacle.WALL, Obstacle.WALL, Obstacle.DOOR1, Obstacle.WALL, Obstacle.WALL, Obstacle.DOOR2, Obstacle.WALL, Obstacle.WALL,
      Obstacle.WALL, Item.KEY1, Floor.DEFAULT, Floor.DEFAULT, Floor.DEFAULT, Obstacle.WALL, Item.KEY3, Floor.DEFAULT, Floor.DEFAULT, Obstacle.WALL,
      Obstacle.WALL, Player.DEFAULT, Obstacle.WALL, Obstacle.WALL, Obstacle.WALL, Obstacle.WALL, Obstacle.WALL, Obstacle.WALL, Obstacle.WALL, Obstacle.WALL
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
