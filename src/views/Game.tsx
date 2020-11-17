import React from 'react';

// TODO: Don't import directly, use index
import Tile from '../components/Tile';
import { Item } from '../constants';

const Game = () => (
  <section>
  <Tile contains={Item.KEY}/>
  </section>
);

export default Game;
