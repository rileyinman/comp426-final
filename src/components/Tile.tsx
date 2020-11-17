import React from 'react';

import { Item, Obstacle } from '../constants';

interface TileProps {
  contains: Item | Obstacle;
};

class Tile extends React.Component<TileProps> {
  render() {
    return (
      <div className={`tile tile-${this.props.contains}`}>{this.props.contains}</div>
    );
  }
}

export default Tile;
