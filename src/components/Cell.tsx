import React from 'react';

import { Item, Obstacle } from '../constants';

interface CellProps {
  contains: Item | Obstacle;
};

class Cell extends React.Component<CellProps> {
  render() {
    return (
      <div className={`cell cell-${this.props.contains}`}>{this.props.contains}</div>
    );
  }
}

export default Cell;
