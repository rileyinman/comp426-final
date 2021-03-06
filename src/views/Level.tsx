import React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';

import Button from 'react-bulma-components/lib/components/button';
import Heading from 'react-bulma-components/lib/components/heading';
import Section from 'react-bulma-components/lib/components/section';
import Tile from 'react-bulma-components/lib/components/tile';
import Modal from 'react-bulma-components/lib/components/modal';

import { Board, Inventory, DialogueBox } from '../components';
import { Floor, Item, Obstacle, Player } from '../constants';
import { arrayAdd, arrayRemove, arraySubset, enumContains, formatTime, indexOf2d } from '../helpers';
import * as User from '../services/User';

import './Level.scss';

interface LevelProps<T> extends RouteComponentProps<T> {}

interface LevelParams {
  id: number;
}

interface LevelState {
  player: Player,
  cells: (Floor|Item|Obstacle|Player)[][],
  inventoryItems: Item[],
  npcText: string,
  showNPC: boolean,
  give: Item[],
  take: Item[],
  traded: boolean,
  timerStarted: boolean,
  time: number,
  won: boolean
}

class Level extends React.Component<LevelProps<LevelParams>, LevelState> {
  timer: number = 0;

  constructor(props: LevelProps<LevelParams>) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState = () => {
    return {
      player: Player.PLAYER1,
      cells: [],
      inventoryItems: [],
      npcText: '',
      showNPC: false,
      traded: false,
      give: [],
      take: [],
      timerStarted: false,
      time: 0,
      won: false
    }
  }

  restart = () => {
    this.stopTimer();
    this.resetTimer();
    this.setState(this.getInitialState());

    const player: Player = User.localData().player;
    this.setState({ player });

    fetch(`${process.env.REACT_APP_API_URL}/level/${this.props.match.params.id}`)
      .then(response => response.text().then(text => {
        const data = JSON.parse(text);

        const cells = data.cells;
        const playerDefault = indexOf2d(cells, 'player');
        if (playerDefault) {
          cells[playerDefault[0]][playerDefault[1]] = this.state.player;
        }

        this.setState({
          cells,
          npcText: data.npcText,
          give: data.give,
          take: data.take
        });
      }));
  }

  componentDidMount() {
    this.restart();

    window.addEventListener('keydown', (event) => {
      switch (event.key) {
        case 'ArrowLeft':
          if (!this.state.timerStarted) {
            this.startTimer();
          }
          this.manipulateBoard('left');
          break;
        case 'ArrowRight':
          if (!this.state.timerStarted) {
            this.startTimer();
          }
          this.manipulateBoard('right');
          break;
        case 'ArrowUp':
          if (!this.state.timerStarted) {
            this.startTimer();
          }
          this.manipulateBoard('up');
          break;
        case 'ArrowDown':
          if (!this.state.timerStarted) {
            this.startTimer();
          }
          this.manipulateBoard('down');
          break;
      }
    });
  }

  startTimer = () => {
    this.setState({ timerStarted: true });
    this.timer = window.setInterval(() => this.setState({
      time: this.state.time + 1
    }), 1000);
  }

  stopTimer = () => {
    this.setState({ timerStarted: false });
    window.clearInterval(this.timer);
  }

  resetTimer = () => {
    this.setState({
      timerStarted: false,
      time: 0
    });
  }

  unlockDoor = (door: string) => {
    let index = -1;
    switch (door) {
      case Obstacle.DOOR_PINK:
        index = this.state.inventoryItems.findIndex(item => item === Item.KEY_PINK);
        break;
      case Obstacle.DOOR_YELLOW:
        index = this.state.inventoryItems.findIndex(item => item === Item.KEY_YELLOW);
        break;
      case Obstacle.DOOR_GREEN:
        index = this.state.inventoryItems.findIndex(item => item === Item.KEY_GREEN);
        break;
      case Obstacle.DOOR_BLUE:
        index = this.state.inventoryItems.findIndex(item => item === Item.KEY_BLUE);
        break;
      case Obstacle.DOOR_PURPLE:
        index = this.state.inventoryItems.findIndex(item => item === Item.KEY_PURPLE);
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
        if (enumContains(Obstacle, toLeft) && !this.unlockDoor(toLeft)) {
          return false;
        }
        break;
      case 'right':
        if (column === array[0].length-1) {
          return false;
        }
        const toRight = array[row][column+1];
        if (enumContains(Obstacle, toRight) && !this.unlockDoor(toRight)) {
          return false;
        }
        break;
      case 'up':
        if (row === 0) {
          return false;
        }
        const above = array[row-1][column];
        if (enumContains(Obstacle, above) && !this.unlockDoor(above)) {
          return false;
        }
        break;
      case 'down':
        if (row === array.length-1) {
          return false;
        }
        const below = array[row+1][column];
        if (enumContains(Obstacle, below) && !this.unlockDoor(below)) {
          return false;
        }
        break;
    }

    return true;
  }

  checkNPC = (row: number, column: number) => {
    let result = false;

    if (column !== 0) {
      const toLeft = this.state.cells[row][column-1];
      if (toLeft === Obstacle.NPC) {
        result = true;
      }
    }

    if (column !== this.state.cells[0].length-1) {
      const toRight = this.state.cells[row][column+1];
      if (toRight === Obstacle.NPC) {
        result = true;
      }
    }

    if (row !== 0) {
      const above = this.state.cells[row-1][column];
      if (above === Obstacle.NPC) {
        result = true;
      }
    }

    if (row !== this.state.cells.length-1) {
      const below = this.state.cells[row+1][column];
      if (below === Obstacle.NPC) {
        result = true;
      }
    }

    if (result && arraySubset(this.state.inventoryItems, this.state.take)) {
      arrayRemove(this.state.inventoryItems, this.state.take);
      arrayAdd(this.state.inventoryItems, this.state.give);
      this.setState({ traded: true });
    }

    return result;
  }

  checkWin = (array: string[][], row: number, column: number, direction: string) => {
    switch (direction) {
      case 'left':
        if (column === 0) {
          return false;
        }
        const toLeft = array[row][column-1];
        if (toLeft === Floor.EXIT) {
          return true;
        }
        break;
      case 'right':
        if (column === array[0].length-1) {
          return false;
        }
        const toRight = array[row][column+1];
        if (toRight === Floor.EXIT) {
          return true;
        }
        break;
      case 'up':
        if (row === 0) {
          return false;
        }
        const above = array[row-1][column];
        if (above === Floor.EXIT) {
          return true;
        }
        break;
      case 'down':
        if (row === array.length-1) {
          return false;
        }
        const below = array[row+1][column];
        if (below === Floor.EXIT) {
          return true;
        }
        break;
    }

    return false;
  }

  manipulateBoard = (direction: string) => {
    let cells = this.state.cells.map(innerArray => innerArray.slice());
    let playerLocation = indexOf2d(cells, this.state.player);

    if (!cells || !playerLocation) {
      return;
    }

    let [playerRow, playerColumn] = playerLocation;

    if (!this.canMove(cells, playerRow, playerColumn, direction)) {
      return;
    }

    if (this.checkWin(cells, playerRow, playerColumn, direction)) {
      this.stopTimer();
      this.setState({ won: true });

      let username = User.localData().username;

      User.getUser(username).then(() => User.update(username, {
        score: this.state.time,
        level: this.props.match.params.id
      }));
    }

    cells[playerRow][playerColumn] = Floor.DEFAULT;

    switch (direction) {
      case 'left':
        if(enumContains(Item, cells[playerRow][playerColumn-1])) {
          this.state.inventoryItems.push(cells[playerRow][playerColumn-1] as Item);
        }
        cells[playerRow][playerColumn-1] = this.state.player;
        break;
      case 'right':
        if(enumContains(Item, cells[playerRow][playerColumn+1])) {
          this.state.inventoryItems.push(cells[playerRow][playerColumn+1] as Item);
        }
        cells[playerRow][playerColumn+1] = this.state.player;
        break;
      case 'up':
        if(enumContains(Item, cells[playerRow-1][playerColumn])) {
          this.state.inventoryItems.push(cells[playerRow-1][playerColumn] as Item);
        }
        cells[playerRow-1][playerColumn] = this.state.player;
        break;
      case 'down':
        if(enumContains(Item, cells[playerRow+1][playerColumn])) {
          this.state.inventoryItems.push(cells[playerRow+1][playerColumn] as Item);
        }
        cells[playerRow+1][playerColumn] = this.state.player;
        break;
    }

    this.setState({ cells });

    playerLocation = indexOf2d(this.state.cells, this.state.player);
    if (!playerLocation) { return; }
    [playerRow, playerColumn] = playerLocation;
    this.setState({ showNPC: this.checkNPC(playerRow, playerColumn) });
  }

  render() {
    let dialogue = null;
    if (this.state.showNPC) {
      dialogue = <DialogueBox text={this.state.npcText} traded={this.state.traded}/>;
    }

    return (
      <Tile kind='ancestor'>
        <Tile size={7}>
          <Section className='level-board'>
            <Board cells={this.state.cells}/>
          </Section>
        </Tile>
        <Tile kind='parent' vertical>
          <Tile>
            <Section>
              <Heading>Level {this.props.match.params.id}</Heading>
            </Section>
            <Section>
              <Link to='/game'><Button>Back</Button></Link>
              <Button onClick={this.restart}>Restart Level</Button>
            </Section>
            <Section>
              <Heading>Time: {formatTime(this.state.time)}</Heading>
            </Section>
          </Tile>
          <Tile>
            <Section>
              <Heading size={4} className='has-text-centered'>Inventory</Heading>
              <Inventory items={this.state.inventoryItems}/>
            </Section>
          </Tile>
          <Tile>
            {dialogue}
          </Tile>

          <Modal show={this.state.won} onClose={() => null} closeOnEsc={false}>
            <Modal.Card>
              <Modal.Card.Head showClose={false}>
                <Modal.Card.Title>You completed level {this.props.match.params.id} in {formatTime(this.state.time)}!</Modal.Card.Title>
              </Modal.Card.Head>
              <Modal.Card.Body>
                <Link to='/game'>
                  <Button>Back to level list</Button>
                </Link>
              </Modal.Card.Body>
            </Modal.Card>
          </Modal>
        </Tile>
      </Tile>
    );
  }
}

export default Level;
