import React from 'react';

import { Item } from '../constants';

interface InventoryProps {
  items: Item[]
}

interface InventoryState {
  items: Item[]
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
