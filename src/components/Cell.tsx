import React from 'react';

import { Item, Obstacle, Player } from '../constants';

import './Cell.scss';
import playerDefault from '../assets/Player.png';
import key from '../assets/Key.png';
import wall from '../assets/Wall.png';

const images = {
  playerDefault,
  key,
  wall
};

interface CellProps {
  contains: Item | Obstacle | Player;
};

class Cell extends React.Component<CellProps> {
  render() {
    return (
      <img className={`cell cell-${this.props.contains}`} src={images[this.props.contains]} alt={`Tile of ${this.props.contains}`}/>
    );
  }
}

export default Cell;
