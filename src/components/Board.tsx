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

  componentDidMount() {
    window.addEventListener('keydown', (event) => {
      switch (event.key) {
        case 'ArrowLeft':
          console.log('Left arrow pressed');
          break;
        case 'ArrowRight':
          console.log('Right arrow pressed');
          break;
        case 'ArrowUp':
          console.log('Up arrow pressed');
          break;
        case 'ArrowDown':
          console.log('Down arrow pressed');
          break;
      }
    })
  }

  render() {
    return this.state.cells.map((row, index) => (
      <div key={index}>
        {row.map((cell, index) => <Cell key={index} contains={cell}/>)}
      </div>
    ));
  }
}

export default Board;
