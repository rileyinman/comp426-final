import React from 'react';

import { Item, Obstacle, Floor, Player } from '../constants';
import { indexOf2d } from '../helpers';
import Cell from './Cell';

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
          this.manipulateBoard();
          console.log('Up arrow pressed');
          break;
        case 'ArrowDown':
          console.log('Down arrow pressed');
          break;
      }
    })
  }

  manipulateBoard = () => {
    let newCells = this.state.cells.map(innerArray => innerArray.slice());
    const playerStart = indexOf2d(newCells, 'playerDefault');
    if (newCells && playerStart) {
      newCells[playerStart[0]][playerStart[1]] = Floor.DEFAULT;
      newCells[playerStart[0]-1][playerStart[1]] = Player.DEFAULT;
    }
    this.setState({ cells: newCells });
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
