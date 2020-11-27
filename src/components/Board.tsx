import React from 'react';

import { Item, Obstacle, Floor, Player } from '../constants';
import { enumContains, indexOf2d, hasKey } from '../helpers';
import Cell from './Cell';
import Inventory from './Inventory';

interface BoardProps {
  cells: (Item|Obstacle|Floor|Player)[][]
}

interface BoardState {
  cells: (Item|Obstacle|Floor|Player)[][],
  inventoryItems: (Item|Obstacle|Floor|Player)[]
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
        if (toLeft == "wall") {
          return false;
        } else if (enumContains(Obstacle, toLeft) && !hasKey(this.state.inventoryItems, toLeft)) {
          return false;
        }
        break;
      case 'right':
        if (column === array[0].length-1) {
          return false;
        }
        const toRight = array[row][column+1];
        if (toRight == "wall") {
          return false;
        } else if (enumContains(Obstacle, toRight) && !hasKey(this.state.inventoryItems, toRight)) {
          return false;
        }
        break;
      case 'up':
        if (row === 0) {
          return false;
        }
        const above = array[row-1][column];
        if (above == "wall") {
          return false;
        } else if (enumContains(Obstacle, above) && !hasKey(this.state.inventoryItems, above)) {
          return false;
        }
        break;
      case 'down':
        if (row === array.length-1) {
          return false;
        }
        const below = array[row+1][column];
        if (below == "wall") {
          return false;
        } else if (enumContains(Obstacle, below) && !hasKey(this.state.inventoryItems, below)) {
          return false;
        }
        break;
    }
    // TODO: remove used keys form inventory 
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
        if(enumContains(Item, newCells[playerRow][playerColumn-1])) {
          this.state.inventoryItems.push(newCells[playerRow][playerColumn-1]);
        }
        newCells[playerRow][playerColumn-1] = Player.DEFAULT;
        break;
      case 'right':
        if(enumContains(Item, newCells[playerRow][playerColumn+1])) {
          this.state.inventoryItems.push(newCells[playerRow][playerColumn+1]);
        }
        newCells[playerRow][playerColumn+1] = Player.DEFAULT;
        break;
      case 'up':
        if(enumContains(Item, newCells[playerRow-1][playerColumn])) {
          this.state.inventoryItems.push(newCells[playerRow-1][playerColumn]);
        }
        newCells[playerRow-1][playerColumn] = Player.DEFAULT;
        break;
      case 'down':
        if(enumContains(Item, newCells[playerRow+1][playerColumn])) {
          this.state.inventoryItems.push(newCells[playerRow+1][playerColumn]);
        }
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
