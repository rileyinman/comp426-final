import React from 'react';

import { Item, Obstacle, Floor, Player } from '../constants';
import { enumContains, indexOf2d } from '../helpers';
import Cell from './Cell';
import Inventory from './Inventory';

interface BoardProps {
  cells: (Item|Obstacle|Floor|Player)[][]
}

interface BoardState {
  cells: (Item|Obstacle|Floor|Player)[][],
  inventoryItems: Item[]
}

class Board extends React.Component<BoardProps, BoardState> {
  constructor(props: BoardProps) {
    super(props);
    this.state = {
      cells: props.cells,
      inventoryItems: []
    };
  }

  componentDidMount() {
    window.addEventListener('keydown', (event) => {
      switch (event.key) {
        case 'ArrowLeft':
          this.manipulateBoard("left");
          console.log('Left arrow pressed');
          break;
        case 'ArrowRight':
          this.manipulateBoard("right");
          console.log('Right arrow pressed');
          break;
        case 'ArrowUp':
          this.manipulateBoard("up");
          console.log('Up arrow pressed');
          break;
        case 'ArrowDown':
          this.manipulateBoard("down");
          console.log('Down arrow pressed');
          break;
      }
    });
  }

  canMove = (array: string[][], row: number, column: number, direction: string) => {
    switch (direction) {
      case 'left':
        if (column === 0) {
          return false;
        }
        const toLeft = array[row][column-1];
        if (enumContains(Obstacle, toLeft)) {
          return false;
        }
        break;
      case 'right':
        if (column === array[0].length-1) {
          return false;
        }
        const toRight = array[row][column+1];
        if (enumContains(Obstacle, toRight)) {
          return false;
        }
        break;
      case 'up':
        if (row === 0) {
          return false;
        }
        const above = array[row-1][column];
        if (enumContains(Obstacle, above)) {
          return false;
        }
        break;
      case 'down':
        if (row === array.length-1) {
          return false;
        }
        const below = array[row+1][column];
        if (enumContains(Obstacle, below)) {
          return false;
        }
        break;
    }

    return true;
  }

  manipulateBoard = (direction: string) => {
    let newCells = this.state.cells.map(innerArray => innerArray.slice());
    const playerStart = indexOf2d(newCells, Player.DEFAULT);
    if (!newCells || !playerStart) { return; }

    const playerRow = playerStart[0];
    const playerColumn = playerStart[1];

    if (!this.canMove(newCells, playerRow, playerColumn, direction)) {
      return;
    }

    newCells[playerRow][playerColumn] = Floor.DEFAULT;

    switch (direction) {
      case 'left':
        newCells[playerRow][playerColumn-1] = Player.DEFAULT;
        break;
      case 'right':
        newCells[playerRow][playerColumn+1] = Player.DEFAULT;
        break;
      case 'up':
        newCells[playerRow-1][playerColumn] = Player.DEFAULT;
        break;
      case 'down':
        newCells[playerRow+1][playerColumn] = Player.DEFAULT;
        break;
    }

    this.setState({ cells: newCells });
  }

  render() {
    const cells = this.state.cells.map((row, index) => (
        <div key={index}>
          {row.map((cell, index) => <Cell key={index} contains={cell}/>)}
        </div>
    ));

    return (
      <>
        {cells}
        <Inventory items={this.state.inventoryItems}/>
      </>
    );
  }
}

export default Board;
