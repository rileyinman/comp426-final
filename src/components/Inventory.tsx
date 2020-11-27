import React from 'react';

import { Item, Obstacle, Floor, Player } from '../constants';

interface InventoryProps {
  items: (Item|Obstacle|Floor|Player)[]
}

interface InventoryState {
  items: (Item|Obstacle|Floor|Player)[]
}

class Inventory extends React.Component<InventoryProps, InventoryState> {
  constructor(props: InventoryProps) {
    super(props);
    this.state = {
      items: props.items
    };
  }

  render() {
    return <div>{this.props.items}</div>;
  }
}

export default Inventory;
