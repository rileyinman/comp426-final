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
          this.manipulateBoard('left');
          console.log('Left arrow pressed');
          break;
        case 'ArrowRight':
          this.manipulateBoard('right');
          console.log('Right arrow pressed');
          break;
        case 'ArrowUp':
          this.manipulateBoard('up');
          console.log('Up arrow pressed');
          break;
        case 'ArrowDown':
          this.manipulateBoard('down');
          console.log('Down arrow pressed');
          break;
      }
    });
  }

  unlockDoor = (door: string) => {
    let index = -1;
    switch (door) {
      case Obstacle.DOOR1:
        index = this.state.inventoryItems.findIndex(item => item === Item.KEY1);
        break;
      case Obstacle.DOOR2:
        index = this.state.inventoryItems.findIndex(item => item === Item.KEY2);
        break;
      case Obstacle.DOOR3:
        index = this.state.inventoryItems.findIndex(item => item === Item.KEY3);
        break;
      case Obstacle.DOOR4:
        index = this.state.inventoryItems.findIndex(item => item === Item.KEY4);
        break;
      case Obstacle.DOOR5:
        index = this.state.inventoryItems.findIndex(item => item === Item.KEY5);
        break;
    }

    if (index > -1) {
      this.state.inventoryItems.splice(index, 1);
      return true;
    }

    return false;
  }

  canMove = (array: string[][], row: number, column: number, direction: string) => {
    switch (direction) {
      case 'left':
        if (column === 0) {
          return false;
        }
        const toLeft = array[row][column-1];
        if (toLeft === Obstacle.WALL) {
          return false;
        } else if (enumContains(Obstacle, toLeft) && !this.unlockDoor(toLeft)) {
          return false;
        }
        break;
      case 'right':
        if (column === array[0].length-1) {
          return false;
        }
        const toRight = array[row][column+1];
        if (toRight === Obstacle.WALL) {
          return false;
        } else if (enumContains(Obstacle, toRight) && !this.unlockDoor(toRight)) {
          return false;
        }
        break;
      case 'up':
        if (row === 0) {
          return false;
        }
        const above = array[row-1][column];
        if (above === Obstacle.WALL) {
          return false;
        } else if (enumContains(Obstacle, above) && !this.unlockDoor(above)) {
          return false;
        }
        break;
      case 'down':
        if (row === array.length-1) {
          return false;
        }
        const below = array[row+1][column];
        if (below === Obstacle.WALL) {
          return false;
        } else if (enumContains(Obstacle, below) && !this.unlockDoor(below)) {
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

    const [playerRow, playerColumn] = playerStart;

    if (!this.canMove(newCells, playerRow, playerColumn, direction)) {
      return;
    }

    newCells[playerRow][playerColumn] = Floor.DEFAULT;

    switch (direction) {
      case 'left':
        if(enumContains(Item, newCells[playerRow][playerColumn-1])) {
          this.state.inventoryItems.push(newCells[playerRow][playerColumn-1] as Item);
        }
        newCells[playerRow][playerColumn-1] = Player.DEFAULT;
        break;
      case 'right':
        if(enumContains(Item, newCells[playerRow][playerColumn+1])) {
          this.state.inventoryItems.push(newCells[playerRow][playerColumn+1] as Item);
        }
        newCells[playerRow][playerColumn+1] = Player.DEFAULT;
        break;
      case 'up':
        if(enumContains(Item, newCells[playerRow-1][playerColumn])) {
          this.state.inventoryItems.push(newCells[playerRow-1][playerColumn] as Item);
        }
        newCells[playerRow-1][playerColumn] = Player.DEFAULT;
        break;
      case 'down':
        if(enumContains(Item, newCells[playerRow+1][playerColumn])) {
          this.state.inventoryItems.push(newCells[playerRow+1][playerColumn] as Item);
        }
        newCells[playerRow+1][playerColumn] = Player.DEFAULT;
        break;
    }

    this.setState({ cells: newCells });
  }

  render() {
    const cells = this.state.cells.map((row, index) => (
        <div style = {{float: "left"}} key={index}>
          {row.map((cell, index) => <Cell key={index} contains={cell}/>)}
        </div>
    ));
   const inventory = this.state.inventoryItems.map((item, index) => (
          <li key={index} style = {{textAlign: "center", color: "black"}}>
            {item}
          </li>
    ));
  

    return (
      
      <>
        {cells}
        <div style={{color: "black", textAlign: "center"}}> <h1 style={{fontSize: 20}}>Inventory</h1></div>        
        {inventory}
        {/*<Inventory items={this.state.inventoryItems}/>*/}
        
      </>

      
    );
  }
}

export default Board;
