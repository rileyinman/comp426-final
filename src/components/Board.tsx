import React from 'react';

import { Empty, Floor, Item, Obstacle, Player } from '../constants';
import * as User from '../services/User';
import Cell from './Cell';

interface BoardProps {
  cells: (Empty|Floor|Item|Obstacle|Player)[][]
}

class Board extends React.Component<BoardProps> {
  render() {
    const cells = this.props.cells.map((row, index) => (
        <div key={index}>
          {row.map((cell, index) => <Cell key={index} contains={cell}/>)}
        </div>
    ));

    return cells;
  }
}

export default Board;
