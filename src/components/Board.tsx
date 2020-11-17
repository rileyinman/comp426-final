import React from 'react';

import Cell from './Cell';

import { Item, Obstacle } from '../constants';

interface BoardProps {
  cells: (Item|Obstacle)[]
}

interface BoardState {
  cells: (Item|Obstacle)[]
}

class Board extends React.Component<BoardProps, BoardState> {
  constructor(props: BoardProps) {
    super(props);
    this.state = {
      cells: props.cells
    };
  }

  render() {
    let renderedCells = this.state.cells.map((cell, index) => (
      <div key={index}>
        <Cell contains={cell}/>
      </div>
    ));

    return renderedCells;
  }
}

export default Board;
