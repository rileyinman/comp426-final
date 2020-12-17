import React from 'react';

import { Floor, Item, Obstacle, Player } from '../constants';

import './Cell.scss';
import * as images from '../assets';

interface CellProps {
  contains: Floor | Item | Obstacle | Player;
  size?: number;
}

interface CellState {
  size: number;
}

class Cell extends React.Component<CellProps, CellState> {
  constructor(props: CellProps) {
    super(props);
    this.state = {
      size: this.props.size || 70
    };
  }

  render() {
    return (
      <img
        className={`cell cell-${this.props.contains}`}
        src={images[this.props.contains]}
        alt={`Tile of ${this.props.contains}`}
        style={{ width: this.state.size }}
      />
    );
  }
}

export default Cell;
