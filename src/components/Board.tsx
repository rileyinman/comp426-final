import React from 'react';

import { Floor, Item, Obstacle, Player } from '../constants';
import Cell from './Cell';

interface BoardProps {
  cells: (Floor|Item|Obstacle|Player)[][];
}

class Board extends React.Component<BoardProps> {
  render() {
    return this.props.cells.map((row, index) => (
      <div key={index}>
        {row.map((cell, index) => <Cell key={index} contains={cell}/>)}
      </div>
    ));
  }
}

export default Board;
