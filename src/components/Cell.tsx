import React from 'react';

import { Item, Obstacle, Floor, Player } from '../constants';

import './Cell.scss';
import playerDefault from '../assets/Player.png';
import key1 from '../assets/Key1.png';
import key2 from '../assets/Key2.png';
import key3 from '../assets/Key3.png';
import key4 from '../assets/Key4.png';
import key5 from '../assets/Key5.png';
import wall from '../assets/Wall.png';
import floor from '../assets/Floor.png';
import door1 from '../assets/door1.png';
import door2 from '../assets/door2.png';
import door3 from '../assets/door3.png';
import door4 from '../assets/door4.png';
import door5 from '../assets/Door5.png';


const images = {
  playerDefault,
  key1,
  key2,
  key3,
  key4,
  key5,
  floor,
  wall,
  door1,
  door2,
  door3,
  door4,
  door5
};

interface CellProps {
  contains: Item | Obstacle | Floor | Player;
};

class Cell extends React.Component<CellProps> {
  render() {
    return (
      <img className={`cell cell-${this.props.contains}`} src={images[this.props.contains]} alt={`Tile of ${this.props.contains}`}/>
    );
  }
}

export default Cell;
