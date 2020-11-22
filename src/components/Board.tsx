import React from 'react';
import Cell from './Cell';
import { Item, Obstacle, Floor, Player } from '../constants';

interface BoardProps {
  cells: (Item|Obstacle|Floor|Player)[][]
}

interface BoardState {
  cells: (Item|Obstacle|Floor|Player)[][]
}

class Board extends React.Component<BoardProps, BoardState> {
  constructor(props: BoardProps) {
    super(props);
    this.state = {
      cells: props.cells
    };
  }

  render() {
    let renderedCells = this.state.cells.map((row, index) => (
      <div key={index}>
        {row.map((cell, index) => <Cell key={index} contains={cell}/>)}
      </div>
    ));
    return renderedCells;
  }
}

export default Board;
