import React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';

import Button from 'react-bulma-components/lib/components/button';
import Section from 'react-bulma-components/lib/components/section';
import Tile from 'react-bulma-components/lib/components/tile';

import { Board, Inventory } from '../components';
import { Empty, Floor, Item, Obstacle, Player } from '../constants';
import { enumContains, indexOf2d } from '../helpers';

import './Level.scss';

interface LevelProps<T> extends RouteComponentProps<T> {}

interface LevelParams {
  id: number
}

interface LevelState {
  id: number,
  cells: (Empty|Floor|Item|Obstacle|Player)[][],
  inventoryItems: Item[]
}

class Level extends React.Component<LevelProps<LevelParams>, LevelState> {
  constructor(props: LevelProps<LevelParams>) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      cells: [],
      inventoryItems: []
    };
  }

  componentDidMount() {
    fetch(`${process.env.REACT_APP_API_URL}/level/${this.state.id}`)
      .then(response => response.text().then(
        text => this.setState({ cells: JSON.parse(text).cells })
      ));

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

    return true;
  }

  manipulateBoard = (direction: string) => {
    let newCells = this.state.cells.map(innerArray => innerArray.slice());
    const playerStart = indexOf2d(newCells, Player.PLAYER1);
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
        newCells[playerRow][playerColumn-1] = Player.PLAYER1;
        break;
      case 'right':
        if(enumContains(Item, newCells[playerRow][playerColumn+1])) {
          this.state.inventoryItems.push(newCells[playerRow][playerColumn+1] as Item);
        }
        newCells[playerRow][playerColumn+1] = Player.PLAYER1;
        break;
      case 'up':
        if(enumContains(Item, newCells[playerRow-1][playerColumn])) {
          this.state.inventoryItems.push(newCells[playerRow-1][playerColumn] as Item);
        }
        newCells[playerRow-1][playerColumn] = Player.PLAYER1;
        break;
      case 'down':
        if(enumContains(Item, newCells[playerRow+1][playerColumn])) {
          this.state.inventoryItems.push(newCells[playerRow+1][playerColumn] as Item);
        }
        newCells[playerRow+1][playerColumn] = Player.PLAYER1;
        break;
    }

    this.setState({ cells: newCells });
  }

  render() {
    return (
      <Section>
        <Link to='/game'><Button>Back</Button></Link>
        <Tile kind='ancestor'>
          <Tile size={7}>
            <Section className='level-board'>
              <Board cells={this.state.cells}/>
            </Section>
          </Tile>
          <Tile kind='parent' vertical>
            <Tile>
              <Button>Restart Level</Button>
              <p className='level-display'>Level {this.state.id}</p>
              {/* Put score here? Level timer? */}
            </Tile>
            <Tile>
              <Inventory items={this.state.inventoryItems}/>
            </Tile>
          </Tile>
        </Tile>
      </Section>
    );
  }
}

export default Level;
