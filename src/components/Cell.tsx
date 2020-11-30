import React from 'react';

import { Item, Obstacle, Floor, Player } from '../constants';

import './Cell.scss';
import { images } from '../assets';

interface CellProps {
  contains: Item | Obstacle | Floor | Player;
};

class Cell extends React.Component<CellProps> {
  render() {
    return (
      <img className={`cell cell-${this.props.contains}`} src={images[this.props.contains]} alt={`Tile of ${this.props.contains}`}/>
    );
  }
}

export default Cell;
